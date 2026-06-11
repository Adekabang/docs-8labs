---
title: "Workflow And Tools"
authors: [Adekabang]
tags: [opencode, agent, workflow, guide]
date: 2026-06-10
---

     1|---
     2|title: Workflows, MCP Tools, and Project Rules
     3|sidebar_position: 4
     4|---
     5|
     6|# Workflows, MCP Tools, and Project Rules
     7|
     8|The fastest way to make OpenCode actually useful is not just installing it, but giving it a repeatable workflow.
     9|
    10|## 1. Use a docs-map mindset
    11|
    12|Instead of keeping everything in one setup file, split your operating model into:
    13|
    14|- installation
    15|- configuration
    16|- workflows
    17|- tools
    18|- troubleshooting
    19|
    20|That makes it easier to maintain when models, plugins, or MCP servers change.
    21|
    22|## 2. Project-level rules with `AGENTS.md`
    23|
    24|One of the most useful habits is creating an `AGENTS.md` file in the root of the project you are actively working on.
    25|
    26|Example structure:
    27|
    28|```md
    29|# Project Workflow Rules
    30|
    31|## 1. Planning
    32|- Create and maintain a task list.
    33|- Mark tasks complete immediately after finishing them.
    34|
    35|## 2. Verification
    36|- Run relevant tests before finishing work.
    37|- Run lint, typecheck, or build when applicable.
    38|
    39|## 3. Change tracking
    40|- Keep a changelog if the project needs one.
    41|
    42|## 4. Git discipline
    43|- Create clear commits for logical units of work.
    44|```
    45|
    46|The exact rules should match your repo, but the pattern is useful because it makes OpenCode behave more consistently across sessions.
    47|
    48|## 3. MCP tools worth enabling
    49|
    50|The current local setup already includes:
    51|
    52|- **Context7** for current library docs and examples
    53|- **Playwright** for browser automation and verification
    54|- **React Grab MCP** for UI element context
    55|
    56|These are good default tools because they support research, validation, and UI workflows without changing your base agent setup.
    57|
    58|## 4. Useful local CLI tools for agent workflows
    59|
    60|For `oh-my-openagent`, it is also useful to install a few local terminal tools that improve search quality:
    61|
    62|```bash
    63|brew install ripgrep ast-grep
    64|```
    65|
    66|### Why they matter
    67|
    68|- **`ripgrep` (`rg`)** is excellent for fast codebase-wide text search
    69|- **`ast-grep` (`sg`)** is useful when you want syntax-aware structural matching instead of plain text search
    70|
    71|If you regularly use exploration-heavy agent workflows, these tools are worth having installed.
    72|
    73|### Add RTK for token-efficient Bash outputs
    74|
    75|If your sessions are command-heavy, consider adding RTK:
    76|
    77|- [Use RTK to reduce token usage](/guides/opencode/rtk-guide)
    78|
    79|RTK can rewrite common Bash commands to compact `rtk ...` equivalents so less noisy output is sent into model context.
    80|
    81|## 5. Optional additions
    82|
    83|If you need more workflow power, consider these layers:
    84|
    85|### Superpowers
    86|
    87|Useful for:
    88|
    89|- brainstorming
    90|- writing plans
    91|- subagent-driven development
    92|- structured debugging
    93|
    94|How it behaves in practice:
    95|
    96|- pushes you toward a more explicit plan before coding
    97|- breaks larger work into smaller task-sized units
    98|- encourages review loops instead of one-shot generation
    99|- works best when you want discipline and repeatable execution
   100|
   101|Use it when:
   102|
   103|- a feature is large or ambiguous
   104|- you want a better plan before implementation
   105|- debugging needs a root-cause workflow instead of random fixes
   106|- you want review-oriented development habits
   107|
   108|Avoid relying on it when:
   109|
   110|- the task is a tiny one-file change
   111|- direct implementation is faster than spinning up more process
   112|
   113|Install inside OpenCode with:
   114|
   115|```text
   116|Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
   117|```
   118|
   119|Or copy the project files manually:
   120|
   121|```bash
   122|git clone https://github.com/obra/superpowers.git /tmp/superpowers
   123|cp -r /tmp/superpowers/.opencode your-project/
   124|```
   125|
   126|### Impeccable
   127|
   128|Useful for:
   129|
   130|- frontend critique
   131|- design cleanup
   132|- better UI vocabulary
   133|- more intentional visual output
   134|
   135|How it behaves in practice:
   136|
   137|- pushes UI work away from generic default layouts
   138|- improves hierarchy, polish, spacing, and UX writing
   139|- is most useful after a first pass exists and needs refinement
   140|
   141|Use it when:
   142|
   143|- a frontend screen feels bland or generic
   144|- you want critique before shipping a UI
   145|- you need better copy, structure, or visual rhythm
   146|
   147|Avoid relying on it when:
   148|
   149|- the task is backend-only
   150|- there is no UI surface involved
   151|- you still need basic product logic before visual polish matters
   152|
   153|Install from the packaged OpenCode distribution or from the repository:
   154|
   155|```bash
   156|git clone https://github.com/pbakaus/impeccable.git /tmp/impeccable
   157|cp -r /tmp/impeccable/dist/opencode/.opencode your-project/
   158|```
   159|
   160|Common commands include:
   161|
   162|```text
   163|/audit
   164|/normalize
   165|/polish
   166|/distill
   167|/audit header
   168|/polish checkout-form
   169|```
   170|
   171|## 6. Practical OpenCode workflow
   172|
   173|For day-to-day work, a good sequence is:
   174|
   175|1. Pick the right model with `/models`
   176|2. Make sure the project has local rules if needed (`AGENTS.md`)
   177|3. Use MCP-backed tools when the task needs docs, browser automation, or UI context
   178|4. Keep heavy setup in config files, not repeated prompts
   179|5. Use focused pages like this docs section as your operating manual
   180|
   181|## 7. Choosing between oh-my-openagent, Superpowers, and Impeccable
   182|
   183|### Use `oh-my-openagent` when
   184|
   185|- you want agent orchestration
   186|- you need different agent roles like worker, explorer, and reviewer
   187|- you want better control over model routing and categories
   188|
   189|### Use Superpowers when
   190|
   191|- you want a stronger process around planning, TDD, debugging, and review
   192|- the challenge is not just coding, but working methodically
   193|
   194|### Use Impeccable when
   195|
   196|- the task is visual
   197|- the interface works but feels mediocre
   198|- you want critique and polish rather than raw implementation speed
   199|
   200|## 8. A practical rule of thumb
   201|
   202|- **Need coding behavior and agent roles?** Start with `oh-my-openagent`
   203|- **Need workflow discipline?** Add Superpowers
   204|- **Need better visual and UX output?** Add Impeccable
   205|
   206|## 9. What not to copy blindly
   207|
   208|Some ideas are useful as patterns, but should not be copied blindly:
   209|
   210|- personal API tokens
   211|- machine-specific file paths that do not match your system
   212|- model IDs you are not actually serving
   213|- Windows-only crash fixes if you are on macOS
   214|- git automation rules that do not fit your repo culture
   215|
   216|## Next step
   217|
   218|If something does not work after setup, jump to [Troubleshoot common OpenCode issues](/guides/opencode/troubleshooting).
   219|
