"use server";

import { generateTemplateFromPrompt as generateTemplateFromPromptFlow } from "@/ai/flows/generate-template-from-prompt";
import { z } from "zod";

const schema = z.object({
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters long." }),
});

type State = {
  success: boolean;
  message: string;
  template?: string;
  prompt?: string;
};

export async function generateTemplate(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    prompt: formData.get("prompt"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid prompt. Please ensure it's at least 10 characters.",
    };
  }

  try {
    const result = await generateTemplateFromPromptFlow({ prompt: validatedFields.data.prompt });
    if (result.template) {
      return {
        success: true,
        message: "Template generated successfully.",
        template: result.template,
        prompt: validatedFields.data.prompt,
      };
    } else {
      return { success: false, message: "Failed to generate template." };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
