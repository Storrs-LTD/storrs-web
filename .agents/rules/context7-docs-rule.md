---
trigger: always_on
glob: "**/*"
description: Rule requiring agents to look up current documentation for libraries via Context7 MCP.
---

# Context7 Documentation Rule

- **Always Check Documentation**: You are always required to look up the current documentation of any library or framework you are about to use to ensure it is up-to-date, if it's available via the Context7 MCP (https://context7.com/docs).
- **How to Lookup**:
  1. ALWAYS use the `mcp_context7_resolve-library-id` tool first to find the exact Context7-compatible library ID.
  2. Once the ID is resolved, use the `mcp_context7_query-docs` tool to retrieve the relevant documentation and code examples for your specific query.
- **Why**: This prevents hallucinations, ensures you are using the most recent APIs, and avoids using deprecated methods or outdated package versions.

