import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';
import Link from 'next/link';

const firebaseConfig = `{
  "projectId": "your-project-id",
  "appId": "your-app-id",
  "apiKey": "your-api-key",
  "authDomain": "your-project.firebaseapp.com"
}`;

const useUserHook = `
'use client';
import { useUser } from '@/firebase';

function UserProfile() {
    const { user, isUserLoading } = useUser();

    if (isUserLoading) return <p>Loading...</p>;
    if (!user) return <p>Not logged in.</p>;

    return <div>Hello, {user.displayName}</div>
}
`;

export default function AuthenticationPage() {
  return (
    <>
      <h1 id="authentication">Authentication</h1>
      <p className="lead">
        LaunchBase provides a complete, production-ready authentication system powered by Firebase Authentication. It includes secure login, registration, password reset, and social sign-in flows out of the box.
      </p>

      <h2 id="configuration">Configuration</h2>
      <p>
        Authentication is configured through your Firebase project. You'll need to enable your desired sign-in providers (Email/Password, Google, etc.) in the Firebase Console under the "Authentication" section.
      </p>
      <p>
        Your project's Firebase configuration is located in <code>src/firebase/config.ts</code>. The build process automatically populates this with your project credentials if you are using Firebase Studio.
      </p>
      <CodeBlock code={firebaseConfig} lang="json" />

      <h2 id="accessing-the-user">Accessing the User State</h2>
      <p>
        On the client-side, you can easily access the currently authenticated user's state using the <code>useUser</code> hook. This hook provides the user object, loading state, and any authentication errors, abstracting away the complexity of Firebase's `onAuthStateChanged` listener.
      </p>
      <CodeBlock code={useUserHook} lang="tsx" />
      <Callout variant="info">
        The <code>useUser</code> hook should be used within a component that is a child of the <code>FirebaseClientProvider</code>, which is already set up in your root layout (<code>src/app/layout.tsx</code>).
      </Callout>

      <h2 id="securing-pages">Securing Pages & Routes</h2>
      <p>
        The starter kit comes with pre-built logic to protect routes. Both the main dashboard (<code>/dashboard</code>) and the admin panel (<code>/admin</code>) have layouts that automatically redirect unauthenticated users to the login page.
      </p>
      <p>
        This client-side protection is handled in the respective layout files (e.g., <code>src/app/dashboard/layout.tsx</code>) by checking the state from the <code>useUser</code> hook.
      </p>

      <h2 id="security-rules">Backend Security (Firestore Rules)</h2>
      <p>
        While client-side checks are useful for UX, true security is enforced on the backend by Firestore Security Rules. The default rules in <code>firestore.rules</code> enforce a user-ownership model, where users can only read and write their own data.
      </p>
      <CodeBlock code={`
// Example rule: Only the owner can read or write their own templates.
match /users/{userId}/templates/{templateId} {
  allow read, write: if isOwner(userId);
}
      `} lang="rust" />
      <p>
        This ensures that even if a user bypasses client-side restrictions, they cannot access or modify data that doesn't belong to them. See the <Link href="/docs/core-concepts">Core Concepts</Link> guide for more on the data model.
      </p>
       <Callout variant="warning">
        Always test your security rules thoroughly before deploying to production. The Firebase Emulator Suite is highly recommended for local testing.
      </Callout>

       <div className="mt-12 flex justify-end">
        <Link href="/docs/onboarding" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Onboarding Flow
        </Link>
      </div>
    </>
  );
}
