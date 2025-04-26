"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { generateResume, type GenerateResumeInput } from "@/ai/flows/generate-resume"; // Assuming the Genkit flow is exported correctly

const formSchema = z.object({
  jobDescription: z.string().min(50, {
    message: "Job description must be at least 50 characters.",
  }),
});

export function ResumeGenerator() {
  const [generatedResume, setGeneratedResume] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedResume(null); // Clear previous result

    try {
      const input: GenerateResumeInput = { jobDescription: values.jobDescription };
      const result = await generateResume(input);

      if (result?.resume) {
        setGeneratedResume(result.resume);
        toast({
          title: "Success!",
          description: "Your ATS-optimized resume has been generated.",
        });
      } else {
        throw new Error("Failed to generate resume. The response was empty.");
      }
    } catch (error) {
      console.error("Resume generation error:", error);
      toast({
        variant: "destructive",
        title: "Error Generating Resume",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const downloadResume = () => {
    if (!generatedResume) return;
    const blob = new Blob([generatedResume], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated_resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
     toast({
        title: "Download Started",
        description: "Your resume is being downloaded.",
      });
  };

  return (
    <Card className="w-full shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>Job Description Input</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="jobDescription" className="sr-only">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the full job description here..."
                      className="min-h-[200px] resize-y text-base"
                      {...field}
                      aria-invalid={form.formState.errors.jobDescription ? "true" : "false"}
                      aria-describedby="jobDescription-error"
                    />
                  </FormControl>
                  <FormMessage id="jobDescription-error" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Resume...
                </>
              ) : (
                "Generate Resume"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      {generatedResume && (
        <CardFooter className="flex flex-col items-start gap-4 pt-6 border-t animate-slide-in-up">
          <div className="flex justify-between items-center w-full">
             <h3 className="text-xl font-semibold">Generated Resume</h3>
             <Button onClick={downloadResume} variant="outline" size="sm">
               <Download className="mr-2 h-4 w-4" />
               Download
             </Button>
          </div>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-secondary">
             <pre className="whitespace-pre-wrap text-sm">{generatedResume}</pre>
          </ScrollArea>
        </CardFooter>
      )}
    </Card>
  );
}
