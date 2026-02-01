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
        This documentation provides everything you need to understand the architecture, customize the components, and build on top of the provided foundation.
      </p>

      <Callout>
        This documentation portal is part of the starter kit. You can customize
        it to match your own brand and product.
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
          stack or build new internal tools.
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
            <li><strong>AI:</strong> Genkit</li>
        </ul>

      <h2 id="key-concepts">Key Concepts</h2>
      <p>
        Before you dive in, it's helpful to understand a few core concepts that
        form the foundation of this starter kit:
      </p>
      
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Layers className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Server-Centric Architecture</h4>
                <p className="text-sm text-muted-foreground">Built on the Next.js App Router, allowing a mix of Server and Client Components for optimal performance.</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Workspace-Based Multi-Tenancy</h4>
                <p className="text-sm text-muted-foreground">The data model is designed around "Workspaces", allowing users to belong to different teams, each with its own isolated data.</p>
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
