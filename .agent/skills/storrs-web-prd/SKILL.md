---
name: storrs-web PRD Skill
description: >
  Grounded knowledge and generation instructions for writing or updating the PRD
  for the `storrs-web` Next.js web application project.
---

# Project Summary

`storrs-web` is the Next.js (App Router) web application serving as the **Onboarding & Compliance Layer** of the Storrs platform. Its primary responsibility is handling the complex, browser-dependent Meta/Facebook embedded signup flow that links a merchant's WhatsApp Business Account (WABA) to Storrs. It also hosts public legal pages (Privacy Policy, Terms of Service) and a marketing landing page. It shares the Supabase backend with the mobile app.

---

## Existing PRD Coverage

**File**: `storrs_web_prd.md` (root of project, 27 lines)

| Section | Present | Depth |
|---|---|---|
| Overview | ✅ | Brief (1 sentence) |
| Target Audience | ✅ | 2 types |
| Problem Statement | ✅ | Brief |
| Key Features | ✅ | 4 bullet points, high-level |
| Technical Stack | ✅ | 4 items listed |
| Big Picture Integration | ✅ | 1 paragraph |
| Route catalogue | ❌ | Not present |
| Onboarding flow (step-by-step) | ❌ | Not present |
| SSE stream parsing from edge function | ❌ | Not present |
| URL parameter contract | ❌ | Not present |
| Facebook SDK integration details | ❌ | Not present |
| Progress card UI states | ❌ | Not present |
| Error handling & retry | ❌ | Not present |
| Legal pages content/structure | ❌ | Not present |
| Marketing landing page | ❌ | Not present |
| Sentry integration | ❌ | Not present |
| Auth model | ❌ | Not present |
| Deep link TODO | ❌ | Not present |

**Last known state**: Sparse — high-level vision only, no page or flow detail.

---

## Identified Gaps

1. **Route catalogue** — Active routes: `/` (marketing home), `/onboarding` (Meta integration), `/onboarding-prerequisites`, `/privacy-policy`, `/terms-of-service`. Not documented.
2. **Onboarding flow** — The `/onboarding` page is the most complex page (~538 lines). Its state machine (`MetaBusinessIntegrationStep` enum with 7 steps), Facebook SDK initialization, `postMessage` listener, `FB.login()` callback, SSE stream parsing, and `ProgressCard` UI are entirely absent from the PRD.
3. **URL parameter contract** — The `/onboarding` page requires `?storrs_business_id=<uuid>&pin=<6-digit>` query params passed from the mobile app. This interface is undocumented.
4. **Facebook SDK dependency** — The page loads `https://connect.facebook.net/en_US/sdk.js`, initializes with `NEXT_PUBLIC_FB_APP_ID` and `NEXT_PUBLIC_FB_GRAPH_VERSION`, and uses `config_id: NEXT_PUBLIC_FB_CONFIG_ID`. These are undocumented env vars.
5. **Progress card states** — 6 ordered display steps (validating → creating → connecting → WABA setup → phone registration → finalizing) with pending/active/complete/failed visual states. Not documented.
6. **SSE stream consumption** — The page consumes SSE from `integrate-meta-business` edge function and maps keys to enum steps. This client-side streaming protocol is undocumented.
7. **Deep link redirect** — A `TODO` exists in code to redirect to the Storrs mobile app via deep link after `completed` state. The intended URL scheme is not yet decided.
8. **Marketing landing page components** — `src/components/` contains `HeroSection`, `ChatDemo`, `HowItWorks`, `ServicesSection`, `Navbar`, `Footer`. These are real pages not mentioned in the PRD.
9. **Sentry error monitoring** — Both client and server Sentry configs exist (`sentry.edge.config.ts`, `sentry.server.config.ts`, `instrumentation-client.ts`). Monitoring strategy is undocumented.
10. **Auth model** — Supabase SSR is used (`@supabase/ssr`). How auth sessions are managed (cookies, middleware, server vs. client clients) is not documented.

---

## Key Entities & Concepts

