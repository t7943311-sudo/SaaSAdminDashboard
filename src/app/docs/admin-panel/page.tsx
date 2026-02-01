import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function AdminPanelPage() {
  return (
    <>
      <h1 id="admin-panel">Admin Panel</h1>
      <p className="lead">
        The Admin Panel provides a centralized command center for managing your entire platform. It is a critical feature for any enterprise-ready SaaS and is accessible only to users with the 'admin' role.
      </p>
      
      <h2 id="access-control">Access Control</h2>
      <p>
        Access to all routes under <code>/admin</code> is protected by the layout file <code>src/app/admin/layout.tsx</code>. This layout checks two things on the client-side before rendering any content:
      </p>
      <ol>
        <li>Is the user authenticated?</li>
        <li>Does the user's profile in Firestore have <code>role: 'admin'</code>?</li>
      </ol>
      <p>
        If either of these checks fails, the user is shown an "Access Denied" message and is prevented from seeing any admin content.
      </p>
      <CodeBlock code={`
// src/app/admin/layout.tsx

const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserType>(userDocRef);

// ...

if (userProfile?.role !== 'admin') {
    return <AccessDeniedComponent />;
}

// ... render admin layout
      `} lang="tsx" />
       <Callout variant="warning">
        Client-side checks are for UI purposes. True security is enforced by Firestore Security Rules. The <code>firestore.rules</code> file ensures that only admins can read or write to administrative collections like <code>auditLogs</code>, <code>featureFlags</code>, or other users' data.
      </Callout>

      <h2 id="features">Admin Features</h2>
      <p>The admin panel is pre-configured with several essential dashboards for platform management:</p>
      <ul>
        <li><strong>Overview:</strong> A high-level view of key platform metrics like total users, MRR, and system health.</li>
        <li><strong>User Management:</strong> View, search, and manage every user on the platform. From here you can view user details, change roles, and remove users.</li>
        <li><strong>Workspaces:</strong> See a list of all workspaces and which users belong to them, demonstrating multi-tenancy management.</li>
        <li><strong>Global Billing & Subscriptions:</strong> Dashboards to monitor platform-wide revenue, active subscriptions, and recent transactions.</li>
        <li><strong>System Health:</strong> A mock page showing the status of various system components like the API and database.</li>
        <li><strong>Feature Flags:</strong> A fully functional feature flag management system connected to Firestore. Create flags, toggle them, and they will be persisted.</li>
        <li><strong>Audit Logs:</strong> A real-time log of all significant administrative actions performed on the platform, such as updating a user's role.</li>
        <li><strong>Support Tools:</strong> A page with tools for customer support, like user impersonation (demo).</li>
        <li><strong>Admin Settings:</strong> A page to configure global platform settings, like security policies and notification preferences.</li>
      </ul>

      <h2 id="customization">Extending the Admin Panel</h2>
      <p>
        The admin panel is designed to be easily extendable. To add a new page:
      </p>
      <ol>
        <li>Create a new page file under <code>/src/app/admin/your-new-page</code>. The layout will automatically handle security.</li>
        <li>Add a link to your new page in the admin navigation component, <code>src/components/admin-nav.tsx</code>.</li>
        <li>If your new page interacts with Firestore, be sure to update the <code>firestore.rules</code> file to grant write access only to admins using the <code>isAdmin()</code> helper function.</li>
      </ol>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/billing" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Billing & Subscriptions
        </Link>
      </div>
    </>
  );
}
