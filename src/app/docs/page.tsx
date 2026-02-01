import { Callout } from '@/components/docs/callout';
import { Rocket } from 'lucide-react';

export default function DocsIntroductionPage() {
  return (
    <>
      <h1 id="introduction">Introduction</h1>
      <p>
        Welcome to the developer documentation for LaunchBase. This is the
        ultimate SaaS starter kit, designed to help you go from idea to
        production in record time.
      </p>
      <p>
        This documentation provides everything you need to understand the
        architecture, customize the components, and build on top of the
        provided foundation.
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

      <h2 id="key-concepts">Key Concepts</h2>
      <p>
        Before you dive in, it's helpful to understand a few core concepts that
        form the foundation of this starter kit:
      </p>

      <h3 id="architecture">Architecture</h3>
      <p>
        The kit is built on a modern, server-centric architecture using the
        Next.js App Router. This allows for a mix of Server Components and
        Client Components, optimizing for performance and developer experience.
      </p>

      <h3 id="multi-tenancy">Multi-Tenancy</h3>
      <p>
        The data model and UI are designed with multi-tenancy in mind. The concept of a "Workspace" is central, allowing users to belong to different teams or organizations, each with its own data and settings.
      </p>

      <h3 id="extensibility">Extensibility</h3>
      <p>
        From the database schema to the UI components, everything is designed to be extended. The theme builder, component library, and backend services can be customized to fit your specific needs.
      </p>
      
      <div className="mt-12 flex justify-end">
        <a href="/docs/getting-started" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Getting Started <Rocket className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}
