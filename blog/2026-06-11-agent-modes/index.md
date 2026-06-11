---
title: "Agent Modes"
authors: [Adekabang]
tags: [opencode, agent, workflow, guide]
date: 2026-06-10
---

     1|---
     2|title: Reference - OpenCode Agent Modes
     3|sidebar_position: 10
     4|---
     5|
     6|# Reference - OpenCode Agent Modes
     7|
     8|This page explains the difference between planning-oriented and execution-oriented agent behavior.
     9|
    10|## Two useful mental models
    11|
    12|### Planner mode
    13|
    14|Use this when you want:
    15|
    16|- analysis before action
    17|- a plan file or task list
    18|- architectural thinking
    19|- decomposition of a complex request
    20|
    21|Planner-style work is best when the cost of a bad implementation path is high.
    22|
    23|### Execution mode
    24|
    25|Use this when you want:
    26|
    27|- code changes now
    28|- focused implementation
    29|- direct debugging
    30|- task-by-task progress through a known plan
    31|
    32|Execution-style work is best when the scope is already known.
    33|
    34|## Common `oh-my-openagent` agents and when to use them
    35|
    36|The exact model behind each agent can change, but the behavioral role is the important part.
    37|
    38|## Recommended model pool for agent work
    39|
    40|If you want flexibility while keeping the behavior predictable, this docs set already points toward a practical pool:
    41|
    42|- **`openai/gpt-5.3-codex`** — best default for implementation-heavy coding work
    43|  - useful variants: `medium`, `high`, `xhigh`
    44|- **`openai/gpt-5.4`** — best default for review, architecture, and higher-trust reasoning
    45|  - useful variants: `medium`, `high`, `xhigh`
    46|- **`opencode-go/kimi-k2.5`** — good lower-cost planning, routing, and flexible general-purpose fallback
    47|  - no reasoning variant documented in this repo, so treat model choice itself as the main switch
    48|
    49|For lighter background search and fallback work, this repo also uses:
    50|
    51|- **`opencode/minimax-m2.5-free`**
    52|- **`opencode-go/minimax-m2.5`**
    53|- **`openai/gpt-5-nano`** or `opencode/gpt-5-nano` as very light fallback choices
    54|
    55|### `sisyphus`
    56|
    57|- **Use when:** you want the main worker to execute normal implementation tasks
    58|- **Behavior:** handles day-to-day coding flow and can delegate to more specialized helpers when needed
    59|- **Avoid when:** you specifically need read-only review or pure planning first
    60|
    61|**Recommended model options:**
    62|
    63|1. `opencode-go/kimi-k2.5` — good default when you want a balanced orchestrator
    64|2. `openai/gpt-5.3-codex` with `medium` or `high` — better when execution quality matters more than cost
    65|3. `openai/gpt-5.4` with `medium` — useful if the work mixes orchestration with heavier reasoning
    66|
    67|### `hephaestus`
    68|
    69|- **Use when:** you want a strong implementation-focused coding agent
    70|- **Behavior:** best for direct software engineering work, repo changes, and structured execution
    71|- **Avoid when:** the problem is still unclear and needs architecture-first thinking
    72|
    73|**Recommended model options:**
    74|
    75|1. `openai/gpt-5.3-codex` with `medium` — strong default for coding work
    76|2. `openai/gpt-5.3-codex` with `high` or `xhigh` — use for harder implementation or refactoring
    77|3. `openai/gpt-5.4` with `medium` — use when implementation also requires heavier reasoning across multiple files
    78|
    79|### `oracle`
    80|
    81|- **Use when:** you need high-quality reasoning, architectural review, or a second opinion on a hard problem
    82|- **Behavior:** acts like a senior reviewer or consultant; best for difficult tradeoffs and validation
    83|- **Avoid when:** the task is trivial and can be solved directly
    84|
    85|**Recommended model options:**
    86|
    87|1. `openai/gpt-5.4` with `high` — best default for review and architecture
    88|2. `openai/gpt-5.4` with `xhigh` — use when the decision is expensive or high risk
    89|3. `openai/gpt-5.3-codex` with `high` — acceptable fallback when you still need strong technical reasoning with a coding bias
    90|
    91|### `explore`
    92|
    93|- **Use when:** you need to search the codebase, find patterns, or understand unfamiliar project structure
    94|- **Behavior:** lightweight exploration and pattern finding
    95|- **Avoid when:** you already know the exact file and exact change
    96|
    97|**Recommended model options:**
    98|
    99|1. `opencode/minimax-m2.5-free` — good low-cost default for exploration
   100|2. `opencode-go/minimax-m2.5` — stronger fallback for repo discovery
   101|3. `openai/gpt-5-nano` or `opencode/gpt-5-nano` — lightweight fallback when speed matters more than depth
   102|
   103|### `librarian`
   104|
   105|- **Use when:** you need external docs, examples, or reference material from libraries and public repos
   106|- **Behavior:** focused on fetching and synthesizing outside knowledge
   107|- **Avoid when:** the answer already exists inside your repo
   108|
   109|**Recommended model options:**
   110|
   111|1. `opencode/minimax-m2.5-free` — good low-cost docs and reference search default
   112|2. `opencode-go/minimax-m2.5` — fallback when you want a slightly stronger remote-reference pass
   113|3. `openai/gpt-5.4` with `medium` — use only when the synthesis itself is difficult and worth the extra reasoning quality
   114|
   115|### `metis`
   116|
   117|- **Use when:** the request is ambiguous, broad, or likely to go wrong without better framing
   118|- **Behavior:** clarifies scope, hidden assumptions, and failure modes before execution
   119|- **Avoid when:** the task is already concrete and well-scoped
   120|
   121|**Recommended model options:**
   122|
   123|1. `opencode-go/kimi-k2.5` — good practical default for clarification and scope shaping
   124|2. `openai/gpt-5.4` with `medium` or `high` — use when ambiguity is expensive and better framing really matters
   125|3. `openai/gpt-5.3-codex` with `medium` — use when the ambiguity is mainly technical and implementation-oriented
   126|
   127|### `momus`
   128|
   129|- **Use when:** you want plan critique or QA-style review of an intended approach
   130|- **Behavior:** checks for gaps, ambiguity, and missing verification
   131|- **Avoid when:** you just need the first draft of a solution quickly
   132|
   133|**Recommended model options:**
   134|
   135|1. `openai/gpt-5.4` with `xhigh` — best default for plan critique and QA review
   136|2. `openai/gpt-5.4` with `high` — use when you want strong review but less cost than `xhigh`
   137|3. `openai/gpt-5.3-codex` with `high` — fallback when the review is tightly tied to implementation details
   138|
   139|## Variant guidance
   140|
   141|- **`medium`** — best default for most real work
   142|- **`high`** — use when the task is complex, ambiguous, or higher risk
   143|- **`xhigh`** — reserve for review, architecture, or decisions that are expensive to get wrong
   144|- **low-cost fallback models** — best for search, exploration, and background tasks where perfect reasoning is unnecessary
   145|
   146|## Simple agent selection guide
   147|
   148|| Situation | Best starting point |
   149||---|---|
   150|| You want code written now | `hephaestus` or `sisyphus` |
   151|| You need repo discovery first | `explore` |
   152|| You need docs or external examples | `librarian` |
   153|| You are unsure what the real task is | `metis` |
   154|| You need a high-trust review | `oracle` |
   155|| You want to stress-test a plan | `momus` |
   156|
   157|## What behavior to expect
   158|
   159|- **Worker agents** should move work forward
   160|- **Explorer agents** should search and summarize
   161|- **Reviewer agents** should challenge assumptions and find gaps
   162|- **Planner agents** should improve scope before implementation begins
   163|
   164|## Recommended flow
   165|
   166|1. Planner mode for exploration and plan creation
   167|2. Execution mode for implementation
   168|3. Review or verification mode before finishing
   169|
   170|## Related pages
   171|
   172|- [Use planner strategy to save tokens](/guides/opencode/planner-strategy)
   173|- [Reference: Superpowers skills catalog](/guides/opencode/skills-catalog)
   174|- [Set up workflows, MCP tools, and project rules](/guides/opencode/workflow-and-tools)
   175|
