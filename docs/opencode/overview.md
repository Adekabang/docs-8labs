---
title: OpenCode Overview
sidebar_position: 1
---

# OpenCode Overview

This section provides a cleaner documentation map for day-to-day use. It is based on a local setup that uses **OpenCode**, **CLIProxyAPI**, and **oh-my-openagent**, with optional extras such as **Superpowers** and **Impeccable**.

Instead of one long guide, the same information is organized here by task: install, configure, extend, operate, and troubleshoot.

The setup described here does **not** assume CLIProxyAPI is the only provider path. OpenCode can also work directly with providers such as `opencode` and `opencode-go`. In this repository, `cliproxyapi` is mainly useful when you want to place several Codex accounts behind a single OpenAI-compatible endpoint and let the proxy handle routing or load balancing.

## Documentation Map

- [Quick Start for the full stack](/docs/opencode/quick-start)
- [Install OpenCode and CLIProxyAPI](/docs/opencode/installation)
- [Configure providers, agents, and models](/docs/opencode/configuration)
- [Choose between opencode, opencode-go, and cliproxyapi](/docs/opencode/provider-strategy)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
- [Configure MCP tools](/docs/opencode/mcp-guide)
- [Automate project workflow with AGENTS.md](/docs/opencode/project-rules)
- [Create custom local skills](/docs/opencode/skills-integration)
- [Use planner strategy to save tokens](/docs/opencode/planner-strategy)
- [Reference: OpenCode agent modes](/docs/opencode/agent-modes)
- [Tutorial: Image to code workflow](/docs/opencode/image-to-code)
- [Use RTK to reduce token usage](/docs/opencode/rtk-guide)
- [Reference: Superpowers skills catalog](/docs/opencode/skills-catalog)
- [Guide: When to use Impeccable](/docs/opencode/impeccable-guide)
- [Launch OpenCode and use model variants](/docs/opencode/launch-and-model-reference)
- [Troubleshoot common OpenCode issues](/docs/opencode/troubleshooting)

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

## Naming note

The upstream project is now called **oh-my-openagent**, but many current plugin and config examples still use legacy names such as `oh-my-opencode`, `oh-my-opencode.json`, and `plugin: ["oh-my-opencode"]`. This docs section uses the current project name for explanation, while preserving the real config names where they still matter.
- **Optional MCP tools** like Context7, Playwright, and React Grab
- **Project-level workflow rules** with `AGENTS.md`

## Recommended Reading Order

1. Start with [Quick Start for the full stack](/docs/opencode/quick-start)
2. Continue to [Install OpenCode and CLIProxyAPI](/docs/opencode/installation)
3. Decide your provider path in [Choose between opencode, opencode-go, and cliproxyapi](/docs/opencode/provider-strategy)
4. Configure providers, agents, and models in [Configuration](/docs/opencode/configuration)
5. Add workflow and tool layers with [MCP Guide](/docs/opencode/mcp-guide), [Project Rules](/docs/opencode/project-rules), and [Skills Integration](/docs/opencode/skills-integration)
6. Learn efficiency patterns in [Use planner strategy to save tokens](/docs/opencode/planner-strategy) and [Reference: OpenCode agent modes](/docs/opencode/agent-modes)
7. Learn the runtime workflow in [Launch OpenCode and use model variants](/docs/opencode/launch-and-model-reference)
8. Use [Troubleshooting](/docs/opencode/troubleshooting) when something breaks

## Notes

- This guide is written for the current macOS-based setup in this repository.
- It intentionally splits the setup into smaller task-based pages instead of one giant document.
- The full OpenCode setup now lives in this section so it can be maintained in one place.
