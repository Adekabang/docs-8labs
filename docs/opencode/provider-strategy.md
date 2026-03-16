---
title: Choose Between opencode, opencode-go, and cliproxyapi
sidebar_position: 4
---

# Choose Between opencode, opencode-go, and cliproxyapi

OpenCode does not have to run through only one provider path. In practice, you can use:

- `opencode`
- `opencode-go`
- `cliproxyapi`

The best choice depends on what problem you are trying to solve.

## The short version

### Use `opencode` when

- you want a straightforward provider path
- the models you need are already available there
- you do not need your own proxy layer in front of Codex accounts

### Use `opencode-go` when

- you want another direct provider path with different model availability or routing behavior
- your preferred models are exposed there
- you do not need account aggregation behind one local endpoint

### Use `cliproxyapi` when

- you want a single local OpenAI-compatible endpoint
- you want to put **multiple Codex accounts** behind that endpoint
- you want request routing or load balancing across those accounts
- you want OpenCode to talk to one provider while the proxy handles upstream account switching

## Why `cliproxyapi` exists in this setup

In this repository, the main value of `cliproxyapi` is **not** just “another provider config.”

Its real value is:

1. collect several Codex-capable upstream accounts behind one local API
2. expose them through one endpoint such as `http://localhost:8317/v1`
3. let the proxy handle retry, routing, and account distribution
4. keep OpenCode pointed at one stable provider definition

That makes it easier to:

- rotate between accounts
- reduce friction when one account is rate-limited or exhausted
- centralize configuration in one place

## Practical decision table

| Goal | Best choice |
|---|---|
| Simple direct provider setup | `opencode` or `opencode-go` |
| One stable local API for OpenCode | `cliproxyapi` |
| Multiple Codex accounts behind one endpoint | `cliproxyapi` |
| No need for local proxy or account balancing | `opencode` or `opencode-go` |

## Example mental model

### Direct provider path

```text
OpenCode -> opencode / opencode-go
```

This is simpler when you do not need extra provider orchestration.

### Proxy path

```text
OpenCode -> CLIProxyAPI -> multiple upstream Codex accounts
```

This is stronger when your goal is account pooling, load balancing, or a unified local endpoint.

## Configuration implications

If you use direct providers, your OpenCode provider configuration points to those providers directly.

If you use `cliproxyapi`, your OpenCode config points to one OpenAI-compatible base URL and the proxy handles the upstream complexity.

## Recommendation for this docs set

This docs section keeps `cliproxyapi` as the main walkthrough because that is the setup used in this repository, but you should think of it as a **strategy choice**, not the only valid setup.

## Related pages

- [Configure providers, agents, and models](/docs/opencode/configuration)
- [Install OpenCode and CLIProxyAPI](/docs/opencode/installation)
- [Launch OpenCode and use model variants](/docs/opencode/launch-and-model-reference)
