import type {Metadata} from 'next';
import { Roboto } from 'next/font/google'; // Use Roboto as per proposal
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

// Initialize Roboto font with desired subsets and variable name
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Include necessary weights
  variable: '--font-roboto', // Define CSS variable
});

export const metadata: Metadata = {
  title: 'ResumeAI - ATS Optimized Resume Generator',
  description: 'Generate an ATS-optimized resume from a job description using AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          roboto.variable // Apply the Roboto font variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
