'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  KeyRound,
  LayoutDashboard,
  CreditCard,
  Users,
  BarChart2,
  Settings2,
  Palette,
  FolderGit2,
  CheckCircle,
  XCircle,
  ArrowRight,
  Code2
} from "lucide-react";
import { Logo } from "@/components/logo";
import { placeholderImages } from "@/lib/placeholder-images";
import { useUser } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const coreFeatures = [
  {
    icon: <KeyRound className="w-6 h-6 text-primary" />,
    title: "Authentication & Authorization",
    description: "Secure, pre-built login, registration, and social auth flows.",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    title: "Dashboard UI",
    description: "A complete, customizable dashboard with charts, tables, and widgets.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "Billing & Subscriptions",
    description: "Stripe-ready structure for payments, invoices, and plans.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "User & Team Management",
    description: "Invite users, assign roles, and manage organization members.",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-primary" />,
    title: "Analytics & Charts",
    description: "Beautiful, data-rich charts for visualizing key metrics.",
  },
  {
    icon: <Settings2 className="w-6 h-6 text-primary" />,
    title: "Settings & API Keys",
    description: "Comprehensive settings pages for profile, security, and more.",
  },
  {
    icon: <Palette className="w-6 h-6 text-primary" />,
    title: "Theming (Dark/Light)",
    description: "Easily switch between dark and light modes with CSS variables.",
  },
  {
    icon: <FolderGit2 className="w-6 h-6 text-primary" />,
    title: "Developer-Friendly DX",
    description: "Clean folder structure, Type-safe components, and scalable architecture.",
  },
];

const painPoints = [
    { icon: <XCircle className="w-5 h-5 text-red-400/80" />, text: "Rebuilding auth from scratch" },
    { icon: <XCircle className="w-5 h-5 text-red-400/80" />, text: "Inconsistent UI & UX" },
    { icon: <XCircle className="w-5 h-5 text-red-400/80" />, text: "Weeks wasted on boilerplate" },
    { icon: <XCircle className="w-5 h-5 text-red-400/80" />, text: "Ignoring scalability" },
];

