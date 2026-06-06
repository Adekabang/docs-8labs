---
title: Launch OpenCode and Use Model Variants
sidebar_position: 13
---

# Launch OpenCode and Use Model Variants

Once installation and configuration are complete, this is the runtime flow for actually using OpenCode day to day.

## Launch OpenCode

```bash
opencode
```

## Model switching basics

- Use `/models` to switch models during a session
- CLIProxyAPI models appear as `cliproxyapi/gpt-5`, `cliproxyapi/gpt-5.4`, and similar names
- Use the variant cycle keybind to move between reasoning levels such as low, medium, high, and xhigh when the selected model supports them
- `oh-my-openagent` agents are available through `@` mentions

## Model reference

### Available models and their thinking levels

| Model | Thinking Levels | Context | Output |
|---|---|---|---|
| GPT-5 | minimal, low, medium, high | 400K | 128K |
| GPT-5 Codex | low, medium, high | 400K | 128K |
| GPT-5 Codex Mini | low, medium, high | 400K | 128K |
| GPT-5.1 | none, low, medium, high | 400K | 128K |
| GPT-5.1 Codex | low, medium, high | 400K | 128K |
| GPT-5.1 Codex Mini | low, medium, high | 400K | 128K |
| GPT-5.1 Codex Max | low, medium, high, **xhigh** | 400K | 128K |
| GPT-5.2 | none, low, medium, high, **xhigh** | 400K | 128K |
| GPT-5.2 Codex | low, medium, high, **xhigh** | 400K | 128K |
| GPT-5.3 Codex | low, medium, high, **xhigh** | 400K | 128K |
| GPT-5.3 Codex Spark | low, medium, high, **xhigh** | 128K | 128K |
| GPT-5.4 | low, medium, high, **xhigh** | **1.05M** | 128K |

## Choosing models in practice

- **GPT-5.4** is the best default for long-context reasoning and bigger cross-file work
- **GPT-5.3 Codex** is a good default for coding-heavy implementation tasks
- **lighter fallback models** are useful for exploration and low-cost background work

## Related pages

- [Configure providers, agents, and models](/docs/opencode/configuration)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
- [Troubleshoot common OpenCode issues](/docs/opencode/troubleshooting)
