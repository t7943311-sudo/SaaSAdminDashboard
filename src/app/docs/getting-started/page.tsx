import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';
import Link from 'next/link';
import { Folder } from 'lucide-react';

export default function GettingStartedPage() {
  return (
    <>
      <h1 id="getting-started">Getting Started</h1>
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
      
      <h2 id="installation-and-setup">Installation and Setup</h2>
      
      <h3 id="step-1-install-dependencies">1. Install Dependencies</h3>
        <p>
          First, navigate to your project directory in your terminal and install the necessary Node.js dependencies.
        </p>
        <CodeBlock code={'npm install'} lang="bash" />
      
      <h3 id="step-2-connect-to-firebase">2. Connect to Firebase</h3>
        <p>
            This starter kit is tightly integrated with Firebase for its backend services, including Authentication and the Firestore Database. You need to connect your local project to a Firebase project.
        </p>
        <Callout>
            The easiest way to get started is to let Firebase Studio handle this for you. From the chat, ask the assistant to "create a firebase project". It will provision a new project and automatically configure your local environment.
        </Callout>
        <p>
            If you prefer to set it up manually, follow these steps:
        </p>
        <ol>
            <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a> and create a new project.</li>
            <li>In your new project, create a new <strong>Web App</strong>.</li>
            <li>After creating the web app, Firebase will provide you with a `firebaseConfig` object. Copy this object.</li>
            <li>Paste the copied `firebaseConfig` object into the <code>src/firebase/config.ts</code> file, replacing the placeholder content.</li>
        </ol>


      <h3 id="step-3-enable-firebase-services">3. Enable Firebase Services</h3>
        <p>
          In the Firebase Console for your newly created project, you need to enable the core services used by the starter kit:
        </p>
         <ul>
            <li>
                <strong>Authentication:</strong> Go to the "Authentication" section (under "Build"), click "Get started", and on the "Sign-in method" tab, enable the **Email/Password** and **Google** providers.
            </li>
            <li>
                <strong>Firestore Database:</strong> Go to the "Firestore Database" section (under "Build"), click "Create database", and start in **Production mode**. Choose a location close to your users. The security rules will be deployed later.
            </li>
        </ul>
        <Callout variant="warning">
            When you create your Firestore database, it will ask you to set up security rules. You can start with the default deny-all rules. The <code>firestore.rules</code> file in this project contains the necessary rules for the application to function correctly, which you should deploy to your project.
        </Callout>

      <h3 id="step-4-run-the-development-server">4. Run the Development Server</h3>
        <p>
          You're all set! Start the development server to see your
          application in action. By default, it will be available at{' '}
          <a href="http://localhost:9002">http://localhost:9002</a>.
        </p>
        <CodeBlock code={'npm run dev'} lang="bash" />
        <p>You can now sign up for a new account and explore the application. The very first user to sign up will automatically be assigned the 'admin' role, giving you access to the Admin Panel.</p>
        
      <h2 id="project-folder-structure">Project Folder Structure</h2>
      <p>
        LaunchBase uses a feature-centric folder structure inside the <code>/src</code> directory, organized to be intuitive and scalable.
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
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/firebase</code> - Firebase configuration, providers, and custom hooks (e.g., `useUser`, `useDoc`).</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/lib</code> - Utility functions, type definitions, and other shared logic.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/src/ai</code> - Genkit flows and AI configuration.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/docs</code> - Contains the backend data model schema.</li>
            <li className="flex items-center gap-2"><Folder className="w-4 h-4 text-primary"/> <code>/firestore.rules</code> - Security rules for your Firestore database.</li>

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
