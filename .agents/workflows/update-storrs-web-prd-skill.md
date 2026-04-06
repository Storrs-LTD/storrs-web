---
description: How to re-run and refresh the PRD skill for the storrs-web project as the codebase evolves
---

# Update PRD Skill — `storrs-web`

Run this workflow when the `storrs-web` codebase changes in a way that could make the PRD skill stale. Common triggers: a new route is added, the `MetaBusinessIntegrationStep` enum or `DISPLAY_STEPS` array changes, the URL parameter contract changes, the deep-link TODO is implemented, a new marketing component is added, or `storrs_web_prd.md` is updated directly.

## Steps

1. **Read the current skill.** Open `.agent/skills/storrs-web-prd/SKILL.md` and keep it in context. Note the last-known state of every section: **Existing PRD Coverage**, **Identified Gaps**, **Key Entities & Concepts**, **PRD Generation Instructions**, and **Source Files Referenced**.

2. **Re-scan the codebase for drift.** Read (or re-read) the following files and compare them against what the skill currently documents:

   - `storrs_web_prd.md` — Has the top-level PRD been updated?
   - `src/app/` (directory listing) — Are there new route directories?
   - `src/app/onboarding/page.tsx` — Check for:
     - New or removed values in the `MetaBusinessIntegrationStep` enum
     - Changes to the `DISPLAY_STEPS` array (step keys or labels)
     - New `searchParams.get(...)` calls (URL parameter contract)
     - New `process.env.NEXT_PUBLIC_FB_*` references
     - Whether the `// TODO` deep-link redirect has been implemented
   - `src/app/(main)/` (directory listing) — Are there new sub-routes?
   - `src/components/` (directory listing) — Are there new or removed marketing components?
   - `src/lib/` — Has the Supabase client or auth helper pattern changed?
   - `package.json` — Have significant new dependencies been added?
   - `next.config.ts` — Have redirects, rewrites, or exposed env vars changed?
   - `sentry.edge.config.ts`, `sentry.server.config.ts` — Has the Sentry config changed?

3. **Identify what has changed.** Produce a short list of only the drifted areas. For each, name the section of the skill that needs updating. Do not update sections that have not drifted.

4. **Apply targeted updates to the skill.** For each drifted area, make the minimal surgical edit:

   - **New route added** → Add it to **Key Entities & Concepts** if it introduces new terms; add its source file(s) to **Source Files Referenced**; update **PRD Generation Instructions** step 1 (route-driven structure); remove from **Identified Gaps** if it was previously flagged as a future route.
   - **Onboarding flow change** (enum values, step labels, SSE key mapping) → Update the `MetaBusinessIntegrationStep` and `DISPLAY_STEPS` rows in **Key Entities & Concepts**; update **PRD Generation Instructions** step 2 with the new step sequence.
   - **Deep link implemented** → Remove "Deep link redirect TODO" from **Identified Gaps**; update **PRD Generation Instructions** step 7 with the real URL scheme; flip ❌ to ✅ in **Existing PRD Coverage** if `storrs_web_prd.md` now covers it.
   - **New env var** → Add to **Identified Gaps** if not yet in the PRD; add to **PRD Generation Instructions** step 4.
   - **New marketing component** → Add to **Key Entities & Concepts** if it introduces a new concept; add its file to **Source Files Referenced**.
   - **Gap resolved** (something now covered in `storrs_web_prd.md`) → Flip ❌ to ✅ in **Existing PRD Coverage**; remove from **Identified Gaps**.

   Use `multi_replace_file_content` for non-adjacent edits and `replace_file_content` for a single contiguous block. Never rewrite the whole file.

// turbo
5. **Verify.** Re-read the updated `SKILL.md` and confirm:
   - [ ] Every directory in `src/app/` (excluding `api/` and files) has a corresponding entry in **Key Entities & Concepts** or **PRD Generation Instructions**.
   - [ ] Every value in the `MetaBusinessIntegrationStep` enum is represented in the skill.
   - [ ] Every `searchParams.get(...)` param is listed under the URL parameter contract.
   - [ ] **Source Files Referenced** includes every file read during this update.
   - [ ] No routes, components, or features were invented — all entries are evidenced by source files.

6. **Report to the user.** List which sections were updated and what changed in each. If nothing drifted, state that explicitly.
