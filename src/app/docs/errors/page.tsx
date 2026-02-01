import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

const errorCodes = [
    { code: '400', message: 'Bad Request', description: 'Your request is malformed. The request body is likely missing required parameters or is improperly formatted.' },
    { code: '401', message: 'Unauthorized', description: 'Your API key is wrong or missing. Please check your credentials.' },
    { code: '403', message: 'Forbidden', description: 'You do not have permission to access the requested resource. This may be due to role-based access control.' },
    { code: '404', message: 'Not Found', description: 'The requested resource could not be found. Check the ID and try again.' },
    { code: '429', message: 'Too Many Requests', description: 'You have hit a rate limit. Please slow down your requests.' },
    { code: '500', message: 'Internal Server Error', description: 'We had a problem with our server. Please try again later. If the issue persists, contact support.' },
];

const errorResponseExample = `{
  "error": {
    "type": "invalid_request_error",
    "code": "resource_missing",
    "message": "No such user: 'usr_nonexistent'",
    "param": "id"
  }
}`;

export default function ErrorsPage() {
  return (
    <>
      <h1 id="errors">Errors</h1>
      <p className="lead">
        This page describes how LaunchBase handles API and permission errors, which is crucial for building a robust application.
      </p>

      <h2 id="api-errors">API Errors</h2>
      <p>
        LaunchBase uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the <code>2xx</code> range indicate success, codes in the <code>4xx</code> range indicate an error that failed given the information provided, and codes in the <code>5xx</code> range indicate an error with our servers.
      </p>

      <h3 id="error-response-body">Error Response Body</h3>
      <p>
        When an API request fails, we return a JSON object containing details about the error. The object includes an error <code>type</code>, a specific <code>code</code>, a human-readable <code>message</code>, and optionally the <code>param</code> that caused the issue.
      </p>
      <CodeBlock code={errorResponseExample} lang="json" />

      <h3 id="http-status-codes">HTTP Status Codes</h3>
      <div className="my-6 w-full overflow-y-auto">
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {errorCodes.map((error) => (
                    <TableRow key={error.code}>
                        <TableCell>
                            <code className="font-mono font-semibold">{error.code}</code>
                        </TableCell>
                        <TableCell>{error.message}</TableCell>
                        <TableCell>{error.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>

      <h2 id="permission-errors">Firestore Permission Errors</h2>
        <p>
            A common source of errors in a Firebase application is Firestore Security Rules. When a client attempts an operation that the rules deny, Firestore returns a "Missing or insufficient permissions" error.
        </p>
        <p>
            LaunchBase includes a custom error handling system to make these errors easier to debug. The <code>useDoc</code> and <code>useCollection</code> hooks automatically catch these errors and wrap them in a custom <code>FirestorePermissionError</code> class.
        </p>
        <Callout>
            This custom error is then thrown and caught by a global error boundary, which will display a detailed, developer-friendly overlay with the exact request that was denied. Check out the <Link href="/docs/global-states">Global States</Link> page for more information.
        </Callout>
    </>
  );
}
