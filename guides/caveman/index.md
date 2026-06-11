---
sidebar_position: 0
---

# Caveman

Caveman makes AI agents talk like a caveman — **~75% fewer output tokens** with zero loss of technical accuracy. *"why use many token when few do trick."*

Works across 30+ AI coding agents: Claude Code, OpenCode, Codex, Cursor, Gemini, Copilot, Windsurf, and more.

- **Repo:** [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)
- **License:** MIT
- **npm:** [`caveman-shrink`](https://www.npmjs.com/package/caveman-shrink) (MCP middleware)

## Benefits

- **~65% fewer output tokens** on average (range 22–87% across real-world benchmarks)
- **~46% fewer input tokens** when compressing memory files (CLAUDE.md, project notes)
- **No accuracy loss** — brevity improved accuracy by 26 points in a March 2026 study
- **Lifetime savings tracking** with USD cost estimation

## Quick Install

**One-liner (auto-detects all agents):**
```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

**Per-agent:**
```bash
# Claude Code plugin
claude plugin marketplace add JuliusBrussee/caveman
claude plugin install caveman@caveman

# Codex CLI
npx skills add JuliusBrussee/caveman -a codex

# OpenCode
# Copy skill file manually or use the one-liner installer

# Cursor / Windsurf (always-on via rule file)
npx skills add JuliusBrussee/caveman -a cursor --with-init
```

## Compression Levels

| Level | Command | Token Reduction | Style |
|-------|---------|-----------------|-------|
| **Lite** | `/caveman lite` | ~30% | Drops filler words |
| **Full** | `/caveman` | ~65% | Default caveman style |
| **Ultra** | `/caveman ultra` | ~75% | Telegraphic, minimal |
| **Wenyan** | `/caveman wenyan` | ~80% | Classical Chinese |

Turn off: Type `normal mode` or `/caveman off`.

## Commands

```bash
/caveman                    # Activate full compression
/caveman ultra              # Maximum compression
/caveman lite               # Light mode

/caveman-commit             # Generate ≤50char conventional commit
/caveman-review             # One-line PR comments per change

/caveman-stats              # Token savings: "143k saved. ~$1.46"
/caveman-stats --share      # Tweetable stats

/caveman-compress CLAUDE.md # Rewrite memory file in caveman-speak
```

## Cavecrew Subagents

Specialized subagents that talk in caveman by default (~60% fewer tokens than vanilla):

```bash
cavecrew-investigator    # Research and investigation
cavecrew-builder         # Implementation and coding
cavecrew-reviewer        # Code review and QA
```

## caveman-shrink (MCP Middleware)

Wraps any MCP server to compress tool descriptions — reduces input tokens from tool listings:

```bash
npm install -g caveman-shrink
# Configure as middleware in your MCP server chain
```

## Auto-Activation

Claude Code, Codex, and Gemini auto-activate Caveman every session via hooks. For other agents:

```bash
# Always-on via init rule file
npx skills add JuliusBrussee/caveman -a cursor --with-init

# Per-session manual activation
/caveman
```

## Ecosystem

| Tool | Purpose |
|------|---------|
| **caveman** | Output compression (this) |
| **caveman-code** | Full terminal coding agent |
| **cavemem** | Cross-agent memory |
| **cavekit** | Spec-driven build loop |
| **cavegemma** | Gemma 4 31B fine-tuned on caveman pairs |
