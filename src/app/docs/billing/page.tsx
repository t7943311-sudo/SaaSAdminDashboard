import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function BillingPage() {
  return (
    <>
      <h1 id="billing-and-subscriptions">Billing & Subscriptions</h1>
      <p className="lead">
        LaunchBase provides a complete, user-facing billing portal and the necessary data structures to integrate with a payment provider like Stripe.
      </p>

      <h2 id="user-facing-portal">User-Facing Portal</h2>
      <p>
        The billing portal, located at <code>/dashboard/billing</code>, allows authenticated users to manage their subscription. The UI includes:
      </p>
      <ul>
        <li><strong>Current Plan Display:</strong> Shows the user's active plan and usage metrics.</li>
        <li><strong>Plan Selection:</strong> A pricing table where users can compare and select different plans.</li>
        <li><strong>Upgrade/Downgrade Logic:</strong> Modals to confirm plan changes.</li>
        <li><strong>Cancellation Flow:</strong> A dialog to cancel a subscription, with an option to reactivate.</li>
        <li><strong>Invoice History:</strong> A table displaying past invoices with links to download them.</li>
      </ul>
      <Callout>
        The billing page is fully functional in a "demo mode". It uses local state and mock data to simulate plan changes and cancellations. To connect to a real payment provider, you will need to replace these client-side actions with calls to your backend.
      </Callout>

      <h2 id="data-model">Data Model for Billing</h2>
      <p>
        The Firestore data model is designed to support a robust billing system. It includes two key collections:
      </p>
      <ul>
        <li>
          <strong><code>/subscriptionPlans</code>:</strong> A top-level collection to store your available pricing plans (e.g., Free, Pro, Enterprise). This data is typically managed by an admin and is readable by all users.
        </li>
        <li>
          <strong><code>/users/{'{userId}'}/subscriptions</code>:</strong> A subcollection within each user's document to store their subscription status, plan details, and billing cycle dates. This is private to the user.
        </li>
      </ul>
        <p>This structure is defined in <code>docs/backend.json</code> and secured by the rules in <code>firestore.rules</code>.</p>
      

      <h2 id="integrating-with-stripe">Integrating with Stripe (or another provider)</h2>
      <p>
        To build a production-ready billing system, you would typically integrate with Stripe. Here's a high-level overview of the process:
      </p>
      <ol>
        <li><strong>Stripe Setup:</strong> Create your products and prices in the Stripe Dashboard.</li>
        <li><strong>Backend Functions:</strong> Create backend cloud functions (e.g., Firebase Functions) to handle:
            <ul>
                <li>Creating Stripe Checkout sessions for new subscriptions.</li>
                <li>Creating a Stripe Customer Portal for users to manage their payment methods.</li>
                <li>Listening for Stripe webhooks to update the Firestore database (e.g., when a payment succeeds or fails).</li>
            </ul>
        </li>
        <li><strong>Frontend Integration:</strong> Replace the demo logic in <code>/dashboard/billing/page.tsx</code> to call your backend functions. For example, clicking "Upgrade Plan" would trigger a call to your backend to create a Stripe Checkout session, and then redirect the user to Stripe.</li>
      </ol>
       <Callout variant="info">
        This starter kit uses the <a href="https://github.com/stripe-samples/nextjs-firebase-ext-subscription-payments" target="_blank" rel="noopener noreferrer">official Stripe Firebase extension</a> as a reference model. Following their pattern is a highly recommended approach.
      </Callout>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/ai-and-genkit" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: AI & Genkit
        </Link>
      </div>
    </>
  );
}
