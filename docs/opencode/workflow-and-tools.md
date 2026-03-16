---
title: Workflows, MCP Tools, and Project Rules
sidebar_position: 4
---

# Workflows, MCP Tools, and Project Rules

The fastest way to make OpenCode actually useful is not just installing it, but giving it a repeatable workflow.

## 1. Use a docs-map mindset

Instead of keeping everything in one setup file, split your operating model into:

- installation
- configuration
- workflows
- tools
- troubleshooting

That makes it easier to maintain when models, plugins, or MCP servers change.

## 2. Project-level rules with `AGENTS.md`

One of the most useful habits is creating an `AGENTS.md` file in the root of the project you are actively working on.

Example structure:

```md
# Project Workflow Rules

## 1. Planning
- Create and maintain a task list.
- Mark tasks complete immediately after finishing them.

## 2. Verification
- Run relevant tests before finishing work.
- Run lint, typecheck, or build when applicable.

## 3. Change tracking
- Keep a changelog if the project needs one.

## 4. Git discipline
- Create clear commits for logical units of work.
```

The exact rules should match your repo, but the pattern is useful because it makes OpenCode behave more consistently across sessions.

## 3. MCP tools worth enabling

The current local setup already includes:

- **Context7** for current library docs and examples
- **Playwright** for browser automation and verification
- **React Grab MCP** for UI element context

These are good default tools because they support research, validation, and UI workflows without changing your base agent setup.

## 4. Useful local CLI tools for agent workflows

For `oh-my-openagent`, it is also useful to install a few local terminal tools that improve search quality:

```bash
brew install ripgrep ast-grep
```

### Why they matter

- **`ripgrep` (`rg`)** is excellent for fast codebase-wide text search
- **`ast-grep` (`sg`)** is useful when you want syntax-aware structural matching instead of plain text search

If you regularly use exploration-heavy agent workflows, these tools are worth having installed.

### Add RTK for token-efficient Bash outputs

If your sessions are command-heavy, consider adding RTK:

- [Use RTK to reduce token usage](/docs/opencode/rtk-guide)

RTK can rewrite common Bash commands to compact `rtk ...` equivalents so less noisy output is sent into model context.

## 5. Optional additions

If you need more workflow power, consider these layers:

### Superpowers

Useful for:

- brainstorming
- writing plans
- subagent-driven development
- structured debugging

How it behaves in practice:

- pushes you toward a more explicit plan before coding
- breaks larger work into smaller task-sized units
- encourages review loops instead of one-shot generation
- works best when you want discipline and repeatable execution

Use it when:

- a feature is large or ambiguous
- you want a better plan before implementation
- debugging needs a root-cause workflow instead of random fixes
- you want review-oriented development habits

Avoid relying on it when:

- the task is a tiny one-file change
- direct implementation is faster than spinning up more process

Install inside OpenCode with:

```text
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

Or copy the project files manually:

```bash
git clone https://github.com/obra/superpowers.git /tmp/superpowers
cp -r /tmp/superpowers/.opencode your-project/
```

### Impeccable

Useful for:

- frontend critique
- design cleanup
- better UI vocabulary
- more intentional visual output

How it behaves in practice:

- pushes UI work away from generic default layouts
- improves hierarchy, polish, spacing, and UX writing
- is most useful after a first pass exists and needs refinement

Use it when:

- a frontend screen feels bland or generic
- you want critique before shipping a UI
- you need better copy, structure, or visual rhythm

Avoid relying on it when:

- the task is backend-only
- there is no UI surface involved
- you still need basic product logic before visual polish matters

Install from the packaged OpenCode distribution or from the repository:

```bash
git clone https://github.com/pbakaus/impeccable.git /tmp/impeccable
cp -r /tmp/impeccable/dist/opencode/.opencode your-project/
```

Common commands include:

```text
/audit
/normalize
/polish
/distill
/audit header
/polish checkout-form
```

## 6. Practical OpenCode workflow

For day-to-day work, a good sequence is:

1. Pick the right model with `/models`
2. Make sure the project has local rules if needed (`AGENTS.md`)
3. Use MCP-backed tools when the task needs docs, browser automation, or UI context
4. Keep heavy setup in config files, not repeated prompts
5. Use focused pages like this docs section as your operating manual

## 7. Choosing between oh-my-openagent, Superpowers, and Impeccable

### Use `oh-my-openagent` when

- you want agent orchestration
- you need different agent roles like worker, explorer, and reviewer
- you want better control over model routing and categories

### Use Superpowers when

- you want a stronger process around planning, TDD, debugging, and review
- the challenge is not just coding, but working methodically

### Use Impeccable when

- the task is visual
- the interface works but feels mediocre
- you want critique and polish rather than raw implementation speed

## 8. A practical rule of thumb

- **Need coding behavior and agent roles?** Start with `oh-my-openagent`
- **Need workflow discipline?** Add Superpowers
- **Need better visual and UX output?** Add Impeccable

## 9. What not to copy blindly

Some ideas are useful as patterns, but should not be copied blindly:

- personal API tokens
- machine-specific file paths that do not match your system
- model IDs you are not actually serving
- Windows-only crash fixes if you are on macOS
- git automation rules that do not fit your repo culture

## Next step

If something does not work after setup, jump to [Troubleshoot common OpenCode issues](/docs/opencode/troubleshooting).
