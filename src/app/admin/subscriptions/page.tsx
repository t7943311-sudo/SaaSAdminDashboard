'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, File, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, collectionGroup, query } from 'firebase/firestore';
import type { Subscription, User as FirebaseUser, SubscriptionPlan } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type EnrichedSubscription = Subscription & {
    user: {
        name: string;
        avatar: string;
    };
    workspace: string;
    plan: {
        name: string;
        price: number;
    }
};

export default function AdminSubscriptionsPage() {
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');

    const subscriptionsQuery = useMemoFirebase(() => query(collectionGroup(firestore, 'subscriptions')), [firestore]);
    const { data: subscriptions, isLoading: isLoadingSubscriptions, error: subscriptionsError } = useCollection<Subscription>(subscriptionsQuery);

    const usersQuery = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
    const { data: users, isLoading: isLoadingUsers, error: usersError } = useCollection<FirebaseUser>(usersQuery);

    const plansQuery = useMemoFirebase(() => collection(firestore, 'subscriptionPlans'), [firestore]);
    const { data: plans, isLoading: isLoadingPlans, error: plansError } = useCollection<SubscriptionPlan>(plansQuery);
    
    const isLoading = isLoadingSubscriptions || isLoadingUsers || isLoadingPlans;
    const error = subscriptionsError || usersError || plansError;

    const enrichedSubscriptions = useMemo(() => {
        if (!subscriptions || !users || !plans) return [];
        
        const usersMap = new Map(users.map(user => [user.id, user]));
        const plansMap = new Map(plans.map(plan => [plan.id, plan]));

        return subscriptions.map(sub => {
            const user = usersMap.get(sub.userId);
            const plan = plansMap.get(sub.planId);
            return {
                ...sub,
                user: {
                    name: user ? `${user.firstName} ${user.lastName}`.trim() : 'Unknown User',
                    avatar: user?.avatar || `https://picsum.photos/seed/${sub.userId}/40/40`,
                },
                workspace: user?.workspaceName || 'N/A',
                plan: {
                    name: plan?.name || 'Unknown Plan',
                    price: plan?.price || 0,
                },
            };
        }).sort((a,b) => b.createdAt.seconds - a.createdAt.seconds);
    }, [subscriptions, users, plans]);

    const filteredSubscriptions = useMemo(() => {
        if (!searchTerm) return enrichedSubscriptions;
        return enrichedSubscriptions.filter(sub => 
            sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.workspace.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.plan.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [enrichedSubscriptions, searchTerm]);

    const handleAction = (action: string, sub: EnrichedSubscription) => {
        switch(action) {
            case 'view-user':
                router.push(`/admin/users/${sub.userId}`);
                break;
            case 'view-workspace':
                 if (sub.workspace !== 'N/A') {
                    router.push(`/admin/workspaces/${encodeURIComponent(sub.workspace)}`);
                } else {
                    toast({ variant: 'destructive', title: 'No Workspace', description: 'This user is not associated with a workspace.' });
                }
                break;
            default:
                toast({ title: 'Demo Action', description: `This action (${action}) is not implemented in this demo.` });
                break;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Global Subscriptions</h1>
                    <p className="text-muted-foreground">View and manage all active subscriptions on the platform.</p>
                </div>
                <Button variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Export All
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by user, workspace, or plan..."
                                className="w-full rounded-lg bg-background pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Workspace</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price/Mo</TableHead>
                                <TableHead>Next Billing</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                    </TableCell>
                                </TableRow>
                            )}
                            {error && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-destructive">
                                        Error loading subscriptions. You may not have permission.
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading && !error && filteredSubscriptions.length > 0 ? (
                                filteredSubscriptions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={sub.user.avatar} />
                                                <AvatarFallback>{sub.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{sub.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{sub.workspace}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.plan.name === 'Pro' ? 'default' : sub.plan.name === 'Enterprise' ? 'secondary' : 'outline'}>{sub.plan.name}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            sub.status === 'active' ? 'secondary' :
                                            sub.status === 'trialing' ? 'outline' : 'destructive'
                                        } className="capitalize">
                                            <div className={`w-2 h-2 mr-2 rounded-full ${
                                                sub.status === 'active' ? 'bg-green-500' :
                                                sub.status === 'trialing' ? 'bg-amber-500' : 'bg-red-500'
                                            }`}></div>
                                            {sub.cancelAtPeriodEnd ? 'Cancels' : sub.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${sub.plan.price.toFixed(2)}</TableCell>
                                    <TableCell>{format(sub.currentPeriodEnd.toDate(), 'PP')}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleAction('view-user', sub)}>View User</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction('view-workspace', sub)}>View Workspace</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction('comp-plan', sub)}>Comp Plan</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleAction('cancel', sub)}>Force Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                            ) : (
                                !isLoading && !error && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                    No subscriptions found.
                                    </TableCell>
                                </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
