---
title: Configure Providers, Agents, and Models
sidebar_position: 3
---

# Configure Providers, Agents, and Models

This page collects the configuration reference for this OpenCode setup so you can update providers, agents, and models without re-reading the entire docs section.

If you are still deciding whether to use a direct provider or a proxy layer, read [Choose between opencode, opencode-go, and cliproxyapi](/docs/opencode/provider-strategy) first.

## 1. Configure `oh-my-openagent`

Create `~/.config/opencode/oh-my-opencode.json`.

Even though the project is now called **oh-my-openagent**, current config examples still commonly use the legacy `oh-my-opencode` filename and plugin key.

This file defines:

- named **agents** like `hephaestus`, `oracle`, `explore`, and `librarian`
- **categories** such as `quick`, `deep`, and `visual-engineering`
- model routing and fallback behavior

### Recommended structure

Use your existing config as the baseline. The important pattern is:

```json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/dev/assets/oh-my-opencode.schema.json",
  "agents": {
    "hephaestus": {
      "model": "openai/gpt-5.3-codex",
      "variant": "medium"
    },
    "oracle": {
      "model": "openai/gpt-5.4",
      "variant": "high"
    },
    "explore": {
      "model": "opencode/minimax-m2.5-free"
    }
  },
  "categories": {
    "deep": {
      "model": "openai/gpt-5.3-codex",
      "variant": "medium"
    },
    "visual-engineering": {
      "model": "opencode-go/kimi-k2.5"
    }
  }
}
```

### Why this split is useful

- **Agents** describe named roles
- **Categories** describe workload classes
- **Fallback models** reduce session failure when one model is unavailable

### Expanded example

If you want a richer starting point, this expanded `oh-my-opencode.json` example mirrors the current setup more closely:

```json
{
  "$schema": "https://raw.githubusercontent.com/code-yeongyu/oh-my-opencode/dev/assets/oh-my-opencode.schema.json",
  "agents": {
    "sisyphus": {
      "model": "opencode-go/kimi-k2.5",
      "fallback_models": ["opencode-go/glm-5"]
    },
    "hephaestus": {
      "model": "openai/gpt-5.3-codex",
      "variant": "medium"
    },
    "oracle": {
      "model": "openai/gpt-5.4",
      "variant": "high"
    },
    "librarian": {
      "model": "opencode/minimax-m2.5-free",
      "fallback_models": ["opencode-go/minimax-m2.5"]
    },
    "explore": {
      "model": "opencode/minimax-m2.5-free",
      "fallback_models": [
        "opencode-go/minimax-m2.5",
        "opencode/gpt-5-nano",
        "openai/gpt-5-nano",
        "opencode/claude-haiku-4-5"
      ]
    },
    "multimodal-looker": {
      "model": "gpt-5.3-codex",
      "variant": "medium",
      "fallback_models": [
        "opencode-go/kimi-k2.5",
        "openai/gpt-5-nano",
        "opencode/gpt-5-nano"
      ]
    },
    "prometheus": {
      "model": "openai/gpt-5.4",
      "variant": "high",
      "fallback_models": ["openai/gpt-5.4"]
    },
    "metis": {
      "model": "opencode-go/kimi-k2.5",
      "fallback_models": ["openai/gpt-5.4"]
    },
    "momus": {
      "model": "openai/gpt-5.4",
      "variant": "xhigh"
    },
    "atlas": {
      "model": "opencode-go/kimi-k2.5",
      "fallback_models": ["openai/gpt-5.4"]
    }
  },
  "categories": {
    "visual-engineering": {
      "model": "opencode-go/kimi-k2.5"
    },
    "ultrabrain": {
      "model": "openai/gpt-5.3-codex",
      "variant": "xhigh"
    },
    "deep": {
      "model": "openai/gpt-5.3-codex",
      "variant": "medium"
    },
    "artistry": {
      "model": "opencode-go/kimi-k2.5"
    },
    "quick": {
      "model": "opencode/minimax-m2.5-free",
      "fallback_models": ["opencode-go/minimax-m2.5"]
    },
    "unspecified-low": {
      "model": "opencode/minimax-m2.5-free",
      "fallback_models": ["opencode-go/minimax-m2.5"]
    },
    "unspecified-high": {
      "model": "openai/gpt-5.4",
      "variant": "high"
    },
    "writing": {
      "model": "opencode/minimax-m2.5-free",
      "fallback_models": ["opencode-go/minimax-m2.5"]
    }
  }
}
```

## 2. Connect OpenCode to CLIProxyAPI

Create `~/.config/opencode/opencode.json`.

This section shows the proxy-based path used in this repository. If you use `opencode` or `opencode-go` directly, the provider block changes, but the surrounding ideas about models, variants, MCP, and plugins remain similar.

The important pieces are:

- `provider.cliproxyapi.options.baseURL`
- `provider.cliproxyapi.options.apiKey`
- `plugin: ["oh-my-opencode"]`
- `mcp` definitions for external tools
- model `variants` for reasoning effort

