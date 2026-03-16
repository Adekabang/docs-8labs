---
title: Install OpenCode and CLIProxyAPI
sidebar_position: 2
---

# Install OpenCode and CLIProxyAPI

This is the practical install path for the setup currently documented in this repository: **CLIProxyAPI** as a local OpenAI-compatible endpoint in front of OpenCode. That said, OpenCode can also be used with direct providers such as `opencode` and `opencode-go`.

If your goal is specifically to place several Codex accounts behind one stable endpoint and let a proxy distribute requests, `cliproxyapi` is the right layer to add.

## Prerequisites

- macOS (Apple Silicon / arm64)
- [Homebrew](https://brew.sh/)
- Node.js 22+ with npm

## Helpful local CLI tools for `oh-my-openagent`

These are not required for OpenCode itself to launch, but they are very useful for `oh-my-openagent` workflows because they improve local search and structural code navigation.

### Install `ripgrep` and `ast-grep`

```bash
brew install ripgrep ast-grep
```

### Why these help

- **`ripgrep` (`rg`)** — very fast text search across the repo
- **`ast-grep` (`sg`)** — syntax-aware structural code search

These tools are especially useful when agents or workflows rely on grep-style exploration, pattern discovery, and codebase-wide inspection.

## Step 1: Install CLIProxyAPI

CLIProxyAPI wraps upstream providers into one local API endpoint that OpenCode can call.

```bash
brew install cliproxyapi
```

## Step 2: Configure CLIProxyAPI

Edit `/opt/homebrew/etc/cliproxyapi.conf` and set at least these values.

### API keys for local clients

```yaml
api-keys:
  - "your-api-key-1"
  - "your-api-key-2"
```

### Management panel secret

```yaml
remote-management:
  allow-remote: false
  secret-key: "your-management-password-here"
  disable-control-panel: false
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"
```

After startup, the panel is available at:

```text
http://localhost:8317/
```

:::tip
If you provide a plaintext `secret-key`, CLIProxyAPI will hash it on first startup. You still log in with the plaintext version.
:::

### Enable usage statistics aggregation

This is optional. Enable it if you want CLIProxyAPI to aggregate in-memory usage statistics:

```yaml
usage-statistics-enabled: true
```

Default in the upstream example config is `false`.

### Full `cliproxyapi.conf` reference

If you want a complete baseline instead of a minimal snippet, this is the current working reference pattern:

```yaml
host: ""
port: 8317

tls:
  enable: false
  cert: ""
  key: ""

remote-management:
  allow-remote: false
  secret-key: "your-management-password-here"
  disable-control-panel: false
  panel-github-repository: "https://github.com/router-for-me/Cli-Proxy-API-Management-Center"

auth-dir: "~/.cli-proxy-api"

api-keys:
  - "your-api-key-1"
  - "your-api-key-2"
  - "your-api-key-3"

debug: false

# Optional: enable in-memory usage statistics aggregation
usage-statistics-enabled: true

request-retry: 3
max-retry-credentials: 0
max-retry-interval: 30

quota-exceeded:
  switch-project: true
  switch-preview-model: true

routing:
  strategy: "round-robin"

# After running `cliproxyapi -codex-login`, Codex credentials are stored
# in ~/.cli-proxy-api/ and models become available automatically.
# No codex-api-key section is needed for OAuth-based login.
```

## Step 3: Authenticate Codex / OpenAI

Recommended:

```bash
cliproxyapi -codex-login
```

For headless environments:

```bash
cliproxyapi -codex-device-login
```

## Step 4: Start the service

```bash
brew services start cliproxyapi
```

Useful service commands:

```bash
brew services restart cliproxyapi
brew services stop cliproxyapi
brew services list | grep cliproxyapi
```

## Step 5: Verify models are visible

```bash
curl -s http://localhost:8317/v1/models \
  -H "Authorization: Bearer your-api-key-1" | python3 -m json.tool
```

If login worked, you should see GPT-5.x models in the response.

## Step 6: Install OpenCode

```bash
curl -fsSL https://opencode.ai/install | bash
```

Verify the binary:

```bash
opencode --version
```

## Step 7: Install the oh-my-openagent plugin dependency

The upstream project is now called **oh-my-openagent**, but the package and config names still commonly use the legacy `oh-my-opencode` naming.

```bash
mkdir -p ~/.config/opencode
npm --prefix ~/.config/opencode init -y
npm --prefix ~/.config/opencode install @opencode-ai/plugin
```

Your `~/.config/opencode/package.json` should include the plugin dependency, for example:

```json
{
  "dependencies": {
    "@opencode-ai/plugin": "1.2.26"
  }
}
```

## Step 8: Install optional extensions

### Superpowers

Inside OpenCode, use:

```text
Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md
```

Manual alternative:

```bash
git clone https://github.com/obra/superpowers.git /tmp/superpowers
cp -r /tmp/superpowers/.opencode your-project/
```

What Superpowers adds:

- brainstorming support
- structured implementation planning
- subagent-driven development
- TDD-oriented workflow guidance
- systematic debugging and code review patterns

Verification tip: start a fresh OpenCode session and ask for help planning a feature. The skills should auto-trigger if installation worked.

### Impeccable

If you care about UI polish and frontend prompts, install it from the OpenCode package provided by the project:

- https://impeccable.style
- https://github.com/pbakaus/impeccable

Repository-based install:

```bash
git clone https://github.com/pbakaus/impeccable.git /tmp/impeccable
cp -r /tmp/impeccable/dist/opencode/.opencode your-project/
```

Useful commands once installed include `/audit`, `/normalize`, `/polish`, `/distill`, and targeted variants like `/audit header`.

## What to do next

Once installation is done, continue with [Configure providers, agents, and models](/docs/opencode/configuration).
