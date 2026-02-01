import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function AdminPanelPage() {
  return (
    <>
      <h1 id="admin-panel">Admin Panel</h1>
      <p className="lead">
        The Admin Panel provides a centralized command center for managing your entire platform, accessible only to users with the 'admin' role.
      </p>
      
      <h2 id="access-control">Access Control</h2>
      <p>
        Access to all routes under <code>/admin</code> is protected by the layout file <code>src/app/admin/layout.tsx</code>. This layout checks two things:
      </p>
      <ol>
        <li>Is the user authenticated?</li>
        <li>Does the user's profile in Firestore have <code>role: 'admin'</code>?</li>
      </ol>
      <p>
        If either of these checks fails, the user is redirected or shown an "Access Denied" message.
      </p>

      <h2 id="features">Admin Features</h2>
      <p>The admin panel is pre-configured with several essential dashboards for platform management:</p>
      <ul>
        <li><strong>Overview:</strong> A high-level view of key platform metrics like total users, MRR, and system health.</li>
        <li><strong>User Management:</strong> View, search, and manage every user on the platform. From here you can view user details, change roles, and remove users.</li>
        <li><strong>Workspaces:</strong> See a list of all workspaces and which users belong to them.</li>
        <li><strong>Billing & Subscriptions:</strong> Global dashboards to monitor platform-wide revenue, subscriptions, and recent transactions.</li>
        <li><strong>System Health:</strong> A mock page showing the status of various system components.</li>
        <li><strong>Feature Flags:</strong> A fully functional feature flag management system connected to Firestore.</li>
        <li><strong>Audit Logs:</strong> A real-time log of all significant administrative actions performed on the platform.</li>
        <li><strong>Support Tools:</strong> A page with tools for customer support, like user impersonation (demo).</li>
        <li><strong>Admin Settings:</strong> Configure global platform settings.</li>
      </ul>

      <h2 id="customization">Extending the Admin Panel</h2>
      <p>
        You can add new admin pages by following the same pattern as the dashboard. Create a new page file under <code>/src/app/admin</code> and add a link to it in the admin navigation component, <code>src/components/admin-nav.tsx</code>. The layout will automatically handle security.
      </p>
      <Callout variant="warning">
        When adding new features that write data, be sure to update the Firestore security rules in <code>firestore.rules</code> to grant write access only to admins (using the <code>isAdmin()</code> helper function).
      </Callout>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/theme-builder" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Theme Builder
        </Link>
      </div>
    </>
  );
}
