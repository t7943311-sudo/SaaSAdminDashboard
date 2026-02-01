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
import { Check, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects getting started.",
    features: [
      "1 Project",
      "500 AI Generations/mo",
      "Basic Analytics",
      "Community Support",
    ],
    isCurrent: false,
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing businesses that need more power and support.",
    features: [
      "Unlimited Projects",
      "5,000 AI Generations/mo",
      "Advanced Analytics",
      "Team Roles & Permissions",
      "Priority Email Support",
    ],
    isCurrent: true,
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced security and support needs.",
    features: [
      "Everything in Pro",
      "Unlimited AI Generations",
      "Dedicated Account Manager",
      "Custom Integrations & SSO",
      "24/7 Priority Support",
    ],
    isCurrent: false,
    isPopular: false,
  },
];

const invoices = [
  { id: "INV2024-001", date: "2024-07-01", amount: "$49.00", status: "Paid" },
  { id: "INV2024-002", date: "2024-06-01", amount: "$49.00", status: "Paid" },
  { id: "INV2024-003", date: "2024-05-01", amount: "$49.00", status: "Paid" },
  { id: "INV2024-004", date: "2024-04-01", amount: "$49.00", status: "Paid" },
  { id: "INV2024-005", date: "2024-03-01", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-2xl md:text-3xl font-bold">Billing &amp; Subscription</h1>
        <p className="text-muted-foreground">Manage your plan, usage, and payment history.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the <span className="font-semibold text-primary">Pro</span> plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">AI Generations</span>
              <span className="text-sm font-medium">1,200 / 5,000 used</span>
            </div>
            <Progress value={(1200 / 5000) * 100} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Projects</span>
              <span className="text-sm font-medium">8 / Unlimited</span>
            </div>
            <Progress value={100} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Your plan renews on <span className="font-medium text-foreground">August 1, 2024</span>.
          </p>
          <Button variant="outline">Cancel Subscription</Button>
        </CardFooter>
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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col relative ${
              plan.isCurrent ? "border-primary ring-2 ring-primary" : ""
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
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price.startsWith("$") && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {plan.features.map((feature) => (
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
                variant={plan.isCurrent ? "outline" : plan.isPopular ? "default" : "secondary"}
                disabled={plan.isCurrent}
              >
                {plan.isCurrent
                  ? "Current Plan"
                  : plan.name === "Enterprise"
                  ? "Contact Sales"
                  : "Upgrade to " + plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                     <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${invoice.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download Invoice</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter className="flex justify-end">
            <Button variant="outline">View All Invoices</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
