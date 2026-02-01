import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';
import Link from 'next/link';
import { Folder } from 'lucide-react';

export default function GettingStartedPage() {
  return (
    <>
      <h1 id="quickstart">Quickstart Guide</h1>
      <p className="lead">
        This guide will walk you through setting up your local development environment for LaunchBase. You'll be up and running in minutes.
      </p>
      
      <h2 id="prerequisites">Prerequisites</h2>
      <p>
        Before you begin, ensure you have the following installed on your machine:
      </p>
      <ul>
        <li>Node.js (v18 or later)</li>
        <li>npm, yarn, or pnpm</li>
        <li>A Google account for Firebase</li>
      </ul>
      
      <h2 id="setup-steps">Setup Steps</h2>
      
      <h3 id="step-1-install-dependencies">1. Install Dependencies</h3>
        <p>
          First, navigate to your project directory in your terminal and install the necessary dependencies.
        </p>
        <CodeBlock code={'npm install'} lang="bash" />
      
      <h3 id="step-2-configure-firebase">2. Configure Firebase</h3>
        <p>
            This starter kit is tightly integrated with Firebase for authentication and database services. You need to connect it to a Firebase project.
        </p>
        <Callout>
            The easiest way to get started is to let Firebase Studio handle this for you. From the chat, ask the assistant to "create a firebase project". It will provision a new project and automatically configure your local environment.
        </Callout>
        <p>
            If you prefer to set it up manually, create a new project in the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a>, create a new Web App, and copy the `firebaseConfig` object into the <code>src/firebase/config.ts</code> file.
        </p>

      <h3 id="step-3-enable-services">3. Enable Firebase Services</h3>
        <p>
          In the Firebase Console, you need to enable the services used by the starter kit:
        </p>
         <ul>
            <li>
                <strong>Authentication:</strong> Go to the "Authentication" section, click "Get started", and enable the **Email/Password** and **Google** sign-in providers.
            </li>
            <li>
                <strong>Firestore Database:</strong> Go to the "Firestore Database" section, click "Create database", and start in **Production mode**. Choose a location close to your users.
            </li>
        </ul>

      <h3 id="step-4-run-the-dev-server">4. Run the Development Server</h3>
        <p>
          You're all set! Start the development server to see your
          application in action. By default, it will be available at{' '}
          <a href="http://localhost:9002">http://localhost:9002</a>.
        </p>
        <CodeBlock code={'npm run dev'} lang="bash" />
        <p>You can now sign up for a new account and explore the application. Your first user will automatically be assigned the 'admin' role.</p>
        
      <h2 id="folder-structure">Project Folder Structure</h2>
      <p>
        LaunchBase uses a feature-centric folder structure inside the <code>/src</code> directory. Here's a high-level overview of the most important files and folders.
      </p>
      <div className="my-4 rounded-lg border p-4">
        <ul className="!list-none !p-0 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/app</code> - All application routes, layouts, and pages (using the Next.js App Router).</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>(auth)</code> - Auth routes like login and registration.</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>dashboard</code> - All protected dashboard routes for standard users.</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>admin</code> - Protected admin panel routes, accessible only to users with the 'admin' role.</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>docs</code> - The developer documentation pages.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/components</code> - Reusable React components.</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>ui</code> - Core UI components from shadcn/ui.</li>
            <li className="flex items-center gap-2 pl-6"><Folder className="w-4 h-4 text-primary"/> <code>dashboard</code> - Components used specifically across the dashboard pages.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/firebase</code> - Firebase configuration, providers, and custom hooks (e.g., `useUser`).</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/lib</code> - Utility functions, type definitions, and other shared logic.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/ai</code> - Genkit flows and AI configuration.</li>
        </ul>
      </div>

       <div className="mt-12 flex justify-end">
        <Link href="/docs/core-concepts" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Core Concepts
        </Link>
      </div>
    </>
  );
}
