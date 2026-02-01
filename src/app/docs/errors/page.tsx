import { CodeBlock } from '@/components/docs/code-block';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const errorCodes = [
    { code: '400', message: 'Bad Request', description: 'Your request is malformed. The request body is likely missing required parameters or is improperly formatted.' },
    { code: '401', message: 'Unauthorized', description: 'Your API key is wrong or missing. Please check your credentials.' },
    { code: '403', message: 'Forbidden', description: 'You do not have permission to access the requested resource. This may be due to role-based access control.' },
    { code: '404', message: 'Not Found', description: 'The requested resource could not be found. Check the ID and try again.' },
    { code: '429', message: 'Too Many Requests', description: 'You have hit a rate limit. Please slow down your requests.' },
    { code: '500', message: 'Internal Server Error', description: 'We had a problem with our server. Please try again later. If the issue persists, contact support.' },
]

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
      <p>
        LaunchBase uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the <code>2xx</code> range indicate success, codes in the <code>4xx</code> range indicate an error that failed given the information provided (e.g., a required parameter was omitted), and codes in the <code>5xx</code> range indicate an error with our servers.
      </p>

      <h2 id="error-response-body">Error Response Body</h2>
      <p>
        When an API request fails, we return a JSON object containing details about the error. The object includes an error <code>type</code>, a specific <code>code</code>, a human-readable <code>message</code>, and optionally the <code>param</code> that caused the issue.
      </p>
      <CodeBlock code={errorResponseExample} lang="json" />

      <h2 id="http-status-codes">HTTP Status Codes</h2>
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
    </>
  );
}
