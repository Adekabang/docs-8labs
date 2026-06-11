---
title: Quick Start for the Full Stack
sidebar_position: 2
---

# Quick Start for the Full Stack

This page is the "Start Here" guide for the OpenCode stack in this repository. It is intentionally short and practical.

## Step 1: Install the core components

Follow these pages first:

- [Install OpenCode and CLIProxyAPI](/guides/opencode/installation)
- [Choose between opencode, opencode-go, and cliproxyapi](/blog/provider-strategy)
- [Configure providers, agents, and models](/guides/opencode/configuration)

At the end of that flow, you should have:

- either a direct provider path (`opencode` / `opencode-go`) or a local proxy path (`cliproxyapi`)
- Codex or other upstream providers authenticated
- `opencode` installed and visible in your shell
- `oh-my-openagent` loaded in your OpenCode setup

## Step 2: Apply the useful tool layer

The base install becomes much more useful once you add the operating layer around it.

Add these next:

- [Configure MCP tools](/guides/opencode/mcp-guide)
- [Automate project workflow with AGENTS.md](/guides/opencode/project-rules)
- [Create custom local skills](/guides/opencode/skills-integration)
- [Use RTK to reduce token usage](/guides/opencode/rtk-guide)

## Step 3: Launch and work

```bash
opencode
```

Then:

1. Switch models with `/models`
2. Confirm your MCP tools are available
3. Add `AGENTS.md` in your project if you want stricter workflow behavior
4. Use local skills when a project has domain-specific rules

## Recommended first-session checklist

- Verify `cliproxyapi` is reachable at `http://localhost:8317/v1`
- Verify `opencode --version`
- Verify your `opencode.json` points to CLIProxyAPI
- Verify your chosen provider path matches how you actually want to route model traffic
- Verify your `oh-my-opencode.json` or equivalent legacy config file is present and valid
- Verify MCP servers you care about are enabled

## Workflow structure

This docs section separates the setup into install, tools, workflow, and reference pages so it stays easier to maintain than one giant document.

## Next pages

- [Configure MCP tools](/guides/opencode/mcp-guide)
- [Automate project workflow with AGENTS.md](/guides/opencode/project-rules)
- [Reference: Superpowers skills catalog](/guides/opencode/skills-catalog)
