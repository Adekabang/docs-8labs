---
title: Troubleshoot OpenCode Setup Issues
sidebar_position: 14
---

# Troubleshoot OpenCode Setup Issues

These are the most common problems from the current setup and the quickest way to verify them.

## Models do not appear in OpenCode

### Check

```bash
brew services list | grep cliproxyapi
curl http://localhost:8317/v1/models -H "Authorization: Bearer your-api-key-1"
```

### Usually caused by

- CLIProxyAPI is not running
- the API key in `opencode.json` does not match `cliproxyapi.conf`
- OAuth login for Codex expired or never completed

## No reasoning / thinking variants appear

### Check

Make sure each model has both:

- `"reasoning": true`
- a `"variants"` object

### Example

```json
"gpt-5.4": {
  "reasoning": true,
  "variants": {
    "low": {"reasoningEffort": "low"},
    "high": {"reasoningEffort": "high"}
  }
}
```

## Connection refused on `localhost:8317`

### Check

```bash
brew services restart cliproxyapi
curl http://localhost:8317/v1/models -H "Authorization: Bearer your-api-key-1"
```

### Usually caused by

- the service is stopped
- CLIProxyAPI failed to start after a config change
- port `8317` is not the configured port anymore

## Management panel returns 404

Set a non-empty `remote-management.secret-key` in `/opt/homebrew/etc/cliproxyapi.conf`, then restart the service.

```bash
brew services restart cliproxyapi
```

## OpenCode works but MCP tools are missing

### Check

- `opencode.json` contains the expected `mcp` block
- each MCP entry is enabled where required
- the underlying `npx` command can be resolved locally

### Example MCP commands

```json
"context7": {
  "type": "local",
  "command": ["npx", "-y", "@upstash/context7-mcp"],
  "enabled": true
}
```

## Codex login expired

Re-authenticate and check the model list again.

```bash
cliproxyapi -codex-login
curl http://localhost:8317/v1/models -H "Authorization: Bearer your-api-key-1"
```

## Config changes do not apply

Restart the service and relaunch OpenCode.

```bash
brew services restart cliproxyapi
```

## Quick recovery checklist

1. Verify `cliproxyapi` is running
2. Verify `curl` to `/v1/models` works
3. Verify API key matches in both configs
4. Verify `opencode --version`
5. Verify `opencode.json` still references `cliproxyapi`
6. Verify `oh-my-opencode.json` is valid JSON if you are using the current legacy config filename

## Related pages

- [Install OpenCode and CLIProxyAPI](/docs/opencode/installation)
- [Configure providers, agents, and models](/docs/opencode/configuration)
- [Launch OpenCode and use model variants](/docs/opencode/launch-and-model-reference)
