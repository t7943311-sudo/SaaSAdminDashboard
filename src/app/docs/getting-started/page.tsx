import { CodeBlock } from '@/components/docs/code-block';
import { KeyRound, Database, Palette, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function GettingStartedPage() {
  return (
    <>
      <h1 id="getting-started">Getting Started</h1>
      <p>
        This guide will walk you through the first few steps to get your SaaS
        application up and running with LaunchBase.
      </p>

      <div className="my-8 space-y-6">
        <article className="flex gap-6 rounded-lg border p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xl font-bold">1</span>
          </div>
          <div>
            <h3 id="step-1" className="mt-0 text-lg font-semibold">
              Set Up Environment Variables
            </h3>
            <p>
              Start by copying the <code>.env.example</code> file to{' '}
              <code>.env.local</code> and filling in the required values. This
              is where you will store your database connection string and other
              secrets.
            </p>
            <CodeBlock code={`cp .env.example .env.local`} lang="bash" />
          </div>
        </article>

        <article className="flex gap-6 rounded-lg border p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xl font-bold">2</span>
          </div>
          <div>
            <h3 id="step-2" className="mt-0 text-lg font-semibold">
              Install Dependencies
            </h3>
            <p>
              Once your environment is configured, install all the necessary
              project dependencies using your favorite package manager.
            </p>
            <CodeBlock code={`npm install`} lang="bash" />
          </div>
        </article>

        <article className="flex gap-6 rounded-lg border p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xl font-bold">3</span>
          </div>
          <div>
            <h3 id="step-3" className="mt-0 text-lg font-semibold">
              Run the Development Server
            </h3>
            <p>
              You're all set! Start the development server to see your
              application in action. By default, it will be available at{' '}
              <a href="http://localhost:3000">http://localhost:3000</a>.
            </p>
            <CodeBlock code={`npm run dev`} lang="bash" />
          </div>
        </article>
      </div>

       <h2 id="next-steps">Next Steps</h2>
      <p>
        Now that your local environment is running, here are a few things you might want to do next:
      </p>
      
       <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/docs/authentication" className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <KeyRound className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Configure Authentication</h4>
                <p className="text-sm text-muted-foreground">Set up social logins and connect to Firebase Auth.</p>
            </Link>
             <Link href="/dashboard/theme" className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Palette className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Customize Your Theme</h4>
                <p className="text-sm text-muted-foreground">Use the Theme Builder to match your brand's look and feel.</p>
            </Link>
            <Link href="/docs/api-reference" className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Rocket className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Explore the API</h4>
                <p className="text-sm text-muted-foreground">Understand the available endpoints in the API Reference.</p>
            </Link>
             <Link href="/dashboard" className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <Database className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Explore the Dashboard</h4>
                <p className="text-sm text-muted-foreground">Check out the pre-built dashboard and admin panels.</p>
            </Link>
        </div>
    </>
  );
}
