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
} from "lucide-react";
import { Logo } from "@/components/logo";
import { placeholderImages } from "@/lib/placeholder-images";

const features = [
  {
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    title: "Customizable Dashboard",
    description:
      "Tailor your dashboard layout to display the most relevant content and data for your workflow.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "AI Template Generation",
    description:
      "Generate professional documents and templates from simple text prompts using our powerful AI.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />,
    title: "User Authentication",
    description:
      "Secure user login and registration with robust credential management and security features.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Roles & Permissions",
    description:
      "Define user roles like admin, editor, or viewer to control access and manage your team effectively.",
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "Subscription Management",
    description:
      "Easily manage user subscriptions, handle payments, and automate invoicing with our integrated system.",
  },
];

export default function LandingPage() {
  const heroImage = placeholderImages.find(p => p.id === "hero");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">SaaS Pilot</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
              The Ultimate SaaS Starter Kit
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              Launch your next project in minutes, not months. SaaS Pilot provides everything you need to build, launch, and scale a modern SaaS application.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>

        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Everything You Need, All in One Place
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                SaaS Pilot is packed with features designed to accelerate your development and business growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powered by Generative AI
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Leverage the power of AI to create content effortlessly. Our template generator understands your needs and produces high-quality, professional documents in seconds. Stop staring at a blank page and let SaaS Pilot do the heavy lifting.
              </p>
              <Button asChild>
                <Link href="/dashboard/templates">Try the Generator</Link>
              </Button>
            </div>
            <div>
              {heroImage &&
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={heroImage.imageHint}
                />}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <p className="text-sm">&copy; {new Date().getFullYear()} SaaS Pilot. All rights reserved.</p>
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
