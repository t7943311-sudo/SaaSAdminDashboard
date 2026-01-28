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
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "For individuals and small teams starting out.",
    features: [
      "5 Projects",
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

export default function BillingPage() {
  return (
    <div className="space-y-6">
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
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
