---
sidebar_position: 0
---

# ECC — Everything Claude Code

ECC is a production-ready AI coding plugin that acts as an agent harness operating system. It provides **64 specialized agents**, **262 skills**, **84 slash commands**, and automated hook workflows — built from 10+ months of daily multi-harness use.

Works across: Claude Code, OpenCode, Codex, Cursor, Gemini, GitHub Copilot, Zed, and more.

- **Repo:** [github.com/affaan-m/ECC](https://github.com/affaan-m/ECC)
- **License:** MIT
- **Latest:** v2.0.0

## Quick Install

**Recommended (Claude Code plugin):**
```bash
# In Claude Code:
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc

# Then install rules (plugins can't auto-distribute rules):
./install.sh --profile core --target claude
```

**Manual full install:**
```bash
git clone https://github.com/affaan-m/ECC
cd ECC
./install.sh --profile full --target claude
```

**For OpenCode / Codex / Cursor:**
```bash
./install.sh --target opencode
./install.sh --target codex
./install.sh --target cursor
```

**npm:**
```bash
npm install ecc-universal
npx ecc install --profile core --target claude
```

## Key Agents

| Agent | Role |
|-------|------|
| `planner` | Complex feature planning and decomposition |
| `architect` | System architecture design decisions |
| `tdd-guide` | Test-driven development workflow |
| `code-reviewer` | Code quality review with inline suggestions |
| `security-reviewer` | Security-focused code audit (AgentShield) |
| `build-error-resolver` | Diagnose and fix build failures |
| `refactor-cleaner` | Code refactoring and cleanup |
| `doc-updater` | Documentation generation and updates |
| `loop-operator` | Multi-step task orchestration |

Plus language-specific reviewers for TypeScript, Python, Go, Rust, Java, C++, Kotlin, Django, and PyTorch.

## Essential Slash Commands

```bash
/plan              # Complex feature planning
/code-review       # Code quality review
/build-fix         # Fix build errors
/tdd               # Test-driven development
/security-scan     # AgentShield security audit
/model-route       # Route tasks by model complexity
/harness-audit     # Audit harness reliability
/loop-start        # Multi-step task loop
```

## Hooks System

ECC installs hooks for lifecycle events:

| Hook Event | Purpose |
|-----------|---------|
| `SessionStart` | Initialize context, load project rules |
| `PreToolUse` | Validate tool calls before execution |
| `PostToolUse` | Log results, detect anomalies |
| `Stop` | Session cleanup, save learnings |

## Continuous Learning (Instinct)

ECC v2 auto-learns from sessions:

```bash
/instinct-status             # View learned patterns
/instinct-import <file>      # Import external patterns
/instinct-export             # Export learned behaviors
```

Patterns evolve from sessions into reusable skills with confidence scoring — no manual curation needed over time.

## Token Optimization

For best performance with ECC:

```json
// ~/.claude/settings.json
{
  "model": "sonnet",
  "MAX_THINKING_TOKENS": 10000,
  "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": 50
}
```

ECC agents are designed to work within compact contexts — the goal is deep work, not context bloat.
