---
title: Automate Project Workflow with AGENTS.md
sidebar_position: 7
---

# Automate Project Workflow with AGENTS.md

This page explains how to use `AGENTS.md` as a project-local rules injector so OpenCode behaves consistently without repeating the same instructions every session.

## Why use `AGENTS.md`

When a project has an `AGENTS.md` file, you can encode:

- planning expectations
- testing requirements
- changelog habits
- git discipline
- project-specific rules of engagement

This is one of the most useful upgrades you can make after basic installation.

## Where to create it

Create `AGENTS.md` in the root of the project you are actively working on.

Do **not** place it in the OpenCode config directory unless that is the actual project root you want to control.

## Example template

```markdown
# Project Workflow Rules

## 1. Master Plan
- Create and maintain a task list.
- Keep it updated as work progresses.

## 2. Verification
- Run tests before finishing work.
- Run lint, typecheck, or build when applicable.

## 3. Change Tracking
- Update the changelog when behavior changes.

## 4. Git Discipline
- Make clear, logical commits.
```

## Extended template

If you want a more opinionated workflow, use this stronger version:

```markdown
# Project Workflow Rules

## 1. Master Plan (todos.md)
- If `todos.md` does not exist, create it.
- Use `[ ]` for pending and `[x]` for completed tasks.
- Mark tasks complete immediately after finishing them.

## 2. Change Tracking (CHANGELOG.md)
- If `CHANGELOG.md` does not exist, create it.
- Use Keep a Changelog format.
- Record meaningful changes under `Unreleased`.

## 3. Version Control
- Commit after each logical unit of work.
- Use clear commit messages.

## 4. Execution Protocol
- Before coding: check the plan.
- After coding: verify, update docs, and close the task properly.
```

## Best practice

Keep `AGENTS.md` strict enough to help, but not so strict that it fights your actual team workflow.

## Related pages

- [Quick Start for the full stack](/docs/opencode/quick-start)
- [Create custom local skills](/docs/opencode/skills-integration)
- [Reference: Superpowers skills catalog](/docs/opencode/skills-catalog)