### Minimal provider example

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "*": "ask"
  },
  "plugin": ["oh-my-opencode"],
  "provider": {
    "cliproxyapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "CLIProxyAPI",
      "options": {
        "baseURL": "http://localhost:8317/v1",
        "apiKey": "your-api-key-1"
      },
      "models": {
        "gpt-5.4": {
          "id": "gpt-5.4",
          "name": "GPT-5.4",
          "reasoning": true,
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        }
      }
    }
  }
}
```

### Full provider example

If you want the current repo-style model matrix instead of a minimal example, use this fuller pattern:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "*": "ask"
  },
  "autoupdate": true,
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
  },
  "plugin": ["oh-my-opencode"],
  "provider": {
    "cliproxyapi": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "CLIProxyAPI",
      "options": {
        "baseURL": "http://localhost:8317/v1",
        "apiKey": "your-api-key-1"
      },
      "models": {
        "gpt-5": {
          "id": "gpt-5",
          "name": "GPT-5",
          "reasoning": true,
          "cost": {"input": 2.0, "output": 8.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "minimal": {"reasoningEffort": "minimal"},
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5-codex": {
          "id": "gpt-5-codex",
          "name": "GPT-5 Codex",
          "reasoning": true,
          "cost": {"input": 2.0, "output": 8.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5-codex-mini": {
          "id": "gpt-5-codex-mini",
          "name": "GPT-5 Codex Mini",
          "reasoning": true,
          "cost": {"input": 0.5, "output": 2.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5.1": {
          "id": "gpt-5.1",
          "name": "GPT-5.1",
          "reasoning": true,
          "cost": {"input": 2.5, "output": 10.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "none": {"reasoningEffort": "none"},
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5.1-codex": {
          "id": "gpt-5.1-codex",
          "name": "GPT-5.1 Codex",
          "reasoning": true,
          "cost": {"input": 2.5, "output": 10.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5.1-codex-mini": {
          "id": "gpt-5.1-codex-mini",
          "name": "GPT-5.1 Codex Mini",
          "reasoning": true,
          "cost": {"input": 0.75, "output": 3.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"}
          }
        },
        "gpt-5.1-codex-max": {
          "id": "gpt-5.1-codex-max",
          "name": "GPT-5.1 Codex Max",
          "reasoning": true,
          "cost": {"input": 5.0, "output": 20.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        },
        "gpt-5.2": {
          "id": "gpt-5.2",
          "name": "GPT-5.2",
          "reasoning": true,
          "cost": {"input": 3.0, "output": 12.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "none": {"reasoningEffort": "none"},
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        },
        "gpt-5.2-codex": {
          "id": "gpt-5.2-codex",
          "name": "GPT-5.2 Codex",
          "reasoning": true,
          "cost": {"input": 3.0, "output": 12.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        },
        "gpt-5.3-codex": {
          "id": "gpt-5.3-codex",
          "name": "GPT-5.3 Codex",
          "reasoning": true,
          "cost": {"input": 3.0, "output": 12.0},
          "limit": {"context": 400000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        },
        "gpt-5.3-codex-spark": {
          "id": "gpt-5.3-codex-spark",
          "name": "GPT-5.3 Codex Spark",
          "reasoning": true,
          "cost": {"input": 1.0, "output": 4.0},
          "limit": {"context": 128000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        },
        "gpt-5.4": {
          "id": "gpt-5.4",
          "name": "GPT-5.4",
          "reasoning": true,
          "cost": {"input": 3.0, "output": 12.0},
          "limit": {"context": 1050000, "output": 128000},
          "variants": {
            "low": {"reasoningEffort": "low"},
            "medium": {"reasoningEffort": "medium"},
            "high": {"reasoningEffort": "high"},
            "xhigh": {"reasoningEffort": "xhigh"}
          }
        }
      }
    }
  }
}
```

## 3. Add MCP servers

The current setup uses these MCP integrations:

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

This keeps the core setup small, then layers tools on top through MCP.

## 4. Key configuration notes

| Field | Purpose |
|---|---|
| `npm` | Uses `@ai-sdk/openai-compatible` for OpenAI-compatible endpoints |
| `options.baseURL` | Points to CLIProxyAPI at `http://localhost:8317/v1` |
| `options.apiKey` | Must match one of the keys in `cliproxyapi.conf` |
| `reasoning: true` | Enables the thinking and reasoning variant toggle in the TUI |
| `variants` | Defines selectable reasoning effort levels per model |

## 5. Direct providers vs proxy providers

- **Direct providers** such as `opencode` and `opencode-go` keep the setup simpler when you do not need a local proxy
- **Proxy providers** such as `cliproxyapi` are useful when you want one stable local endpoint and multiple upstream Codex accounts behind it

## 6. Model selection strategy

The current setup favors:

- **GPT-5.4** for high-context and high-reasoning tasks
- **GPT-5.3 Codex** for coding-heavy tasks
- **lighter fallback models** for exploration and low-cost background work

Use `/models` inside OpenCode to switch models during a session.

## 7. Keep the full reference nearby

The model matrix now lives in this docs section under [Launch OpenCode and use model variants](/docs/opencode/launch-and-model-reference).

## Next step

Continue to [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools).
