---
name: Skill Creation
description: Comprehensive guidelines for creating, updating, and structuring completely new agent skills within the workspace or globally.
---

# Skill Creation

This skill defines the definitive guidelines for identifying, structuring, and preserving reusable capabilities as **Skills** for the Antigravity agent. Follow these instructions when you are asked to create a new skill or when you proactively identify a reusable pattern that would make a useful skill.

## 1. What is a Skill?

A **Skill** is an open standard for extending agent capabilities. It is essentially a reusable package of knowledge, instructions, and best practices that the agent can discover and activate when relevant to a user's request.

## 2. When to Create a Skill

You should proactively calculate if a pattern or set of instructions you are following or observing is worthy of being a reusable Skill.
If it is:

1. **Prompt** the user to create a new Skill.
2. **Explain clearly** why (e.g., "This pattern appears frequently and would ensure consistency if formalized").
3. **Wait** for user permission before creating it.

## 3. Creating a Skill

Once permission is granted, follow these steps to materialize the skill.

### Step 1: Determine the Location and Directory Name

Convert the skill name to `kebab-case` (e.g., "Code Review" -> `code-review`).
Skills can be stored in two locations depending on their scope:

- **Workspace-specific**: `.agent/skills/<skill-folder>/` (Use this by default for project-specific rules).
- **Global**: `~/.gemini/antigravity/skills/<skill-folder>/` (Use this for general skills that apply across different projects).

### Step 2: Create `SKILL.md` (Required)

Every skill folder MUST contain a `SKILL.md` file. This acts as the entry point and main instruction file for the skill.

**Requirement**: The file MUST begin with a YAML frontmatter block containing the `name` and `description` of the skill.
_Note: The description should use third-person verbs (e.g., "Reviews code..." instead of "I will review code...")._

**Template**:

```markdown
---
name: <Skill Name>
description: <Third-person short description of what the skill does>
---

# <Skill Name>

<Detailed description and instructions for magnetic alignment.>

## Use Cases

- When to apply this skill.
- What triggers this skill.

## Rules / Instructions

1. <Rule 1: Use actionable, imperative language>
2. <Rule 2: Use checklists for multi-step processes>

## Examples

<Code examples and implementation demonstrations>
```

### Step 3: Populate Additional Resources (Optional)

More complex skills may require additional directories and files to support the instructions. Below is the standard structure when adding supplementary material:

```text
.agent/skills/my-skill/
├── SKILL.md             # Core instructions and metadata (Required)
├── scripts/             # Helper scripts and utilities (Optional)
├── examples/            # Reference implementations (Optional)
└── resources/           # Templates and other assets (Optional)
```

- **scripts/** - Scripts (e.g., bash, python, dart) that extend the agent's capabilities to execute the skill or automate parts of it.
- **examples/** - Complete file references, reference implementations, and structural boilerplates for the agent to look at.
- **resources/** - Additional static files, templates, .pen design files, JSON data, or configuration the skill may reference.

_If you do use supplemental folders, make sure you reference them via absolute paths relative to the skill directory or workspace._

## 4. Best Practices for Writing Skills

- **Third-Person Descriptions**: Write the skill description and use cases in the third person (e.g., "Reviews code..." instead of "I will review code...").
- **Actionable Instructions**: Use clear, imperative language for steps (e.g., "Create a file...", "Check criteria...").
- **Use Checklists**: Checklists are highly effective for ensuring the agent follows multi-step processes consistently without skipping steps.

## 5. Summary Check-list

- [ ] Has the user approved the skill?
- [ ] Is it placed in the correct location (Workspace or Global)?
- [ ] Is the folder name `kebab-case`?
- [ ] Does it have a `SKILL.md`?
- [ ] Does `SKILL.md` contain strict YAML frontmatter (`name`, `description`)?
- [ ] Is the description written in the third person?
- [ ] Are the instructions actionable checklists?

