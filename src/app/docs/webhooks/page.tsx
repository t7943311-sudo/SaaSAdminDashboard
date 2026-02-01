import { CodeBlock } from '@/components/docs/code-block';
import { Callout } from '@/components/docs/callout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

const events = [
    { event: 'user.created', description: 'Occurs when a new user signs up.' },
    { event: 'user.updated', description: 'Occurs when a user\'s profile is updated.' },
    { event: 'user.deleted', description: 'Occurs when a user is deleted.' },
    { event: 'subscription.created', description: 'Occurs when a new subscription is created.' },
    { event: 'subscription.updated', description: 'Occurs when a subscription is upgraded, downgraded, or canceled.' },
    { event: 'invoice.paid', description: 'Occurs when an invoice is successfully paid.' },
    { event: 'invoice.payment_failed', description: 'Occurs when an invoice payment fails.' },
];

const payloadExample = `{
  "id": "evt_12345",
  "type": "user.created",
  "apiVersion": "2024-07-20",
  "data": {
    "object": {
      "id": "usr_67890",
      "email": "new.user@example.com",
      "firstName": "Jane",
      "createdAt": "2024-07-20T10:00:00Z"
    }
  },
  "createdAt": "2024-07-20T10:00:01Z"
}`;

const signatureExample = `
import { createHmac } from 'crypto';

const secret = 'whsec_your_webhook_secret';
const receivedSignature = request.headers['launchbase-signature'];
const payload = JSON.stringify(request.body);

const expectedSignature = createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

// Use a timing-safe comparison
if (crypto.timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature))) {
  // Signature is valid
} else {
  // Signature is invalid
}
`;


export default function WebhooksPage() {
  return (
    <>
      <h1 id="webhooks">Webhooks</h1>
      <p className="lead">
        Webhooks allow you to receive real-time notifications of events that happen in your LaunchBase application. You can use them to trigger downstream processes, such as sending emails, updating a CRM, or provisioning resources.
      </p>
      
      <Callout>
        The starter kit provides the UI and data structures for webhooks in the Settings page (<code>/dashboard/settings</code>) for demonstration. You will need to implement the backend logic to send the webhooks yourself.
      </Callout>

      <h2 id="events">Events</h2>
      <p>When an event occurs, you would send a POST request with a JSON payload to your users' configured webhook endpoints. Here are the events you can subscribe to:</p>
      
      <div className="my-6 w-full overflow-y-auto">
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event) => (
                    <TableRow key={event.event}>
                        <TableCell>
                            <code className="font-mono">{event.event}</code>
                        </TableCell>
                        <TableCell>{event.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </div>

      <h2 id="payload-structure">Payload Structure</h2>
      <p>
        Every webhook payload should follow the same structure, containing an event <code>id</code>, <code>type</code>, and a <code>data</code> object with the relevant resource.
      </p>
      <CodeBlock code={payloadExample} lang="json" />

      <h2 id="verifying-signatures">Verifying Signatures</h2>
      <p>
        To ensure that webhook requests are genuinely from your application, you should sign each request with a secret key. You can generate a unique secret for each webhook endpoint.
      </p>
      <p>
        The signature is typically included in an HTTP header (e.g., <code>LaunchBase-Signature</code>). The receiving server can then compute its own signature and compare it to the one you sent.
      </p>
      <CodeBlock code={signatureExample} lang="javascript" />
       <Callout variant="warning">
        Always use a constant-time comparison function (like <code>crypto.timingSafeEqual</code> in Node.js) to compare signatures to mitigate timing attacks.
      </Callout>
      
       <h2 id="retries">Retries</h2>
      <p>
        If your endpoint does not respond with a <code>2xx</code> status code, you should implement a retry mechanism. A common strategy is to use exponential backoff for up to 72 hours before marking the webhook as failed.
      </p>
       <div className="mt-12 flex justify-end">
        <Link href="/docs/errors" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Errors
        </Link>
      </div>
    </>
  );
}
