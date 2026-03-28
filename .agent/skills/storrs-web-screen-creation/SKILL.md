---
name: Storrs Web Screen Creation
description: Guidelines for creating new screens and pages in the storrs-web Next.js project.
---

# Storrs Web Screen Creation

This skill provides a standardized approach for creating new pages in the `storrs-web` project, ensuring consistency in routing, layout, styling, and premium aesthetics.

## Core Principles

### 1. Routing and Layout

- **Path**: New pages should typically be placed in `src/app/(main)/[route-name]/page.tsx`.
- **Layout Inheritance**: Grouping pages under the `(main)` route group ensures they automatically inherit the global `Navbar` and `Footer` from `src/app/(main)/layout.tsx`.
- **Redundancy**: DO NOT manually include `<Navbar />` or `<Footer />` inside the page component if it's within the `(main)` group.

### 2. File Structure

```tsx
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | Storrs",
  description: "Brief description for SEO.",
};

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-24">{/* Content goes here */}</main>
    </div>
  );
}
```

### 3. Styling and Aesthetics

- **Premium Look**: Use project-specific utility classes defined in `globals.css`:
  - `text-gradient`: For emphasized headers.
  - `glass-card`: For semi-transparent, modern card backgrounds.
  - `glow-green`: For subtle green box-shadow effects on cards. **Note**: Avoid shadows on pages outside the `(main)` layout (e.g., standalone onboarding flows). Use clean, flat card styles (`bg-card border border-border rounded-xl`) instead.
- **Typography**: The project uses **Poppins** as the primary font (configured in the root layout).
- **Animations**: Use utility classes like `animate-fade-in` and `animate-fade-in-up`.

### 4. Component Usage

- **UI Components**: Use shadcn/ui components located in `@/components/ui/`.
- **Icons**: Use `lucide-react` for consistent iconography.

## Rules

1. **Accessibility**: Ensure all interactive elements are keyboard-accessible and have proper ARIA labels where necessary.
2. **Responsive Design**: Always use Tailwind's responsive prefixes (e.g., `md:text-5xl`, `lg:grid-cols-3`) to ensure mobile-first compatibility.
3. **Clean Code**: Avoid hardcoding colors or spacing that deviate from the Tailwind config or `globals.css` tokens.
4. **Build Verification**: Always run `npm run build` after creating a new page to verify route generation and TypeScript types.

## Examples

### Hero Section with Gradient

```tsx
<section className="max-w-4xl mx-auto px-6 mb-16 text-center">
  <Badge variant="secondary" className="mb-4 animate-fade-in">
    New Feature
  </Badge>
  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 animate-fade-in-up">
    Welcome to the <span className="text-gradient">Next Level</span>
  </h1>
</section>
```

### Glass Card Structure

```tsx
<Card className="glass-card glow-green animate-fade-in-up">
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Detailed description here.</p>
  </CardContent>
</Card>
```

## Supabase Client & Edge Function Invocation

The project uses a Supabase browser client at `src/lib/supabase/client.ts` built with `createBrowserClient` from `@supabase/ssr`.

### Invocation Rules

1. **Always use `supabase.functions.invoke()`** to call Supabase Edge Functions. Do NOT use raw `fetch` with manual `apikey` / `Authorization` headers — the client handles auth automatically.
2. **Import pattern**:

   ```tsx
   import { createClient } from "@/lib/supabase/client";
   const supabase = createClient();
   ```

3. **Simple JSON calls**:

   ```tsx
   const { data, error } = await supabase.functions.invoke("my-function", {
     body: { key: "value" },
   });
   ```

4. **SSE / Streaming responses**: When an edge function returns `Content-Type: text/event-stream`, the `data` from `invoke` is a `Response` object. Read the stream via `data.body.getReader()`:

   ```tsx
   const { data: streamResponse, error } = await supabase.functions.invoke("my-stream-fn", {
     body: { key: "value" },
   });
   if (streamResponse instanceof Response && streamResponse.body) {
     const reader = streamResponse.body.getReader();
     // process SSE chunks...
   }
   ```

## Third-Party SDK Callback Constraints

### Facebook SDK (`FB.login`)

