
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Lock,
  LayoutDashboard,
  Code,
  Zap,
  KeyRound,
  CreditCard,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { placeholderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Next-Gen Authentication",
    description: "Secure, seamless, and extensible authentication using modern standards.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    title: "Pre-built Dashboard",
    description: "A complete, customizable dashboard with charts, tables, and widgets.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    title: "Subscription Billing",
    description: "Stripe integration for payments, invoices, and subscription management.",
  },
  {
    icon: <KeyRound className="w-8 h-8 text-primary" />,
    title: "API & Webhooks",
    description: "RESTful API routes and webhook handlers ready for your business logic.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Developer-First DX",
    description: "Built with TypeScript, Tailwind CSS, and a component-driven architecture.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "AI Ready",
    description: "Easily integrate AI features to build smarter applications from day one.",
  },
];

const testimonials = [
    {
        id: "testimonial-1",
        name: "Alex Rivera",
        role: "Indie Hacker",
        text: "LaunchBase saved me weeks of setup time. I went from idea to MVP in a weekend. The code quality is enterprise-grade.",
    },
    {
        id: "testimonial-2",
        name: "Samantha Chen",
        role: "Startup Founder",
        text: "As a non-technical founder, LaunchBase gave my team the perfect foundation. It's scalable, secure, and looks incredible out of the box.",
    },
    {
        id: "testimonial-3",
        name: "David Lee",
        role: "Senior Developer",
        text: "I've built many SaaS products, and LaunchBase is the boilerplate I wish I always had. It handles all the tedious parts so I can focus on features.",
    }
]

export default function LandingPage() {
  const heroImage = placeholderImages.find(p => p.id === "hero");
  const howItWorksImage = placeholderImages.find(p => p.id === "how-it-works");

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">LaunchBase</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-24 md:py-32 text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-primary/20 rounded-full blur-3xl -z-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">The Ultimate SaaS Starter Kit</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Launch Your SaaS in Days, Not Months
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              LaunchBase is the developer-first Next.js starter kit that gives you everything you need to build and launch a production-ready SaaS.
            </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground" asChild>
                  <Link href="/register">Start Building for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-surface/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need to Launch
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                LaunchBase includes all the modern features required to build a scalable and secure SaaS product.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">A Foundation Built for Speed</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground mt-4 mb-12">
                Stop reinventing the wheel. LaunchBase provides a beautiful UI and a solid codebase so you can focus on your unique features.
              </p>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center bg-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="bg-secondary/30 p-6 rounded-lg">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Project</CardTitle>
                      <CardDescription>A beautifully designed form component, ready to be used.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Name</label>
                          <input id="name" placeholder="My awesome project" className="w-full bg-background/50 border border-input rounded-md h-10 px-3 text-sm"/>
                        </div>
                         <div className="space-y-2">
                          <label htmlFor="framework" className="text-sm font-medium">Framework</label>
                          <input id="framework" value="Next.js" disabled className="w-full bg-background/50 border border-input rounded-md h-10 px-3 text-sm"/>
                        </div>
                        <Button>Create</Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-black rounded-lg p-4 h-full">
                  <pre className="text-xs md:text-sm text-gray-300 overflow-x-auto"><code>{`
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Project name" />
        <Button>Create</Button>
      </CardContent>
    </Card>
  )
}
                  `.trim()}</code></pre>
                </div>
            </div>
        </section>

        <section className="py-24 bg-surface/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Trusted by World-Class Teams</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                        Founders, developers, and indie hackers love building with LaunchBase.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => {
                        const image = placeholderImages.find(p => p.id === testimonial.id);
                        return (
                            <Card key={testimonial.id} className="bg-card/50 border-border/50 backdrop-blur-sm p-6">
                                <CardContent className="p-0">
                                    <p className="mb-6">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4">
                                        {image && <Avatar>
                                            <AvatarImage src={image.imageUrl} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>}
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
        
        <section className="py-24 text-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing that Scales with You</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground mt-4 mb-12">
                    Start for free and upgrade when you're ready. No hidden fees.
                </p>
                <div className="flex justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground" asChild>
                        <Link href="/register">View Full Pricing</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 bg-surface/20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <p className="text-sm">&copy; {new Date().getFullYear()} LaunchBase. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
