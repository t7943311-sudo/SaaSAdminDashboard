import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function GlobalStatesPage() {
  return (
    <>
      <h1 id="global-states">Global States: Loading, Empty & Errors</h1>
      <p className="lead">
        A polished application handles all possible states gracefully. LaunchBase provides a unified system for managing loading, empty, error, and permission states across the entire platform.
      </p>

      <h2 id="loading-states">Loading States & Skeleton UI</h2>
      <p>
        To prevent jarring layout shifts while data is being fetched, LaunchBase uses skeleton loaders. These are placeholder components that mimic the structure of the final content.
      </p>
      <ul>
        <li><strong>Component:</strong> The <code>&lt;Skeleton /&gt;</code> component from <code>src/components/ui/skeleton.tsx</code> is used to create these placeholders.</li>
        <li><strong>Implementation:</strong> On pages that fetch data (e.g., <code>/admin/users</code>), the component checks the <code>isLoading</code> flag from the data-fetching hook and renders a skeleton version of the UI.</li>
      </ul>
      <CodeBlock code={`
// Example from src/app/admin/users/page.tsx
const { data: users, isLoading, error } = useCollection<FirebaseUserEntity>(usersCollection);

// ...

<TableBody>
  {isLoading && Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                {/* ... more skeletons ... */}
            </div>
          </TableCell>
      </TableRow>
  ))}
  {/* ... render real data when not loading ... */}
</TableBody>
      `} lang="tsx" />

      <h2 id="empty-states">Empty States</h2>
      <p>
        An empty state is an opportunity to guide the user. Instead of showing a blank page, LaunchBase provides context and a clear call to action.
      </p>
      <p>
        For example, on the feature flags page (<code>/admin/feature-flags</code>), if no flags have been created, the UI displays a message encouraging the user to create their first one, along with a button to open the creation dialog. This pattern is repeated across the application.
      </p>

      <h2 id="error-states">Error States</h2>
      <p>
        When an unrecoverable error occurs, it's important to inform the user without causing alarm.
      </p>
       <ul>
        <li><strong>Permission Errors:</strong> If a user tries to access data they don't have permission for, Firestore will deny the request. The application hooks (<code>useDoc</code>, <code>useCollection</code>) will catch this, and the UI will display a specific error message about permissions.</li>
        <li><strong>Access Denied Pages:</strong> For entire routes (like the <code>/admin</code> panel), if a non-admin user tries to access it, they are shown a full-page "Access Denied" component instead of the content.</li>
      </ul>

      <h2 id="global-error-handling">Global Error Handling for Developers</h2>
      <p>
        LaunchBase includes a powerful global error handling system specifically for developers to debug Firestore permission errors.
      </p>
      <ol>
        <li>When a Firestore operation fails due to security rules, a custom <code>FirestorePermissionError</code> is created.</li>
        <li>This error is emitted via a global event emitter.</li>
        <li>An invisible component, <code>&lt;FirebaseErrorListener /&gt;</code>, catches this event and re-throws the error.</li>
        <li>This thrown error is then caught by Next.js's error boundary, which displays a detailed overlay showing exactly which request was denied, making it much easier to debug your security rules.</li>
      </ol>
      <Callout>
        This advanced error handling means you spend less time guessing why a query failed and more time building. You can find the implementation in <code>src/firebase/errors.ts</code> and <code>src/firebase/error-emitter.ts</code>.
      </Callout>
      
      <div className="mt-12 flex justify-end">
        <Link href="/docs/api-reference" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: API Reference
        </Link>
      </div>
    </>
  );
}
