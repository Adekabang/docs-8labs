---
title: Reference - Superpowers Skills Catalog
sidebar_position: 12
---

# Reference - Superpowers Skills Catalog

This reference page is not a full replacement for official docs, but it gives you a practical map of the most useful Superpowers skills and when to use them.

## Planning skills

### Brainstorming

- **Skill:** `superpowers:brainstorming`
- **Use when:** requirements are vague, you need to shape a feature before implementation

### Writing Plans

- **Skill:** `superpowers:writing-plans`
- **Use when:** you need a detailed implementation plan before coding

### Test Driven Development

- **Skill:** `superpowers:test-driven-development`
- **Use when:** building a new feature or fixing a bug with a proper red-green-refactor loop

## Execution skills

### Subagent Driven Development

- **Skill:** `superpowers:subagent-driven-development`
- **Use when:** you already have a plan and want task-by-task execution with review loops

### Executing Plans

- **Skill:** `superpowers:executing-plans`
- **Use when:** you want a more manual or separated execution flow

### Finishing a Development Branch

- **Skill:** `superpowers:finishing-a-development-branch`
- **Use when:** implementation is done and you are verifying, reviewing, and preparing to merge

## Debugging and review skills

### Systematic Debugging

- **Skill:** `superpowers:systematic-debugging`
- **Use when:** there is a bug, failing test, or strange behavior and you need root-cause analysis first

### Dispatching Parallel Agents

- **Skill:** `superpowers:dispatching-parallel-agents`
- **Use when:** several unrelated failures can be investigated independently in parallel

### Requesting Code Review

- **Skill:** `superpowers:requesting-code-review`
- **Use when:** you want a structured review after a major implementation step

### Receiving Code Review

- **Skill:** `superpowers:receiving-code-review`
- **Use when:** you need to validate reviewer feedback instead of accepting it blindly

## How to use this catalog

Use this page as a quick reference, then check the upstream Superpowers documentation for deeper workflow details.

## Behavior guide

### Superpowers planning skills

- **Brainstorming** helps when your idea is still fuzzy
- **Writing Plans** helps when you know what you want, but need the execution broken down
- **TDD** helps when correctness matters and you want guardrails before implementation

### Superpowers execution skills

- **Subagent Driven Development** is best when a plan already exists and you want systematic execution
- **Executing Plans** is better when you want more manual control over the pace
- **Finishing a Development Branch** is useful when you are near the end and want a structured closeout

### Superpowers debugging and review skills

- **Systematic Debugging** should be the default for weird bugs and unclear failures
- **Dispatching Parallel Agents** is useful when several unrelated problems can be split apart
- **Requesting Code Review** and **Receiving Code Review** are useful when you want better review quality and less shallow agreement

## Related pages

- [Create custom local skills](/docs/opencode/skills-integration)
- [Automate project workflow with AGENTS.md](/docs/opencode/project-rules)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
