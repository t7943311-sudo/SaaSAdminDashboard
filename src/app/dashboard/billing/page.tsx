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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects.",
    features: [
      "1 Project",
      "Basic AI Generations",
      "Community Support",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing businesses that need more power.",
    features: [
      "Unlimited Projects",
      "Advanced AI Generations",
      "Priority Email Support",
      "Team Roles",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs.",
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Support",
    ],
    isPopular: false,
  },
];

const invoices = [
    { id: 'INV001', date: '2023-10-01', amount: '$49.00', status: 'Paid' },
    { id: 'INV002', date: '2023-09-01', amount: '$49.00', status: 'Paid' },
    { id: 'INV003', date: '2023-08-01', amount: '$49.00', status: 'Paid' },
    { id: 'INV004', date: '2023-07-01', amount: '$49.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Pro plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">AI Generations</span>
                    <span className="text-sm font-medium">1,200 / 5,000</span>
                </div>
                <Progress value={24} />
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Projects</span>
                    <span className="text-sm font-medium">8 / Unlimited</span>
                </div>
                <Progress value={100} />
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Your plan renews on November 1, 2024.</p>
            <Button variant="outline">Cancel Subscription</Button>
        </CardFooter>
      </Card>

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Flexible plans for teams of all sizes
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose a plan that works for you. All plans come with a 14-day free
          trial.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.isPopular ? "border-primary" : ""
            }`}
          >
            <CardHeader className="relative">
              {plan.isPopular && (
                <Badge className="absolute top-[-0.75rem] right-4">
                  Most Popular
                </Badge>
              )}
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price.startsWith("$") && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade to ' + plan.name}
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
                      {invoices.map(invoice => (
                          <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.id}</TableCell>
                              <TableCell>{invoice.date}</TableCell>
                              <TableCell>{invoice.amount}</TableCell>
                              <TableCell>
                                  <Badge variant="secondary">{invoice.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button variant="ghost" size="icon">
                                      <Download className="h-4 w-4" />
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
  );
}
