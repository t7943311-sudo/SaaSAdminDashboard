import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';
import { Shield, Building, Database } from 'lucide-react';

export default function CoreConceptsPage() {
  return (
    <>
      <h1 id="core-concepts">Core Concepts</h1>
      <p className="lead">
        Understanding these core concepts is key to customizing and extending the LaunchBase starter kit.
      </p>

      <h2 id="workspaces">Workspaces & Multi-Tenancy</h2>
      <p>
        LaunchBase is built with a workspace-centric, multi-tenant architecture. A <strong>Workspace</strong> represents a single tenant or organization on the platform. Each user belongs to a workspace, and data is scoped to that workspace where appropriate.
      </p>
      <ul>
        <li>A user creates a workspace during the onboarding flow.</li>
        <li>Users can be invited to join existing workspaces (a feature shown in the demo user management UI).</li>
        <li>The <code>workspaceName</code> is stored on the user's document in Firestore.</li>
      </ul>
      <Callout>
        In a more advanced multi-tenant setup, you might create a separate <code>workspaces</code> collection and link users to it via a <code>workspaceId</code>. This starter kit uses a simpler model for faster setup, storing the workspace name directly on the user object.
      </Callout>

      <h2 id="user-roles">User Roles & Permissions</h2>
      <p>
        A simple but effective Role-Based Access Control (RBAC) system is implemented. By default, there are two roles:
      </p>
       <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Admin</h4>
                <p className="text-sm text-muted-foreground">Admins have full access to the platform, including the Admin Panel for managing users, billing, and system settings.</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-4">
                <Building className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Member</h4>
                <p className="text-sm text-muted-foreground">Members have standard access to the dashboard and its features but cannot access the Admin Panel.</p>
            </div>
        </div>
      <p>
        The user's role is stored in their user document in Firestore (<code>/users/{'{userId}'}</code>). Security rules in <code>firestore.rules</code> use this field to grant or deny access to certain collections and documents. You can extend this by adding more roles and defining more granular permissions.
      </p>
      
      <h2 id="data-model">Data Model (Firestore)</h2>
      <p>
        The starter kit uses Firebase Firestore as its database. The data is structured to be secure and scalable. The main collections are:
      </p>
      <ul>
        <li>
          <code>/users/{'{userId}'}</code>: Stores public user profile information, including their role and workspace name. Security rules ensure users can only write to their own document.
        </li>
        <li>
          <code>/users/{'{userId}'}/subscriptions/{'{subscriptionId}'}</code>: A subcollection for managing user subscriptions.
        </li>
        <li>
          <code>/users/{'{userId}'}/templates/{'{templateId}'}</code>: A subcollection storing user-generated templates.
        </li>
         <li>
          <code>/auditLogs/{'{logId}'}</code>: A collection for logging important administrative actions. Only accessible by admins.
        </li>
      </ul>
       <p>
        This structure is defined in <code>docs/backend.json</code>. The security rules in <code>firestore.rules</code> enforce access control based on this structure.
      </p>

      <Callout variant="info">
        The data model uses denormalization for security and performance. For example, the <code>userId</code> is often stored on subcollection documents to avoid extra database reads in security rules.
      </Callout>

       <div className="mt-12 flex justify-end">
        <Link href="/docs/authentication" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Authentication
        </Link>
      </div>
    </>
  );
}
