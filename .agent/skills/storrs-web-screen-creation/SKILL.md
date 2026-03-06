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
  - `glow-green`: For subtle green box-shadow effects on cards.
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

