'use server';

/**
 * @fileOverview A professional template generator AI agent.
 *
 * - generateTemplateFromPrompt - A function that generates a professional template from a text prompt.
 * - GenerateTemplateFromPromptInput - The input type for the generateTemplateFromPrompt function.
 * - GenerateTemplateFromPromptOutput - The return type for the generateTemplateFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTemplateFromPromptInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired template.'),
});
export type GenerateTemplateFromPromptInput = z.infer<typeof GenerateTemplateFromPromptInputSchema>;

const GenerateTemplateFromPromptOutputSchema = z.object({
  template: z.string().describe('The generated professional template.'),
});
export type GenerateTemplateFromPromptOutput = z.infer<typeof GenerateTemplateFromPromptOutputSchema>;

export async function generateTemplateFromPrompt(
  input: GenerateTemplateFromPromptInput
): Promise<GenerateTemplateFromPromptOutput> {
  return generateTemplateFromPromptFlow(input);
}

const generateTemplateFromPromptPrompt = ai.definePrompt({
  name: 'generateTemplateFromPromptPrompt',
  input: {schema: GenerateTemplateFromPromptInputSchema},
  output: {schema: GenerateTemplateFromPromptOutputSchema},
  prompt: `You are a professional template generator. Generate a template based on the following prompt: {{{prompt}}}.`,
});

const generateTemplateFromPromptFlow = ai.defineFlow(
  {
    name: 'generateTemplateFromPromptFlow',
    inputSchema: GenerateTemplateFromPromptInputSchema,
    outputSchema: GenerateTemplateFromPromptOutputSchema,
  },
  async input => {
    const {output} = await generateTemplateFromPromptPrompt(input);
    return output!;
  }
);