| Term | Description |
|---|---|
| `MetaBusinessIntegrationStep` | Enum (7 values) tracking progress of the onboarding flow on the web page |
| `DISPLAY_STEPS` | Ordered list of 6 steps shown in the progress card (excludes `completed`) |
| `ProgressCard` | React component rendering step-by-step integration status with icons and animations |
| `launchWhatsAppSignup` | Triggers `FB.login()` with embedded signup config |
| `fbLoginCallback` | Async callback (wrapped in IIFE) that receives OAuth code and invokes edge function |
| `handleMessage` | Window `message` event listener for Facebook's `WA_EMBEDDED_SIGNUP` postMessage events |
| `storrs_business_id` | UUID identifying the merchant; passed via URL query param from the Flutter app |
| `pin` | 6-digit WhatsApp phone number verification PIN; passed via URL query param |
| `insert-meta-business-integration` | Edge function called after the embedded signup `FINISH` event |
| `integrate-meta-business` | Edge function called with OAuth code; returns SSE progress stream |
| `onboarding-prerequisites` | Separate sub-route (purpose not yet visible in PRD) |
| shadcn/ui | Component library (Radix UI primitives + `class-variance-authority`) |
| `next-themes` | Dark/light mode theming |

---

## PRD Generation Instructions

When asked to write or update the PRD for `storrs-web`, follow these rules:

1. **Route-driven structure**: Organize the PRD with one section per route (`/`, `/onboarding`, `/onboarding-prerequisites`, `/privacy-policy`, `/terms-of-service`).
2. **Onboarding flow detail**: The `/onboarding` route must have a step-by-step flow description:
   - Mobile app opens the URL with `storrs_business_id` and `pin` query params
   - Facebook SDK is loaded and initialized
   - User clicks "Continue with Facebook" → `FB.login()` is called
   - `WA_EMBEDDED_SIGNUP` postMessage received → `insert-meta-business-integration` invoked
   - OAuth code received → `integrate-meta-business` invoked; SSE stream consumed
   - `ProgressCard` updates in real-time based on SSE events
   - On `completed` → deep link redirect to mobile app (TODO as of March 2026)
3. **URL parameter contract**: Document `?storrs_business_id=<uuid>&pin=<6-digit>` as a formal interface between the mobile app and the web app.
4. **Environment variables**: Document `NEXT_PUBLIC_FB_APP_ID`, `NEXT_PUBLIC_FB_GRAPH_VERSION`, `NEXT_PUBLIC_FB_CONFIG_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. **Error states**: Each step can fail. Document the `failedStep` state, the error UI ("Integration Failed" heading + "Try Again" button), and the recovery path (`handleTryAgain` resets both `currentStep` and `failedStep`).
6. **Marketing section**: Document the landing page components. Do not expand beyond what the files show — note which components exist without detailing future copy.
7. **Deep link TODO**: Flag explicitly that the post-completion redirect to the Flutter app is a known pending feature as of the current codebase state.
8. **Sentry**: Note that `Sentry.captureException` and `Sentry.captureMessage` are used at all error boundaries in the onboarding flow.
9. **Do not invent** routes, components, or features not evidenced in the source files.
10. **Tone**: Mix of product (for audience/feature sections) and technical (for flow and contract sections).

---

## Source Files Referenced

- `storrs_web_prd.md`
- `src/app/onboarding/page.tsx`
- `src/app/onboarding/onboarding.module.css`
- `src/app/layout.tsx`
- `src/app/(main)/page.tsx`
- `src/app/(main)/layout.tsx`
- `src/app/(main)/privacy-policy/` (directory listing)
- `src/app/(main)/terms-of-service/` (directory listing)
- `src/app/(main)/onboarding-prerequisites/` (directory listing)
- `src/components/hero-section.tsx`
- `src/components/chat-demo.tsx`
- `src/components/footer.tsx`
- `src/components/navbar.tsx`
- `src/components/how-it-works.tsx`
- `src/components/services-section.tsx`
- `src/instrumentation-client.ts`
- `src/instrumentation.ts`
- `package.json`
- `next.config.ts`
- `sentry.edge.config.ts`
- `sentry.server.config.ts`
- `tailwind.config.ts`
- `components.json`
