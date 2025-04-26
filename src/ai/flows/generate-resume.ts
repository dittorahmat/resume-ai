// 'use server'
'use server';
/**
 * @fileOverview Generates an ATS-optimized resume from a job description.
 *
 * - generateResume - A function that handles the resume generation process.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GenerateResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateResumeInputSchema = z.object({
  jobDescription: z.string().describe('The job description to generate a resume for.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

const GenerateResumeOutputSchema = z.object({
  resume: z.string().describe('The generated resume in a downloadable format.'),
});
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {
    schema: z.object({
      jobDescription: z.string().describe('The job description to generate a resume for.'),
    }),
  },
  output: {
    schema: z.object({
      resume: z.string().describe('The generated resume.'),
    }),
  },
  prompt: `You are an expert resume writer specializing in creating ATS-optimized resumes. Create a resume based on the following job description, incorporating important keywords:

Job Description: {{{jobDescription}}}

Resume:
`,
});

const generateResumeFlow = ai.defineFlow<
  typeof GenerateResumeInputSchema,
  typeof GenerateResumeOutputSchema
>(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
