---
title: Create Custom Local Skills
sidebar_position: 8
---

# Create Custom Local Skills

This page shows how to turn project documentation into local, reusable OpenCode skills.

## Why local skills are useful

If your project has:

- business rules
- architecture constraints
- validation policies
- folder conventions
- team coding standards

you can package those into `.opencode/skills/.../SKILL.md` files so the agent stops guessing and starts following your project rules.

## Folder structure

```text
.opencode/
└── skills/
    ├── business-logic-expert/
    │   └── SKILL.md
    └── code-standards/
        └── SKILL.md
```

## Strategy

Do not just dump raw documents into a skill. A better pattern is:

1. Convert narrative docs into explicit rules
2. Keep each skill focused on one domain
3. Make each `SKILL.md` self-contained
4. Store local skills in the project where they apply

## Example: business logic skill

```markdown
# Business Logic Expert

## Metadata
- **Name:** business-logic-expert
- **Description:** Expert in project-specific business rules

## Instructions for AI
1. Always validate against business rules before implementing features.
2. Never skip validation for quick fixes.
3. Ask for clarification if a new request conflicts with existing rules.
```

## Example: code standards skill

```markdown
# Code Standards Expert

## Tech Stack
- TypeScript strict mode
- Tailwind CSS
- Server Components by default

## Required Patterns
1. Always validate input before DB operations.
2. Always handle loading and error states.
3. Avoid prohibited patterns like `any` or ad-hoc logging in production.
```

## Security note

If your local skills contain sensitive business logic, exclude them from public repositories.

Example `.gitignore` addition:

```text
# OpenCode local skills
.opencode/
```

## Best practice

Start with a minimal skill, then grow it as repeated agent mistakes reveal what rules are missing.

## Related pages

- [Automate project workflow with AGENTS.md](/docs/opencode/project-rules)
- [Reference: Superpowers skills catalog](/docs/opencode/skills-catalog)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
