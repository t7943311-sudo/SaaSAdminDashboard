import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function DemoModePage() {
  return (
    <>
      <h1 id="demo-mode">Demo Data & States</h1>
      <p className="lead">
        To create a compelling "out-of-the-box" experience for reviewers and potential buyers, LaunchBase is designed to look and feel like a live, active application even with a completely empty database. This is achieved through a "demo mode".
      </p>

      <h2 id="how-it-works">How It Works</h2>
      <p>
        Many pages that fetch data from Firestore, like the billing, subscriptions, and user management pages, include logic to check if the returned data is empty. If the database is empty and there are no errors, the component falls back to rendering a set of realistic, hard-coded demo data.
      </p>
      <CodeBlock code={`
// Example from src/app/admin/subscriptions/page.tsx

const { data: subscriptionsFromDb, isLoading, error } = useCollection<Subscription>(subscriptionsQuery);

// Check if we should use demo data
const useDemoData = !isLoading && !error && (!subscriptionsFromDb || subscriptionsFromDb.length === 0);

// Use demo data if the condition is met, otherwise use data from the DB
const subscriptions = useDemoData ? demoSubscriptions : subscriptionsFromDb;

// ... render the subscriptions table
      `} lang="tsx" />
      <p>
        This approach has several benefits:
      </p>
      <ul>
        <li><strong>Instant Value:</strong> The application looks populated and functional immediately after setup, without requiring any manual data entry.</li>
        <li><strong>Guided Experience:</strong> It shows new users what the application looks like when it's actively being used.</li>
        <li><strong>Safe for Reviewers:</strong> It allows reviewers on marketplaces to explore the full feature set in a safe, read-only state.</li>
      </ul>
      
      <Callout>
        When demo data is being displayed, a "Demo Data" badge often appears on the page to make it clear to the user that they are not seeing live information from the database.
      </Callout>

      <h2 id="demo-data-content">What is Included in Demo Data?</h2>
      <p>
        The demo data is designed to be realistic and covers most of the core features:
      </p>
      <ul>
        <li><strong>Users & Subscriptions:</strong> The admin subscription page shows a list of mock users with different subscription plans and statuses.</li>
        <li><strong>Billing & Invoices:</strong> The user-facing billing page displays a sample active subscription and a history of past invoices.</li>
        <li><strong>Analytics:</strong> All charts on the dashboard and analytics pages are populated with placeholder data to demonstrate data visualization capabilities.</li>
        <li><strong>Activity Feeds:</strong> "Recent Activity" tables are filled with sample events.</li>
      </ul>

      <h2 id="disabling-demo-mode">Disabling Demo Mode</h2>
      <p>
        The demo mode is automatically disabled as soon as you start adding real data to your Firestore database. For example, once the first user subscribes to a plan, the subscriptions page will switch from showing demo data to showing the real subscription from Firestore.
      </p>
       <p>
        If you wish to completely remove the demo data logic, you can search for the <code>useDemoData</code> variable in the codebase and remove the corresponding fallback logic from each page.
      </p>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/global-states" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Global States
        </Link>
      </div>
    </>
  );
}