The Facebook JS SDK validates that the callback passed to `FB.login()` is a plain `function`, **not** an `asyncfunction`. Passing an `async` callback causes:

> **Error: Expression is of type asyncfunction, not function**

**Fix**: Wrap async logic inside a synchronous callback using an IIFE:

```tsx
const callback = (response: any) => {
  (async () => {
    // async logic here...
  })().catch((error) => {
    Sentry.captureException(error);
  });
};
window.FB.login(callback, { config_id: "..." });
```

## Multi-Step Progress Tracking

When a page orchestrates a multi-step backend flow (e.g., SSE-streamed integration), track progress in local React state rather than forwarding events elsewhere (e.g., `postMessage`).

### State Pattern

```tsx
const [currentStep, setCurrentStep] = useState<MyStepEnum | null>(null);
const [failedStep, setFailedStep] = useState<MyStepEnum | null>(null);
```

- `currentStep === null` → show the initial screen (e.g., signup form / CTA button).
- `currentStep !== null` → replace the screen with a progress card.
- `failedStep !== null` → mark the failed step and show an error action.

### SSE-to-State Mapping

When parsing SSE events from an edge function, map each progress key to state:

```tsx
for (const key of Object.keys(sseData)) {
  if (progressKeys.includes(key as MyStepEnum)) {
    const step = key as MyStepEnum;
    if (sseData[key] === true) {
      setCurrentStep(step);
    } else if (sseData[key] === false) {
      setFailedStep(step);
    }
  }
}
```

### Progress Card UI

Display steps in a card with four visual states:

| State | Visual |
| --- | --- |
| Completed | Green checkmark icon |
| Active | Spinner animation + highlighted background |
| Pending | Empty circle, muted text |
| Failed | X icon, `text-destructive` |

Use existing design tokens: `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-destructive`, `bg-secondary/50` for active row highlight.

### Error Recovery

When a step fails, display a **"Try Again"** button that resets all state to `null`, returning the user to the initial screen:

```tsx
const handleTryAgain = () => {
  setCurrentStep(null);
  setFailedStep(null);
};
```

## Verification Guidelines

Every new page must undergo a multi-layered verification process to ensure reliability and visual perfection.

### 1. Build and Type Checking

The first step is always to ensure the project still builds and there are no TypeScript errors.

- **Action**: Run `npm run build` in the terminal.
- **Verification**: The process should exit with code 0 and no errors in the console.

### 2. Next.js Developer Tools (MCP)

Use the `next-devtools` MCP server to inspect the running application.

- **Discovery**: Call `nextjs_index` to find the active dev server.
- **Diagnostics**: Call `nextjs_call` with `toolName: "get_errors"` to check for compilation or runtime errors.
- **Routing**: Call `nextjs_call` with `toolName: "get_routes"` to confirm the new page is correctly registered and served.

### 3. Browser Verification (Playwright)

Use the `browser_eval` tool (or `browser_subagent`) for visual and functional testing.

- **Visual Check**: Take screenshots at multiple breakpoints (Mobile, Desktop) to verify responsiveness and the "premium" aesthetic.
- **Console Logs**: Use the `console_messages` action to check for client-side hydration errors or failed asset loads.
- **DOM Inspection**: Use `evaluate` to check if key elements (Navbar, Footer, specific page sections) are present and correctly rendered.

### 4. Link Verification

All outbound and internal links MUST be verified.

- **Automated Check**: Use the `browser_subagent` to visit each external link and confirm it doesn't 404.
- **Context Check**: Ensure the destination page content matches the descriptive text in the link.

### 5. Manual Fallback (curl)

If browser tools are unavailable, use `curl` for a quick DOM check.

- **Command**: `curl -s http://localhost:3000/[route-name]`
- **Check**: Pipe to `grep` to verify the presence of critical strings (e.g., `<nav`, `<footer`, `text-gradient`).

<!-- Updated: 2026-03-26 — Added Supabase client usage, edge function invocation patterns (JSON + SSE streaming), and Facebook SDK async callback constraint. -->
<!-- Updated: 2026-03-28 — Added multi-step progress tracking (SSE-to-state mapping, progress card UI, error recovery pattern), and shadow avoidance note for non-(main) pages. -->
