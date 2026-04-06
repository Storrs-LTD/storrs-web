---
trigger: always_on
glob: "**/*.ts"
description: Rule requiring agents to always log errors to Sentry.
---

# Sentry Error Logging Rule

- **Always Log Errors to Sentry**: Whenever you catch or handle an error in the storrs-web project, you MUST log the error to Sentry.
- **How to Log**:
  1. Ensure you import Sentry: `import * as Sentry from '@sentry/nextjs';`
  2. Use `Sentry.captureException(error);` for caught errors.
  3. Use `Sentry.captureMessage('Your custom message');` for specific error messages or warnings that must be tracked.
- **Context Handling**: Where appropriate, set tags or extra context using `Sentry.setContext`, `Sentry.setTag`, or by passing them as a second argument to `Sentry.captureException` to ensure debugging context is retained.
- **Why**: This ensures that all unhandled and handled critical errors are reliably tracked, alerting the team to potential issues in production and keeping the application robust.

