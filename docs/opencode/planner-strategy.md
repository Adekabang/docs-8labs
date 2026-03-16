---
title: Use Planner Strategy to Save Tokens
sidebar_position: 9
---

# Use Planner Strategy to Save Tokens

This page explains how to separate planning from execution so you get better output with less wasted context.

## Core idea

Do not use the same session for every kind of work if the task is large. Split the workflow into:

1. **Planner / architect mode** for analysis and structure
2. **Execution mode** for implementation

This keeps prompts cleaner and helps avoid spending large amounts of context on the wrong kind of work.

## Practical pattern

### Use planning first when:

- requirements are unclear
- the task spans many files
- architecture matters
- you want a step-by-step execution plan before changing anything

### Use execution directly when:

- the change is small and obvious
- the file location is known
- there is little ambiguity

## Simple workflow

1. Use a planner-style session to define the problem and output a task list
2. Save the plan in your project docs or task tracker
3. Open or continue an implementation session
4. Execute against the plan instead of rethinking everything each time

## What this improves

- lower token waste
- clearer handoff between thinking and doing
- better task decomposition
- less random prompt drift during coding

## Related pages

- [Reference: OpenCode agent modes](/docs/opencode/agent-modes)
- [Automate project workflow with AGENTS.md](/docs/opencode/project-rules)
- [Reference: Superpowers skills catalog](/docs/opencode/skills-catalog)
