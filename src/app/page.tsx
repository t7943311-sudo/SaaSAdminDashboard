import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  LayoutDashboard,
  Lock,
  Palette,
  Users,
  Rocket,
  Code,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { placeholderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    title: "Next.js 15 & App Router",
    description: "Built with the latest Next.js for top performance and developer experience.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "TypeScript & Zod",
    description: "End-to-end type safety to build reliable applications at scale.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "AI Integrations",
    description: "Powered by Genkit to easily add AI features to your SaaS.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "Authentication",
    description: "Secure, pre-built authentication flows for users and teams.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Team Management",
    description: "Manage user roles and permissions with a flexible system.",
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "Theming with ShadCN",
    description: "Beautifully designed, customizable components for a modern UI.",
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
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">LaunchBase</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-24 md:py-32 text-center">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Ship Your SaaS in Days, Not Months
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              LaunchBase is the ultimate Next.js boilerplate for founders and developers. Skip the setup and start building your product today.
            </p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">Core Features</Badge>
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div>
                {howItWorksImage &&
                    <Image
                    src={howItWorksImage.imageUrl}
                    alt={howItWorksImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl"
                    data-ai-hint={howItWorksImage.imageHint}
                    />}
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="font-semibold text-lg">Download & Deploy</h3>
                                <p className="text-muted-foreground">Get immediate access to the codebase and deploy to Vercel with one click.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="font-semibold text-lg">Customize Your Brand</h3>
                                <p className="text-muted-foreground">Easily configure your branding, theme, and content to match your vision.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="font-semibold text-lg">Build Your Features</h3>
                                <p className="text-muted-foreground">Focus on what makes your product unique, not on boilerplate code.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section className="py-24 bg-secondary/50">
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

        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Building Your Dream Today</h2>
                <p className="max-w-xl mx-auto text-muted-foreground mb-8">
                    Stop wasting time on setup. Get LaunchBase and focus on what truly matters: your product.
                </p>
                <Button size="lg" asChild>
                    <Link href="/signup">Get LaunchBase Now</Link>
                </Button>
            </div>
        </section>

      </main>

      <footer className="py-8 bg-secondary/50 border-t border-border/50">
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
