import { Callout } from '@/components/docs/callout';
import { Rocket, Layers, Shield } from 'lucide-react';
import Link from 'next/link';

export default function DocsIntroductionPage() {
  return (
    <>
      <h1 id="introduction">Introduction</h1>
      <p className="lead">
        Welcome to the developer documentation for LaunchBase, the ultimate SaaS starter kit designed to help you go from idea to production in record time.
      </p>
      <p>
        This documentation provides everything you need to understand the architecture, customize the components, and build on top of the provided foundation. Whether you're a solo developer, a startup, or an agency, LaunchBase is built to make your life easier.
      </p>

      <Callout>
        This documentation portal is part of the starter kit. You can customize
        it to match your own brand and product, or use it as a reference for building your own.
      </Callout>

      <h2 id="who-is-this-for">Who is this for?</h2>
      <p>
        LaunchBase is for developers, founders, and teams who want to build a
        SaaS application without starting from scratch. It's perfect for:
      </p>
      <ul>
        <li>
          <strong>Indie Hackers</strong> wanting to quickly prototype and launch
          an MVP.
        </li>
        <li>
          <strong>Startups</strong> needing a scalable and secure foundation for
          their core product.
        </li>
        <li>
          <strong>Agencies</strong> building applications for clients with a
          need for multi-tenancy and branding.
        </li>
        <li>
          <strong>Established companies</strong> looking to modernize their
          stack or build new internal tools with a consistent design system.
        </li>
      </ul>

      <h2 id="tech-stack">Tech Stack</h2>
        <p>LaunchBase is built on a modern, robust, and scalable tech stack, chosen for developer experience and performance.</p>
        <ul className="list-disc pl-6">
            <li><strong>Framework:</strong> Next.js (App Router)</li>
            <li><strong>Language:</strong> TypeScript</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>UI Components:</strong> shadcn/ui</li>
            <li><strong>Database:</strong> Firebase Firestore</li>
            <li><strong>Authentication:</strong> Firebase Authentication</li>
            <li><strong>AI:</strong> Google Genkit</li>
        </ul>

      <h2 id="key-features">Key Features</h2>
      <p>
        This starter kit comes packed with the features you'd otherwise spend weeks building yourself.
      </p>
      
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Complete Authentication</h4>
                <p className="text-sm text-muted-foreground">Secure sign-up, login, password-reset, and social login flows ready to go.</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Layers className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Multi-Tenant Admin Panel</h4>
                <p className="text-sm text-muted-foreground">Manage users, workspaces, billing, feature flags, and more from a secure admin dashboard.</p>
            </div>
        </div>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/getting-started" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Quickstart <Rocket className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
