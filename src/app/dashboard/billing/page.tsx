'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useFirestore, useCollection, useMemoFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, query, where, doc, updateDoc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import type { Subscription, SubscriptionPlan, Invoice } from '@/lib/types';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { ChangePlanDialog } from '@/components/dashboard/billing/change-plan-dialog';
import { CancelSubscriptionDialog } from '@/components/dashboard/billing/cancel-subscription-dialog';


// --- Demo Data ---
const demoPlans: SubscriptionPlan[] = [
  {
    id: 'plan_free_demo',
    name: 'Free',
    price: 0,
    priceId: 'price_free_demo',
    features: [
      'For personal projects',
      '1,000 AI generations/mo',
      '2 projects',
      'Basic support',
    ],
    isPopular: false,
  },
  {
    id: 'plan_pro_demo',
    name: 'Pro',
    price: 29,
    priceId: 'price_pro_monthly_demo',
    isPopular: true,
    features: [
      'For professionals & small teams',
      '10,000 AI generations/mo',
      'Unlimited projects',
      'Priority support',
      'Advanced analytics'
    ],
  },
  {
    id: 'plan_enterprise_demo',
    name: 'Enterprise',
    price: 99,
    priceId: 'price_enterprise_monthly_demo',
    features: [
      'For large-scale applications',
      'Unlimited AI generations',
      'Dedicated support & SSO',
      'Custom integrations',
      'Team management',
    ],
    isPopular: false
  },
];

const mockInvoices = (userId: string): Invoice[] => [
    { id: 'inv_demo_1', userId, subscriptionId: 'sub_demo', date: Timestamp.fromDate(new Date('2024-07-01')), amount: 2900, status: 'paid', invoiceUrl: '#'},
    { id: 'inv_demo_2', userId, subscriptionId: 'sub_demo', date: Timestamp.fromDate(new Date('2024-06-01')), amount: 2900, status: 'paid', invoiceUrl: '#'},
    { id: 'inv_demo_3', userId, subscriptionId: 'sub_demo', date: Timestamp.fromDate(new Date('2024-05-01')), amount: 2900, status: 'paid', invoiceUrl: '#'},
];
// --- End Demo Data ---


