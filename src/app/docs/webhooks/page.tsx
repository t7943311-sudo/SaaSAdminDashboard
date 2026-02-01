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

const events = [
    { event: 'user.created', description: 'Occurs when a new user signs up.' },
    { event: 'user.updated', description: 'Occurs when a user\'s profile is updated.' },
    { event: 'user.deleted', description: 'Occurs when a user is deleted.' },
    { event: 'subscription.created', description: 'Occurs when a new subscription is created.' },
    { event: 'subscription.updated', description: 'Occurs when a subscription is upgraded, downgraded, or canceled.' },
    { event: 'invoice.paid', description: 'Occurs when an invoice is successfully paid.' },
    { event: 'invoice.payment_failed', description: 'Occurs when an invoice payment fails.' },
]

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
const crypto = require('crypto');

const secret = 'whsec_your_webhook_secret';
const receivedSignature = request.headers['launchbase-signature'];
const payload = JSON.stringify(request.body);

const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

if (receivedSignature === expectedSignature) {
  // Signature is valid
} else {
  // Signature is invalid
}
`;


export default function WebhooksPage() {
  return (
    <>
      <h1 id="webhooks">Webhooks</h1>
      <p>
        Webhooks allow you to receive real-time notifications of events that happen in your LaunchBase application. You can use them to trigger downstream processes, such as sending emails, updating a CRM, or provisioning resources.
      </p>

      <h2 id="events">Events</h2>
      <p>When an event occurs, we send a POST request with a JSON payload to your configured webhook endpoints. Here are the events you can subscribe to:</p>
      
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
        Every webhook payload follows the same structure, containing an event <code>id</code>, <code>type</code>, and a <code>data</code> object with the relevant resource.
      </p>
      <CodeBlock code={payloadExample} lang="json" />

      <h2 id="verifying-signatures">Verifying Signatures</h2>
      <p>
        To ensure that webhook requests are genuinely from LaunchBase, we sign each request with a secret key. You should verify this signature on your server to prevent spoofing.
      </p>
      <p>
        The signature is included in the <code>LaunchBase-Signature</code> HTTP header.
      </p>
      <CodeBlock code={signatureExample} lang="javascript" />
       <Callout variant="warning">
        Always use a constant-time comparison function to compare signatures to mitigate timing attacks.
      </Callout>
      
       <h2 id="retries">Retries</h2>
      <p>
        If your endpoint does not respond with a <code>2xx</code> status code, we will automatically retry the webhook delivery with an exponential backoff for up to 72 hours.
      </p>
    </>
  );
}
