# ResumeAI

ResumeAI is a Next.js application that generates an ATS-optimized resume based on a provided job description using AI.

## Core Features

-   **Job Description Input**: Allows users to paste a job description.
-   **AI Resume Generation**: Utilizes a Genkit flow with a Large Language Model (LLM) to analyze the job description and generate a relevant, ATS-optimized resume, incorporating keywords.
-   **Resume Output**: Displays the generated resume.
-   **Downloadable Format**: Allows users to download the generated resume as a text file.

## Tech Stack

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: ShadCN UI
-   **AI Integration**: Google AI via Genkit

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd resume-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google Generative AI API key:
    ```env
    GOOGLE_GENAI_API_KEY=YOUR_API_KEY_HERE
    ```
    *Note: The `.env` file is included in `.gitignore` and should not be committed to version control.*

4.  **Run the development server:**
    You'll need two terminals for development: one for the Next.js app and one for the Genkit development server.

    *Terminal 1 (Next.js App):*
    ```bash
    npm run dev
    ```
    This starts the Next.js application, typically on `http://localhost:9002`.

    *Terminal 2 (Genkit Dev Server):*
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit development UI, allowing you to inspect flows, typically on `http://localhost:4000`. While not strictly necessary to *run* the app, it's very useful for debugging the AI flow.

5.  **Open the application:**
    Navigate to `http://localhost:9002` (or the port specified in your terminal) in your web browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

-   `src/app/`: Contains the Next.js pages and layout components (App Router).
-   `src/components/`: Contains reusable React components, including ShadCN UI components.
-   `src/ai/`: Contains Genkit-related code, including flows and the AI instance setup.
    -   `src/ai/flows/`: Defines the Genkit flows (e.g., `generate-resume.ts`).
-   `src/lib/`: Utility functions.
-   `src/hooks/`: Custom React hooks.
-   `public/`: Static assets.
-   `styles/`: Global CSS files.
