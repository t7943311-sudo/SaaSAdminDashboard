import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <>
      <h1 id="onboarding-flow">Onboarding Flow</h1>
      <p className="lead">
        A smooth onboarding experience is critical for user activation. LaunchBase includes a multi-step onboarding flow to welcome new users, gather essential information, and guide them toward their "aha!" moment.
      </p>

      <h2 id="flow-overview">Flow Overview</h2>
      <p>
        After a user signs up for the first time, they are automatically redirected to the <code>/onboarding</code> route. The flow consists of several steps designed to be quick and engaging.
      </p>
      <ol>
        <li><strong>Welcome:</strong> A simple welcome screen that sets the stage.</li>
        <li><strong>Workspace Creation:</strong> Prompts the user to name their workspace (e.g., their company or project name). This is the foundation for multi-tenancy.</li>
        <li><strong>Personalization:</strong> Asks the user about their role or intent (e.g., Founder, Developer). This data can be used to customize their experience.</li>
        <li><strong>Completion:</strong> A confirmation screen that redirects the user to their new dashboard.</li>
      </ol>
      <p>
        The entire onboarding logic is managed in <code>src/app/(onboarding)/onboarding/page.tsx</code>.
      </p>

      <h2 id="data-handling">Data Handling</h2>
      <p>
        Upon completion of the onboarding flow, the user's information is saved to their profile document in Firestore.
      </p>
      <CodeBlock code={`
// src/app/(onboarding)/onboarding/page.tsx

const handleFinish = async () => {
    // ...
    const userDocRef = doc(firestore, 'users', user.uid);
    await updateDoc(userDocRef, {
        workspaceName: formData.workspaceName,
        intent: formData.intent,
        onboardingCompleted: true, // This flag is crucial
        updatedAt: serverTimestamp(),
    });
    // ...
};
      `} lang="tsx" />
      <p>
        The <code>onboardingCompleted: true</code> flag is used by the main dashboard layout (<code>src/app/dashboard/layout.tsx</code>) to ensure that users cannot access the main application until they have finished this setup process.
      </p>

      <h2 id="customization">Customizing the Flow</h2>
      <p>
        The onboarding flow is built with modular steps, making it easy to customize.
      </p>
      <ul>
        <li><strong>Step Components:</strong> Each step is a separate React component located in <code>src/components/onboarding/steps/</code>.</li>
        <li><strong>State Management:</strong> The main page component (<code>onboarding/page.tsx</code>) manages the current step and form data.</li>
        <li><strong>Adding a Step:</strong> To add a new step, create a new component, import it into the main onboarding page, and add it to the rendering logic with a new step number.</li>
      </ul>

      <Callout>
        Consider what information is absolutely essential for a new user to get started. A shorter, more focused onboarding flow often leads to higher completion rates.
      </Callout>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/dashboard" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Dashboard Guide
        </Link>
      </div>
    </>
  );
}
