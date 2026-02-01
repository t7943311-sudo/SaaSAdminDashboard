import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function DashboardGuidePage() {
  return (
    <>
      <h1 id="dashboard-guide">Dashboard Guide</h1>
      <p className="lead">
        The main dashboard is the central hub for your users. This guide explains its structure and how to customize it.
      </p>

      <h2 id="layout">Layout</h2>
      <p>
        The dashboard layout is defined in <code>src/app/dashboard/layout.tsx</code>. It includes a collapsible sidebar for navigation and a main content area.
      </p>
      <ul>
        <li><strong>Sidebar:</strong> The navigation links are defined in <code>src/components/dashboard-nav.tsx</code>. You can easily add or remove links from this file.</li>
        <li><strong>Header:</strong> The header contains a global search bar and a user navigation menu (<code>src/components/user-nav.tsx</code>).</li>
        <li><strong>Protected Routes:</strong> The layout includes logic to redirect unauthenticated users to the login page. It also ensures new users complete the onboarding flow before accessing the dashboard.</li>
      </ul>

      <h2 id="pages">Core Pages</h2>
      <p>
        The starter kit comes with several pre-built dashboard pages to showcase common SaaS features.
      </p>
      <ul>
        <li>
          <strong>Dashboard (<code>/dashboard</code>):</strong> The main landing page with KPI cards and charts.
        </li>
        <li>
          <strong>Analytics (<code>/dashboard/analytics</code>):</strong> A page dedicated to more detailed analytics and data visualization.
        </li>
        <li>
          <strong>Templates (<code>/dashboard/templates</code>):</strong> An example of a core feature page, demonstrating AI integration with Genkit for generating content.
        </li>
        <li>
          <strong>Users & Teams (<code>/dashboard/users</code>):</strong> A page for managing users within a workspace (demo data).
        </li>
        <li>
          <strong>Billing (<code>/dashboard/billing</code>):</strong> A complete subscription management portal for users to change plans and view invoices.
        </li>
        <li>
          <strong>Settings (<code>/dashboard/settings</code>):</strong> A multi-tab settings page for managing profile, workspace, security, and more.
        </li>
      </ul>
      
      <h2 id="customization">Customizing the Dashboard</h2>
      <p>
        To add a new page to the dashboard:
      </p>
      <ol>
        <li>Create a new folder under <code>src/app/dashboard/your-feature-name</code>.</li>
        <li>Add a <code>page.tsx</code> file inside the new folder.</li>
        <li>Add a link to your new page in <code>src/components/dashboard-nav.tsx</code>.</li>
      </ol>
      <Callout>
        All pages within the <code>/dashboard</code> directory are automatically protected by the authentication and onboarding checks in the root layout.
      </Callout>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/admin-panel" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Admin Panel
        </Link>
      </div>
    </>
  );
}