const solutions = [
    { icon: <CheckCircle className="w-5 h-5 text-green-400/80" />, text: "Production-ready auth" },
    { icon: <CheckCircle className="w-5 h-5 text-green-400/80" />, text: "Pixel-perfect component library" },
    { icon: <CheckCircle className="w-5 h-5 text-green-400/80" />, text: "Launch in days, not months" },
    { icon: <CheckCircle className="w-5 h-5 text-green-400/80" />, text: "Architecture that scales" },
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

const faqs = [
    {
        q: "Is this production-ready?",
        a: "Yes. LaunchBase is built with a production-first mindset, using best practices for security, scalability, and performance. It's ready to be deployed for real-world applications.",
    },
    {
        q: "Can I use it for commercial projects?",
        a: "Absolutely. The standard license allows you to use LaunchBase for unlimited commercial projects for yourself or your clients. You just can't resell the starter kit itself.",
    },
    {
        q: "What is the tech stack?",
        a: "LaunchBase is built on Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Prisma. It provides a solid foundation that's both modern and highly scalable.",
    },
    {
        q: "Is support included?",
        a: "Yes, the purchase includes 6 months of email support for any questions related to the starter kit's features, and implementation.",
    }
]


const codeSnippet = `
import { Button } from "@/components/ui/button";

export function PrimaryButton() {
  return (
    <Button
      className="bg-gradient-to-r 
                 from-primary to-accent"
    >
      Get Started
    </Button>
  )
}
`.trim();

export default function LandingPage() {
  const { user, isUserLoading } = useUser();
  const heroImage = placeholderImages.find(p => p.id === "hero-dashboard-preview");
  const productPreviewImage = placeholderImages.find(p => p.id === "product-preview-dashboard");

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--muted))_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <h1 className="text-xl font-bold">LaunchBase</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="font-medium text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="#pricing" className="font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/docs" className="font-medium text-muted-foreground hover:text-foreground">Docs</Link>
          </nav>
          <div className="flex items-center justify-end gap-2">
              {isUserLoading ? (
                <div className="h-10 w-32 flex gap-2">
                  <Skeleton className="h-full w-1/2" />
                  <Skeleton className="h-full w-1/2" />
                </div>
              ) : user ? (
                <Button asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
                Launch your SaaS in days, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text">not months.</span>
                </h1>
                <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground mb-8">
                LaunchBase is a production-ready Next.js starter kit with everything you need to build, ship, and scale your SaaS application, fast.
                </p>
                <div className="flex justify-center lg:justify-start gap-4">
                    <Button size="lg" asChild>
                    <Link href="/register">Get the Starter Kit <ArrowRight className="w-4 h-4 ml-2"/></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard">View Demo</Link>
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground mt-4">Built for modern SaaS teams.</p>
            </div>
             <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-25"></div>
                {heroImage && 
                    <Image 
                        src={heroImage.imageUrl} 
                        alt="LaunchBase Dashboard Preview" 
                        width={1200}
                        height={800}
                        className="relative rounded-xl border border-border/20 shadow-2xl"
                        data-ai-hint={heroImage.imageHint}
                    />
                }
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-8">
            <div className="container">
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-center text-sm font-semibold text-muted-foreground">
                    <span>Used by Indie Hackers</span>
                    <span className="hidden md:block w-px h-6 bg-border"></span>
                    <span>Built with Next.js & TypeScript</span>
                    <span className="hidden md:block w-px h-6 bg-border"></span>
                    <span>Production-Ready Architecture</span>
                    <span className="hidden md:block w-px h-6 bg-border"></span>
                    <span>Stripe & Prisma Integrated</span>
                </div>
            </div>
        </section>


        {/* Problem → Solution */}
        <section className="py-24">
            <div className="container">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Stop Reinventing the Wheel.</h2>
                  <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                    Focus on your unique features, not on the boilerplate that every SaaS needs.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 bg-card/50">
                        <h3 className="text-xl font-semibold mb-4">The Slow Way</h3>
                        <ul className="space-y-3">
                            {painPoints.map(item => (
                                <li key={item.text} className="flex items-center gap-3 text-muted-foreground">
                                    {item.icon}<span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                     <Card className="p-6 bg-card/50 border-primary/50 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">The LaunchBase Way</h3>
                        <ul className="space-y-3">
                            {solutions.map(item => (
                                <li key={item.text} className="flex items-center gap-3">
                                    {item.icon}<span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </section>


        {/* Core Features */}
        <section id="features" className="py-24 bg-card/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need is Included</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                LaunchBase includes all the modern features required to build a scalable and secure SaaS product, right out of the box.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coreFeatures.map((feature) => (
                <Card key={feature.title} className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors p-4">
                  <CardHeader className="p-2">
                    <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">{feature.icon}</div>
                    <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Experience */}
        <section className="py-24">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for a World-Class Developer Experience</h2>
                    <p className="text-muted-foreground mt-4 mb-8">
                        Clean code, a smart folder structure, and type-safety throughout. LaunchBase is designed to be a foundation you'll love building on.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">Next.js App Router</h4>
                                <p className="text-sm text-muted-foreground">Leverage server components, route handlers, and the latest Next.js features.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">TypeScript-First</h4>
                                <p className="text-sm text-muted-foreground">End-to-end type safety to catch errors early and improve developer confidence.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">Prisma & Postgres</h4>
                                <p className="text-sm text-muted-foreground">A robust, type-safe ORM connected to a production-grade database.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-card/50 border border-border/50 rounded-xl p-4">
                    <div className="bg-black/50 rounded-lg p-4 h-full">
                      <div className="flex items-center gap-2 mb-4 text-xs">
                          <Code2 className="w-4 h-4 text-primary"/>
                          <span>src/components/ui/button.tsx</span>
                      </div>
                      <pre className="text-xs md:text-sm text-gray-300 overflow-x-auto"><code>{codeSnippet}</code></pre>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-24 bg-card/20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted by World-Class Teams</h2>
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
                                    <p className="mb-6 text-foreground/90">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4">
                                        {image && <Avatar>
                                            <AvatarImage src={image.imageUrl} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
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

        {/* Pricing */}
        <section id="pricing" className="py-24">
            <div className="container">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">One Price, Unlimited Potential</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                        Get lifetime access to the complete starter kit, including all future updates, for a single one-time payment.
                    </p>
                </div>
                <div className="flex justify-center">
                    <Card className="max-w-md w-full border-primary/50 shadow-2xl relative overflow-hidden">
                         <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent"></div>
                         <CardHeader className="text-center p-8">
                            <CardTitle className="text-2xl">Complete Starter Kit</CardTitle>
                            <CardDescription className="text-muted-foreground">Everything you need to launch.</CardDescription>
                         </CardHeader>
                         <CardContent className="text-center p-8 pt-0">
                            <p className="text-5xl font-bold mb-2">$149</p>
                            <p className="text-muted-foreground">One-time payment</p>
                            <ul className="text-left space-y-3 mt-8">
                                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/><span>All features included</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/><span>Lifetime updates</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/><span>Unlimited commercial projects</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary"/><span>6 months of support</span></li>
                            </ul>
                         </CardContent>
                         <div className="p-8 pt-0">
                            <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">Get the Starter Kit</Button>
                         </div>
                    </Card>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-card/20">
            <div className="container max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                               {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-24 text-center">
            <div className="container">
                <div className="relative rounded-2xl bg-gradient-to-br from-card/50 to-transparent border border-border/50 p-12 overflow-hidden">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-xl blur-3xl opacity-10 -z-10"></div>
                     <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Ready to Launch?</h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mt-4 mb-8 text-lg">
                        Stop wasting time on boilerplate. Get LaunchBase and ship your SaaS in record time.
                    </p>
                    <div className="flex justify-center">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg text-base" asChild>
                            <Link href="/register">Get the Ultimate SaaS Starter Kit <ArrowRight className="w-5 h-5 ml-2"/></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-card/20 border-t border-border/50">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LaunchBase. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Docs
            </Link>
            <Link href="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
