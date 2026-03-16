---
title: Reference - OpenCode Agent Modes
sidebar_position: 10
---

# Reference - OpenCode Agent Modes

This page explains the difference between planning-oriented and execution-oriented agent behavior.

## Two useful mental models

### Planner mode

Use this when you want:

- analysis before action
- a plan file or task list
- architectural thinking
- decomposition of a complex request

Planner-style work is best when the cost of a bad implementation path is high.

### Execution mode

Use this when you want:

- code changes now
- focused implementation
- direct debugging
- task-by-task progress through a known plan

Execution-style work is best when the scope is already known.

## Common `oh-my-openagent` agents and when to use them

The exact model behind each agent can change, but the behavioral role is the important part.

## Recommended model pool for agent work

If you want flexibility while keeping the behavior predictable, this docs set already points toward a practical pool:

- **`openai/gpt-5.3-codex`** — best default for implementation-heavy coding work
  - useful variants: `medium`, `high`, `xhigh`
- **`openai/gpt-5.4`** — best default for review, architecture, and higher-trust reasoning
  - useful variants: `medium`, `high`, `xhigh`
- **`opencode-go/kimi-k2.5`** — good lower-cost planning, routing, and flexible general-purpose fallback
  - no reasoning variant documented in this repo, so treat model choice itself as the main switch

For lighter background search and fallback work, this repo also uses:

- **`opencode/minimax-m2.5-free`**
- **`opencode-go/minimax-m2.5`**
- **`openai/gpt-5-nano`** or `opencode/gpt-5-nano` as very light fallback choices

### `sisyphus`

- **Use when:** you want the main worker to execute normal implementation tasks
- **Behavior:** handles day-to-day coding flow and can delegate to more specialized helpers when needed
- **Avoid when:** you specifically need read-only review or pure planning first

**Recommended model options:**

1. `opencode-go/kimi-k2.5` — good default when you want a balanced orchestrator
2. `openai/gpt-5.3-codex` with `medium` or `high` — better when execution quality matters more than cost
3. `openai/gpt-5.4` with `medium` — useful if the work mixes orchestration with heavier reasoning

### `hephaestus`

- **Use when:** you want a strong implementation-focused coding agent
- **Behavior:** best for direct software engineering work, repo changes, and structured execution
- **Avoid when:** the problem is still unclear and needs architecture-first thinking

**Recommended model options:**

1. `openai/gpt-5.3-codex` with `medium` — strong default for coding work
2. `openai/gpt-5.3-codex` with `high` or `xhigh` — use for harder implementation or refactoring
3. `openai/gpt-5.4` with `medium` — use when implementation also requires heavier reasoning across multiple files

### `oracle`

- **Use when:** you need high-quality reasoning, architectural review, or a second opinion on a hard problem
- **Behavior:** acts like a senior reviewer or consultant; best for difficult tradeoffs and validation
- **Avoid when:** the task is trivial and can be solved directly

**Recommended model options:**

1. `openai/gpt-5.4` with `high` — best default for review and architecture
2. `openai/gpt-5.4` with `xhigh` — use when the decision is expensive or high risk
3. `openai/gpt-5.3-codex` with `high` — acceptable fallback when you still need strong technical reasoning with a coding bias

### `explore`

- **Use when:** you need to search the codebase, find patterns, or understand unfamiliar project structure
- **Behavior:** lightweight exploration and pattern finding
- **Avoid when:** you already know the exact file and exact change

**Recommended model options:**

1. `opencode/minimax-m2.5-free` — good low-cost default for exploration
2. `opencode-go/minimax-m2.5` — stronger fallback for repo discovery
3. `openai/gpt-5-nano` or `opencode/gpt-5-nano` — lightweight fallback when speed matters more than depth

### `librarian`

- **Use when:** you need external docs, examples, or reference material from libraries and public repos
- **Behavior:** focused on fetching and synthesizing outside knowledge
- **Avoid when:** the answer already exists inside your repo

**Recommended model options:**

1. `opencode/minimax-m2.5-free` — good low-cost docs and reference search default
2. `opencode-go/minimax-m2.5` — fallback when you want a slightly stronger remote-reference pass
3. `openai/gpt-5.4` with `medium` — use only when the synthesis itself is difficult and worth the extra reasoning quality

### `metis`

- **Use when:** the request is ambiguous, broad, or likely to go wrong without better framing
- **Behavior:** clarifies scope, hidden assumptions, and failure modes before execution
- **Avoid when:** the task is already concrete and well-scoped

**Recommended model options:**

1. `opencode-go/kimi-k2.5` — good practical default for clarification and scope shaping
2. `openai/gpt-5.4` with `medium` or `high` — use when ambiguity is expensive and better framing really matters
3. `openai/gpt-5.3-codex` with `medium` — use when the ambiguity is mainly technical and implementation-oriented

### `momus`

- **Use when:** you want plan critique or QA-style review of an intended approach
- **Behavior:** checks for gaps, ambiguity, and missing verification
- **Avoid when:** you just need the first draft of a solution quickly

**Recommended model options:**

1. `openai/gpt-5.4` with `xhigh` — best default for plan critique and QA review
2. `openai/gpt-5.4` with `high` — use when you want strong review but less cost than `xhigh`
3. `openai/gpt-5.3-codex` with `high` — fallback when the review is tightly tied to implementation details

## Variant guidance

- **`medium`** — best default for most real work
- **`high`** — use when the task is complex, ambiguous, or higher risk
- **`xhigh`** — reserve for review, architecture, or decisions that are expensive to get wrong
- **low-cost fallback models** — best for search, exploration, and background tasks where perfect reasoning is unnecessary

## Simple agent selection guide

| Situation | Best starting point |
|---|---|
| You want code written now | `hephaestus` or `sisyphus` |
| You need repo discovery first | `explore` |
| You need docs or external examples | `librarian` |
| You are unsure what the real task is | `metis` |
| You need a high-trust review | `oracle` |
| You want to stress-test a plan | `momus` |

## What behavior to expect

- **Worker agents** should move work forward
- **Explorer agents** should search and summarize
- **Reviewer agents** should challenge assumptions and find gaps
- **Planner agents** should improve scope before implementation begins

## Recommended flow

1. Planner mode for exploration and plan creation
2. Execution mode for implementation
3. Review or verification mode before finishing

## Related pages

- [Use planner strategy to save tokens](/docs/opencode/planner-strategy)
- [Reference: Superpowers skills catalog](/docs/opencode/skills-catalog)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
