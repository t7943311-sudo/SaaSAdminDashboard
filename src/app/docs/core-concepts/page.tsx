import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';
import { Shield, Building, Database } from 'lucide-react';

export default function CoreConceptsPage() {
  return (
    <>
      <h1 id="core-concepts">Core Concepts</h1>
      <p className="lead">
        Understanding these core concepts is key to customizing and extending the LaunchBase starter kit. The architecture is designed to be scalable, secure, and easy for developers to work with.
      </p>

      <h2 id="workspaces">Workspaces & Multi-Tenancy</h2>
      <p>
        LaunchBase is built with a workspace-centric, multi-tenant architecture. A <strong>Workspace</strong> represents a single tenant or organization on the platform. Each user belongs to a workspace, and data is scoped to that workspace where appropriate.
      </p>
      <ul>
        <li>A user creates their initial workspace during the onboarding flow.</li>
        <li>The starter kit includes UI for inviting users to a workspace (demo functionality).</li>
        <li>The <code>workspaceName</code> is stored on the user's document in Firestore, providing a simple way to group users.</li>
      </ul>
      <Callout>
        In a more advanced multi-tenant setup, you might create a separate <code>workspaces</code> collection and link users to it via a <code>workspaceId</code>. This starter kit uses a simpler model for faster setup, storing the workspace name directly on the user object. The admin panel already demonstrates how to query users by this property to view workspace members.
      </Callout>

      <h2 id="user-roles">User Roles & Permissions</h2>
      <p>
        A simple but effective Role-Based Access Control (RBAC) system is implemented. By default, there are two roles defined:
      </p>
       <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Admin</h4>
                <p className="text-sm text-muted-foreground">Admins have full access to the platform, including the <Link href="/docs/admin-panel">Admin Panel</Link> for managing users, billing, and system settings.</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Building className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Member</h4>
                <p className="text-sm text-muted-foreground">Members have standard access to the dashboard and its features but cannot access the Admin Panel.</p>
            </div>
        </div>
      <p>
        The user's role is stored in their user document in Firestore (<code>/users/{'{userId}'}</code>). Security rules in <code>firestore.rules</code> use this field to grant or deny access to certain collections and documents.
      </p>
       <CodeBlock code={`
function isAdmin() {
  // Check the user's role from their own user document.
  return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}

match /auditLogs/{logId} {
  // Only admins can read or write to the audit log.
  allow read, write: if isAdmin();
}
       `} lang="rust" />
      
      <h2 id="data-model">Data Model & Firestore Backend</h2>
      <p>
        The starter kit uses Firebase Firestore as its database. The data is structured to be secure and scalable, following a "user-owned data" pattern. The main collections are:
      </p>
      <ul>
        <li>
          <code>/users/{'{userId}'}</code>: Stores public user profile information, including their role and workspace name. Security rules ensure users can only write to their own document, while admins can manage any user.
        </li>
        <li>
          <code>/users/{'{userId}'}/subscriptions/{'{subscriptionId}'}</code>: A subcollection for managing a user's subscription details.
        </li>
        <li>
          <code>/users/{'{userId}'}/templates/{'{templateId}'}</code>: A subcollection storing AI-generated templates for a specific user.
        </li>
         <li>
          <code>/auditLogs/{'{logId}'}</code>: A collection for logging important administrative actions. Only accessible by admins.
        </li>
      </ul>
       <p>
        This structure is defined in <code>docs/backend.json</code>. The security rules in <code>firestore.rules</code> enforce access control based on this structure.
      </p>
      
      <h3 id="frontend-interaction">Frontend Interaction with the Database</h3>
       <p>
        The frontend application interacts with Firestore primarily through two custom hooks provided in <code>/src/firebase/</code>:
       </p>
       <ul>
          <li><strong><code>useDoc</code></strong>: Subscribes to a single document in real-time.</li>
          <li><strong><code>useCollection</code></strong>: Subscribes to a collection or a query in real-time.</li>
       </ul>
       <p>These hooks handle loading states, errors, and permissions automatically, making it simple to fetch and display data securely in your components.</p>
       
      <Callout variant="info">
        The data model uses denormalization for security and performance. For example, the <code>userId</code> is often stored on subcollection documents to avoid extra database reads in security rules, which is a critical best practice for Firestore.
      </Callout>

       <div className="mt-12 flex justify-end">
        <Link href="/docs/authentication" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Authentication
        </Link>
      </div>
    </>
  );
}
