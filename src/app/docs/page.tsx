import { Callout } from '@/components/docs/callout';
import { Rocket, Layers, Shield, KeyRound, LayoutDashboard, CreditCard, Users, Bot, Palette, Eye, UserPlus } from 'lucide-react';
import Link from 'next/link';

const keyFeatures = [
    {
        icon: <KeyRound className="h-5 w-5 text-primary" />,
        title: "Complete Authentication",
        description: "Secure signup, login, password reset, and social auth flows.",
        href: "/docs/authentication"
    },
    {
        icon: <UserPlus className="h-5 w-5 text-primary" />,
        title: "Onboarding Flow",
        description: "A multi-step process to welcome and configure new user accounts.",
        href: "/docs/onboarding"
    },
    {
        icon: <LayoutDashboard className="h-5 w-5 text-primary" />,
        title: "Dashboard & UI",
        description: "Pre-built pages for analytics, settings, billing, and user management.",
        href: "/docs/dashboard"
    },
    {
        icon: <Shield className="h-5 w-5 text-primary" />,
        title: "Admin Panel",
        description: "A secure area for platform management, user oversight, and system settings.",
        href: "/docs/admin-panel"
    },
    {
        icon: <CreditCard className="h-5 w-5 text-primary" />,
        title: "Billing & Subscriptions",
        description: "User-facing portal to manage plans, view invoices, and handle payments.",
        href: "/docs/billing"
    },
    {
        icon: <Bot className="h-5 w-5 text-primary" />,
        title: "AI & Genkit Integration",
        description: "An example AI template generator powered by Google's Genkit.",
        href: "/docs/ai-and-genkit"
    },
    {
        icon: <Palette className="h-5 w-5 text-primary" />,
        title: "Theme Builder",
        description: "A no-code tool to customize your application's colors and styles.",
        href: "/docs/theme-builder"
    },
    {
        icon: <Eye className="h-5 w-5 text-primary" />,
        title: "Demo Mode",
        description: "The app feels alive out-of-the-box with realistic placeholder data.",
        href: "/docs/demo-mode"
    }
]

export default function DocsIntroductionPage() {
  return (
    <>
      <h1 id="introduction">Introduction</h1>
      <p className="lead">
        Welcome to the developer documentation for LaunchBase, the ultimate SaaS starter kit designed to help you go from idea to production in record time.
      </p>
      <p>
        This documentation provides everything you need to understand the architecture, customize the components, and build on top of the provided foundation.
      </p>

      <Callout>
        This documentation portal is part of the starter kit. You can customize
        it to match your own brand and product, or use it as a reference.
      </Callout>

      <h2 id="who-is-this-for">Who is this for?</h2>
      <p>
        LaunchBase is for developers, founders, and teams who want to build a
        SaaS application without starting from scratch. It's perfect for:
      </p>
      <ul>
        <li><strong>Indie Hackers</strong> wanting to quickly prototype and launch an MVP.</li>
        <li><strong>Startups</strong> needing a scalable and secure foundation for their core product.</li>
        <li><strong>Agencies</strong> building applications for clients.</li>
      </ul>

      <h2 id="tech-stack">Tech Stack</h2>
      <p>LaunchBase is built on a modern, robust, and scalable tech stack, chosen for developer experience and performance.</p>
      <ul className="not-prose grid grid-cols-2 gap-x-4 gap-y-1 my-4 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.5L1.5 11.25V5.25L9 9L16.5 5.25L9 1.5L1.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.5 11.25V5.25L9 9V12.75L16.5 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> Next.js</li>
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.25L15.75 3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H3.75C3.35218 2.25 2.97064 2.40804 2.68934 2.68934C2.40804 2.97064 2.25 3.35218 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 6H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 9.75H8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.75 12.75L12 16.5L10.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> TypeScript</li>
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.5C12.4518 16.5 15.2572 15.4216 16.5 13.5M1.5 13.5C2.74279 15.4216 5.54823 16.5 9 16.5M9 16.5V1.5M9 1.5C5.54823 1.5 2.74279 2.57842 1.5 4.5M16.5 4.5C15.2572 2.57842 12.4518 1.5 9 1.5M4.5 9C2.57842 7.74279 1.5 4.93734 1.5 4.5M4.5 9C2.57842 10.2572 1.5 13.0627 1.5 13.5M4.5 9H13.5M13.5 9C15.4216 7.74279 16.5 4.93734 16.5 4.5M13.5 9C15.4216 10.2572 16.5 13.0627 16.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> Tailwind CSS</li>
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5L1.5 5.25V12.75L9 16.5L16.5 12.75V5.25L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path><path d="M1.5 5.25L9 9L16.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 16.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> shadcn/ui</li>
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3398 2.625H5.6599C5.39484 2.625 5.14083 2.73031 4.95329 2.91785C4.76575 3.10539 4.66045 3.3594 4.66045 3.62445V15.375C4.66045 15.6401 4.76575 15.8941 4.95329 16.0816C5.14083 16.2692 5.39484 16.3745 5.6599 16.3745H12.3398C12.6048 16.3745 12.8588 16.2692 13.0464 16.0816C13.2339 15.8941 13.3392 15.6401 13.3392 15.375V3.62445C13.3392 3.3594 13.2339 3.10539 13.0464 2.91785C12.8588 2.73031 12.6048 2.625 12.3398 2.625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.99976 5.625H9.00726" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> Firebase</li>
          <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 3.75L6.75 9H9.75L8.25 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg> Google Genkit</li>
      </ul>

      <h2 id="key-features">Key Features</h2>
      <p>
        This starter kit comes packed with the features you'd otherwise spend weeks building yourself.
      </p>
      
      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {keyFeatures.map(feature => (
                <Link key={feature.title} href={feature.href} className="not-prose group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                        {feature.icon}
                        <h4 className="font-semibold text-base group-hover:text-primary">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Link>
            ))}
      </div>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/getting-started" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Quickstart <Rocket className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
