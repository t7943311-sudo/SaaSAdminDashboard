import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function AiAndGenkitPage() {
  return (
    <>
      <h1 id="ai-and-genkit">AI & Genkit Integration</h1>
      <p className="lead">
        LaunchBase comes with a pre-built AI feature to demonstrate how to integrate generative AI into your SaaS application using Google's Genkit.
      </p>

      <h2 id="the-template-generator">The Template Generator Feature</h2>
      <p>
        The starter kit includes an "AI Template Generator" page located at <code>/dashboard/templates</code>. This feature allows users to enter a text prompt describing a desired template (e.g., "a professional invoice"), and the AI generates the content.
      </p>
      <p>This serves as a practical example of integrating a backend AI flow with a frontend React component.</p>
      
      <h2 id="what-is-genkit">What is Genkit?</h2>
      <p>
        Genkit is an open-source framework from Google designed to simplify the development of AI-powered features. It provides tools for building, testing, and monitoring AI flows that can call various language models.
      </p>
      
      <h2 id="how-it-works">How It Works in LaunchBase</h2>
      <p>
        The AI integration is structured into two main parts: the backend flow and the frontend component.
      </p>

      <h3>1. The Genkit Flow (Backend)</h3>
      <p>
        The core AI logic is defined in <code>src/ai/flows/generate-template-from-prompt.ts</code>. This file uses Genkit to define a "flow" that takes a prompt and returns a generated template.
      </p>
      <CodeBlock code={`
'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define input and output schemas with Zod
const GenerateTemplateFromPromptInputSchema = z.object({ ... });
const GenerateTemplateFromPromptOutputSchema = z.object({ ... });

// 2. Define the prompt for the AI model
const generateTemplateFromPromptPrompt = ai.definePrompt({
  name: 'generateTemplateFromPromptPrompt',
  input: {schema: GenerateTemplateFromPromptInputSchema},
  output: {schema: GenerateTemplateFromPromptOutputSchema},
  prompt: \`You are a professional template generator... {{{prompt}}}.\`,
});

// 3. Define the flow that orchestrates the call
const generateTemplateFromPromptFlow = ai.defineFlow({ ... },
  async input => {
    const {output} = await generateTemplateFromPromptPrompt(input);
    return output!;
  }
);
      `} lang="typescript" />
      <p>
        This flow is a server-side function that securely calls the AI model. The <code>'use server';</code> directive at the top allows it to be called from client components via Next.js Server Actions.
      </p>

      <h3>2. The React Component (Frontend)</h3>
      <p>
        The UI for this feature is in <code>src/app/dashboard/templates/page.tsx</code>. It uses a standard React form that calls the server action.
      </p>
      <CodeBlock code={`
// src/app/dashboard/templates/actions.ts
export async function generateTemplate( ... ): Promise<State> {
  // ...
  const result = await generateTemplateFromPromptFlow({ prompt: validatedFields.data.prompt });
  // ...
}
      `} lang="typescript" />
      <p>
        The frontend page uses the <code>useActionState</code> hook to manage form submission, loading states, and display the result from the AI. When the generation is successful, the result is also saved to the user's private <code>templates</code> subcollection in Firestore.
      </p>
      
      <h2 id="customizing-the-ai">Customizing and Extending</h2>
      <p>
        You can use this existing structure as a blueprint for adding new AI features.
      </p>
      <ol>
        <li>Create a new flow file in <code>src/ai/flows/</code> for your new feature.</li>
        <li>Define your input/output schemas and the prompt.</li>
        <li>Create a new Server Action to call your flow.</li>
        <li>Build a new React component to interact with the Server Action.</li>
      </ol>
      <Callout variant="info">
        Genkit supports more advanced features like using tools (function calling), streaming responses, and different models. Refer to the official Genkit documentation to explore these capabilities.
      </Callout>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/theme-builder" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: Theme Builder
        </Link>
      </div>
    </>
  );
}
