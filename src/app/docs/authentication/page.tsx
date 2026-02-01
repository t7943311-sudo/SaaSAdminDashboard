import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';

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
      <p>
        LaunchBase provides a complete, production-ready authentication system powered by Firebase Authentication. It includes secure login, registration, password reset, and social sign-in flows out of the box.
      </p>

      <h2 id="configuration">Configuration</h2>
      <p>
        Authentication is configured through your Firebase project. You'll need to enable your desired sign-in providers (Email/Password, Google, etc.) in the Firebase Console.
      </p>
      <p>
        Your project's Firebase configuration is located in <code>src/firebase/config.ts</code>. The build process automatically populates this with your project credentials.
      </p>
      <CodeBlock code={firebaseConfig} lang="json" />

      <h2 id="accessing-the-user">Accessing the User</h2>
      <p>
        On the client-side, you can easily access the currently authenticated user's state using the <code>useUser</code> hook. This hook provides the user object, loading state, and any authentication errors.
      </p>
      <CodeBlock code={useUserHook} lang="tsx" />
      <Callout variant="info">
        The <code>useUser</code> hook should be used within a component that is a child of the <code>FirebaseClientProvider</code>, which is already set up in your root layout.
      </Callout>

      <h2 id="securing-pages">Securing Pages & Routes</h2>
      <p>
        The starter kit comes with pre-built logic to protect routes. The dashboard and admin layouts automatically redirect unauthenticated users to the login page.
      </p>
      <p>
        Server-side route protection is handled by checking the user's session in API Routes or Server Actions. On the client, the <code>useUser</code> hook can be used to conditionally render content or redirect.
      </p>

      <h2 id="security-rules">Security Rules</h2>
      <p>
        All access to Firestore data is governed by Security Rules. The default rules in <code>firestore.rules</code> enforce a user-ownership model, where users can only read and write their own data.
      </p>
      <Callout variant="warning">
        Always test your security rules thoroughly before deploying to production. The Firebase Emulator Suite is highly recommended for local testing.
      </Callout>
    </>
  );
}