export default function BillingPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Fetch all available plans
  const plansQuery = useMemoFirebase(() => collection(firestore, 'subscriptionPlans'), [firestore]);
  const { data: plansFromDb, isLoading: isLoadingPlans } = useCollection<SubscriptionPlan>(plansQuery);

  // Fetch user's active subscription
  const subscriptionQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/subscriptions`), where("status", "in", ["active", "trialing", "past_due"]));
  }, [firestore, user]);
  const { data: subscriptions, isLoading: isLoadingSubscription, error: subscriptionError } = useCollection<Subscription>(subscriptionQuery);
  let activeSubscription = subscriptions?.[0];

  // Fetch user's invoices
  const invoicesQuery = useMemoFirebase(() => {
      if (!user) return null;
      return query(collection(firestore, `users/${user.uid}/invoices`));
  }, [firestore, user]);
  const { data: invoicesFromDb, isLoading: isLoadingInvoices, error: invoicesError } = useCollection<Invoice>(invoicesQuery);
  let invoices = invoicesFromDb;

  const isDemoMode = !isLoadingSubscription && !activeSubscription && user && !subscriptionError;

  if (isDemoMode) {
    activeSubscription = {
        id: 'sub_demo',
        userId: user.uid,
        planId: 'plan_pro_demo',
        priceId: 'price_pro_monthly_demo',
        status: 'active',
        currentPeriodStart: Timestamp.fromDate(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)),
        currentPeriodEnd: Timestamp.fromDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)),
        cancelAtPeriodEnd: false,
        createdAt: Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
        updatedAt: Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
    };
    if (!invoices || invoices.length === 0) {
        invoices = mockInvoices(user.uid);
    }
  }
  
  const plans = (plansFromDb && plansFromDb.length > 0) ? plansFromDb : demoPlans;
  const currentPlan = plans?.find(p => p.id === activeSubscription?.planId);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    if (isDemoMode) {
      toast({ title: 'This is a demo', description: 'In a real app, this would open the checkout flow to change your plan.' });
      return;
    }
    if (plan.id === currentPlan?.id) return;
    if (plan.name === 'Enterprise') {
        toast({ title: 'Contact Sales', description: 'Please contact our sales team to learn more about the Enterprise plan.' });
        return;
    }
    setSelectedPlan(plan);
  };
  
  const handleChangePlan = () => {
    if (!user || !activeSubscription || !selectedPlan) return;

    setIsChangingPlan(true);
    const subDocRef = doc(firestore, `users/${user.uid}/subscriptions/${activeSubscription.id}`);
    
    updateDoc(subDocRef, {
      planId: selectedPlan.id,
      priceId: selectedPlan.priceId,
      status: 'active',
      cancelAtPeriodEnd: false,
      updatedAt: serverTimestamp(),
    })
    .then(() => {
      toast({ title: "Plan Changed", description: `You are now on the ${selectedPlan.name} plan.`});
      setSelectedPlan(null);
    })
    .catch(e => {
        const permissionError = new FirestorePermissionError({
            path: subDocRef.path,
            operation: 'update',
            requestResourceData: { planId: selectedPlan.id, priceId: selectedPlan.priceId }
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not change your plan.' });
    })
    .finally(() => setIsChangingPlan(false));
  };
  
  const handleCancelSubscription = () => {
      if (!user || !activeSubscription) return;
      setIsCancelling(true);
      const subDocRef = doc(firestore, `users/${user.uid}/subscriptions/${activeSubscription.id}`);

      updateDoc(subDocRef, {
          cancelAtPeriodEnd: true,
          updatedAt: serverTimestamp(),
      })
      .then(() => {
          toast({ title: "Subscription Cancellation", description: "Your subscription will be cancelled at the end of your current billing period." });
          setShowCancelDialog(false);
      })
      .catch(e => {
          const permissionError = new FirestorePermissionError({
              path: subDocRef.path,
              operation: 'update',
              requestResourceData: { cancelAtPeriodEnd: true }
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({ variant: 'destructive', title: 'Error', description: 'Could not cancel your subscription.' });
      })
      .finally(() => setIsCancelling(false));
  };

  const handleReactivateSubscription = () => {
      if (!user || !activeSubscription) return;
      if (isDemoMode) {
        toast({ title: 'This is a demo', description: 'This action is disabled in demo mode.' });
        return;
      }
      const subDocRef = doc(firestore, `users/${user.uid}/subscriptions/${activeSubscription.id}`);
      updateDoc(subDocRef, {
          cancelAtPeriodEnd: false,
          updatedAt: serverTimestamp(),
      }).then(() => {
          toast({ title: "Subscription Reactivated", description: "Your subscription has been reactivated." });
      }).catch(e => {
          toast({ variant: 'destructive', title: 'Error', description: 'Could not reactivate your subscription.' });
      });
  }

  const usage = {
    generations: { used: 1200, limit: 10000 },
    projects: { used: 8, limit: Infinity },
  }

  return (
    <>
      <ChangePlanDialog 
        isOpen={!!selectedPlan}
        onOpenChange={() => setSelectedPlan(null)}
        onConfirm={handleChangePlan}
        isChanging={isChangingPlan}
        fromPlan={currentPlan || null}
        toPlan={selectedPlan}
      />
      {activeSubscription && <CancelSubscriptionDialog
          isOpen={showCancelDialog}
          onOpenChange={setShowCancelDialog}
          onConfirm={handleCancelSubscription}
          isCancelling={isCancelling}
          subscription={activeSubscription}
       />}

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Billing &amp; Subscription</h1>
          <p className="text-muted-foreground">Manage your plan, usage, and payment history.</p>
        </div>
        
        {subscriptionError && <Card className="border-destructive"><CardHeader><CardTitle className="text-destructive">Error</CardTitle><CardDescription className="text-destructive">Could not load subscription details. You may not have permission.</CardDescription></CardHeader></Card>}

        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            {isLoadingSubscription ? <Skeleton className="h-5 w-1/2 mt-1" /> : (
              <CardDescription>
                {currentPlan ? `You are currently on the ` : 'You are not subscribed to any plan.'}
                {currentPlan && <span className="font-semibold text-primary">{currentPlan.name}</span>}
                {activeSubscription?.cancelAtPeriodEnd && ' (Cancels on ' + format(activeSubscription.currentPeriodEnd.toDate(), 'PPP') + ')'}
                 {isDemoMode && <Badge variant="outline" className="ml-2">Demo</Badge>}
              </CardDescription>
            )}
          </CardHeader>
          {(currentPlan && activeSubscription) && (
            <>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">AI Generations</span>
                  <span className="text-sm font-medium">{usage.generations.used.toLocaleString()} / {usage.generations.limit.toLocaleString()} used</span>
                </div>
                <Progress value={(usage.generations.used / usage.generations.limit) * 100} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Projects</span>
                  <span className="text-sm font-medium">{usage.projects.used} / Unlimited</span>
                </div>
                <Progress value={40} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Your plan {activeSubscription.cancelAtPeriodEnd ? 'expires' : 'renews'} on <span className="font-medium text-foreground">{format(activeSubscription.currentPeriodEnd.toDate(), 'PPP')}</span>.
              </p>
              {activeSubscription.cancelAtPeriodEnd ? (
                  <Button variant="outline" onClick={handleReactivateSubscription}>Reactivate Subscription</Button>
              ) : (
                  <Button variant="outline" onClick={() => {
                      if (isDemoMode) {
                        toast({ title: 'This is a demo', description: 'This action is disabled in demo mode.' });
                        return;
                      }
                      setShowCancelDialog(true)
                    }}>Cancel Subscription</Button>
              )}
            </CardFooter>
            </>
          )}
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Flexible plans for teams of all sizes
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that’s right for you. All plans come with a
            14-day free trial of our Pro features.
          </p>
        </div>

        {isLoadingPlans && !isDemoMode ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="space-y-4 p-6"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-10 w-1/2" /><Skeleton className="h-4 w-3/4" /><div className="space-y-2 pt-4"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div><div className="pt-4"><Skeleton className="h-12 w-full" /></div></Card>
                <Card className="space-y-4 p-6"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-10 w-1/2" /><Skeleton className="h-4 w-3/4" /><div className="space-y-2 pt-4"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div><div className="pt-4"><Skeleton className="h-12 w-full" /></div></Card>
                <Card className="space-y-4 p-6"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-10 w-1/2" /><Skeleton className="h-4 w-3/4" /><div className="space-y-2 pt-4"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div><div className="pt-4"><Skeleton className="h-12 w-full" /></div></Card>
            </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans?.sort((a,b) => a.price - b.price).map((plan) => {
              
              let buttonText;
              if (plan.id === currentPlan?.id) {
                buttonText = "Current Plan";
              } else if (plan.name === 'Enterprise') {
                buttonText = "Contact Sales";
              } else if (!currentPlan) {
                 buttonText = "Choose Plan";
              } else if (plan.price > currentPlan.price) {
                buttonText = `Upgrade to ${plan.name}`;
              } else {
                buttonText = `Downgrade to ${plan.name}`;
              }

              return (
              <Card
                key={plan.id}
                className={`flex flex-col relative ${
                  plan.id === currentPlan?.id ? "border-primary ring-2 ring-primary" : ""
                } ${plan.isPopular ? "border-primary" : ""}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 right-4">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <CardDescription>{plan.features[0]}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.slice(1).map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.id === currentPlan?.id ? "outline" : plan.isPopular ? "default" : "secondary"}
                    disabled={plan.id === currentPlan?.id || isLoadingSubscription}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {isLoadingSubscription ? <Loader2 className="animate-spin" /> : buttonText}
                  </Button>
                </CardFooter>
              </Card>
            )})}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and download your past invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingInvoices && !isDemoMode ? (
                    <TableRow>
                        <TableCell colSpan={5} className="py-8">
                            <div className="flex justify-center"><Loader2 className="animate-spin" /></div>
                        </TableCell>
                    </TableRow>
                ) : invoicesError ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-destructive">Could not load invoices.</TableCell>
                  </TableRow>
                ) : invoices && invoices.length > 0 ? (
                  invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">#{invoice.id.substring(0, 7)}...</TableCell>
                      <TableCell>{format(invoice.date.toDate(), 'PPP')}</TableCell>
                      <TableCell>${(invoice.amount / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'secondary' : 'destructive'}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${invoice.status === 'paid' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={invoice.invoiceUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Invoice</span>
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">No invoices found.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
           <CardFooter className="flex justify-end">
              <Button variant="outline">View All Invoices</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
