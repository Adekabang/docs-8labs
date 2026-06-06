---
title: Configure MCP Tools
sidebar_position: 6
---

# Configure MCP Tools

This page explains how MCP fits into the tools already used in this repository.

## Why MCP matters

MCP lets OpenCode call external tools instead of guessing. In practice, this means better docs lookups, browser automation, UI context, and optional integrations with other platforms.

## Current local MCP tools

The current setup already uses:

- **Context7** — current library documentation and examples
- **Playwright** — browser automation and visual verification
- **React Grab MCP** — UI element context for frontend work

## Example `mcp` block

```json
{
  "mcp": {
    "context7": {
      "type": "local",
      "command": ["npx", "-y", "@upstash/context7-mcp"],
      "enabled": true
    },
    "playwright": {
      "type": "local",
      "command": ["npx", "@playwright/mcp@latest"],
      "enabled": true
    },
    "react-grab-mcp": {
      "type": "local",
      "command": ["npx", "-y", "@react-grab/mcp", "--stdio"]
    }
  }
}
```

## Optional additions

It is often useful to combine the built-in MCP tools with a few project-specific ones.

### Example: shadcn MCP

```json
{
  "shadcn": {
    "type": "local",
    "command": ["npx", "-y", "shadcn", "mcp"],
    "enabled": true
  }
}
```

Useful when you want to add UI components directly through chat.

### Example: Supabase MCP

```json
{
  "supabase": {
    "type": "remote",
    "url": "https://mcp.supabase.com/mcp",
    "enabled": true,
    "headers": {
      "Authorization": "Bearer YOUR_SUPABASE_ACCESS_TOKEN_HERE"
    }
  }
}
```

Useful when you want OpenCode to inspect schemas, query data, or verify migrations.

:::warning
Do not hardcode real personal tokens into shared docs or committed config files.
:::

## MCP setup checklist

1. Add the MCP block to `~/.config/opencode/opencode.json`
2. Set `"enabled": true` where needed
3. Restart OpenCode
4. Verify the MCP server command can actually run locally
5. Test one real request in chat instead of assuming it works

## What to include vs avoid

Good additions:

- docs lookup
- browser automation
- UI helper tools
- project-specific database or API tools

Avoid copying blindly:

- someone else's tokens
- integrations you will not actually use
- Windows-specific workaround sections when they do not apply to your setup

## Related pages

- [Configure providers, agents, and models](/docs/opencode/configuration)
- [Automate project workflow with AGENTS.md](/docs/opencode/project-rules)
- [Troubleshoot common OpenCode issues](/docs/opencode/troubleshooting)
