import { EndpointCard } from '@/components/docs/endpoint-card';
import { Callout } from '@/components/docs/callout';

const usersEndpoints = [
  {
    method: 'GET',
    path: '/api/v1/users/{userId}',
    title: 'Retrieve a User',
    description: 'Retrieves the details of an existing user. You need to supply the unique user ID.',
    requestBody: `// No request body for GET`,
    responseBody: `{
  "id": "usr_12345",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "member",
  "createdAt": "2024-01-01T12:00:00.000Z"
}`,
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    title: 'Create a User',
    description: 'Creates a new user. A welcome email will be sent to the user.',
    requestBody: `{
  "email": "new.user@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "member"
}`,
    responseBody: `{
  "id": "usr_67890",
  "email": "new.user@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "member",
  "createdAt": "2024-07-20T10:00:00.000Z"
}`,
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{userId}',
    title: 'Delete a User',
    description: 'Permanently deletes a user. This action cannot be undone.',
    requestBody: `// No request body for DELETE`,
    responseBody: `{
  "id": "usr_12345",
  "deleted": true
}`,
  },
];


export default function ApiReferencePage() {
  return (
    <>
      <h1 id="api-reference">API Reference</h1>
      <p>
        The LaunchBase API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
      </p>

      <Callout>
        All API requests must be authenticated with an API key. See the <a href="/docs/authentication">Authentication</a> section for details.
      </Callout>

      <h2 id="users-api">Users API</h2>
      <p>The Users API allows you to create, retrieve, and manage users in your application.</p>
      
      {usersEndpoints.map(endpoint => (
        <EndpointCard key={`${endpoint.method}-${endpoint.path}`} {...endpoint} />
      ))}
      
    </>
  );
}
