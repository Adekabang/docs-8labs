---
title: OpenCode Overview
sidebar_position: 1
---

# OpenCode Overview

This section provides a cleaner documentation map for day-to-day use. It is based on a local setup that uses **OpenCode**, **CLIProxyAPI**, and **oh-my-openagent**, with optional extras such as **Superpowers** and **Impeccable**.

Instead of one long guide, the same information is organized here by task: install, configure, extend, operate, and troubleshoot.

The setup described here does **not** assume CLIProxyAPI is the only provider path. OpenCode can also work directly with providers such as `opencode` and `opencode-go`. In this repository, `cliproxyapi` is mainly useful when you want to place several Codex accounts behind a single OpenAI-compatible endpoint and let the proxy handle routing or load balancing.

## Documentation Map

- [Quick Start for the full stack](/guides/opencode/quick-start)
- [Install OpenCode and CLIProxyAPI](/guides/opencode/installation)
- [Configure providers, agents, and models](/guides/opencode/configuration)
- [Choose between opencode, opencode-go, and cliproxyapi](/guides/opencode/configuration)
- [Set up workflows, MCP tools, and project rules](/guides/opencode/mcp-guide)
- [Configure MCP tools](/guides/opencode/mcp-guide)
- [Automate project workflow with AGENTS.md](/guides/opencode/project-rules)
- [Create custom local skills](/guides/opencode/skills-integration)
- [Use planner strategy to save tokens](/guides/opencode/planner-strategy)
- [Reference: OpenCode agent modes](/guides/opencode/planner-strategy)
- [Tutorial: Image to code workflow](/guides/opencode/image-to-code)
- [Use RTK to reduce token usage](/guides/opencode/rtk-guide)
- [Reference: Superpowers skills catalog](/guides/opencode/skills-catalog)
- [Guide: When to use Impeccable](/guides/opencode/impeccable-guide)
- [Launch OpenCode and use model variants](/guides/opencode/launch-and-model-reference)
- [Troubleshoot common OpenCode issues](/guides/opencode/troubleshooting)

## Architecture at a Glance

```text
┌─────────────────────┐
│      OpenCode       │
│  oh-my-openagent    │
└─────────┬───────────┘
          │ OpenAI-compatible API
          │ http://localhost:8317/v1
          ▼
┌─────────────────────┐
│     CLIProxyAPI     │
│ Homebrew service    │
│ Port 8317           │
└─────────┬───────────┘
          │ OAuth tokens / provider auth
          ▼
┌─────────────────────┐
│ Upstream LLM models │
│ GPT-5.x, Claude,    │
│ Gemini, Kimi, etc.  │
└─────────────────────┘
```

## What This Setup Optimizes For

- **One local endpoint for many models** through CLIProxyAPI
- **OpenCode as the main coding interface**
- **oh-my-openagent for agent orchestration**
- **ECC** for specialized agents (64 agents, 262 skills, 84 commands) — see [ECC guide](/guides/ecc)
- **Caveman** for token compression (~75% fewer output tokens) — see [Caveman guide](/guides/caveman)

### Complementary Tools

For advanced workflows, consider adding:

- **[ECC](/guides/ecc)** — Agent harness with planners, reviewers, security scanners, and continuous learning. Works across Claude Code, OpenCode, Codex, and more.
- **[Caveman](/guides/caveman)** — Token compression that cuts ~75% output tokens with no accuracy loss. One-line install, works across 30+ agents.

## Naming note

The upstream project is now called **oh-my-openagent**, but many current plugin and config examples still use legacy names such as `oh-my-opencode`, `oh-my-opencode.json`, and `plugin: ["oh-my-opencode"]`. This docs section uses the current project name for explanation, while preserving the real config names where they still matter.
- **Optional MCP tools** like Context7, Playwright, and React Grab
- **Project-level workflow rules** with `AGENTS.md`

## Recommended Reading Order

1. Start with [Quick Start for the full stack](/guides/opencode/quick-start)
2. Continue to [Install OpenCode and CLIProxyAPI](/guides/opencode/installation)
3. Decide your provider path in [Choose between opencode, opencode-go, and cliproxyapi](/guides/opencode/configuration)
4. Configure providers, agents, and models in [Configuration](/guides/opencode/configuration)
5. Add workflow and tool layers with [MCP Guide](/guides/opencode/mcp-guide), [Project Rules](/guides/opencode/project-rules), and [Skills Integration](/guides/opencode/skills-integration)
6. Learn efficiency patterns in [Use planner strategy to save tokens](/guides/opencode/planner-strategy) and [Reference: OpenCode agent modes](/guides/opencode/planner-strategy)
7. Learn the runtime workflow in [Launch OpenCode and use model variants](/guides/opencode/launch-and-model-reference)
8. Use [Troubleshooting](/guides/opencode/troubleshooting) when something breaks

## Notes

- This guide is written for the current macOS-based setup in this repository.
- It intentionally splits the setup into smaller task-based pages instead of one giant document.
- The full OpenCode setup now lives in this section so it can be maintained in one place.
