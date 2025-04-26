import { ResumeGenerator } from "@/components/resume-generator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">ResumeAI</h1>
          <p className="text-lg text-muted-foreground">
            Paste a job description below to generate an ATS-optimized resume.
          </p>
        </header>
        <ResumeGenerator />
      </div>
    </main>
  );
}
