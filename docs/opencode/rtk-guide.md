---
title: Use RTK to Reduce Token Usage
sidebar_position: 12
---

# Use RTK to Reduce Token Usage

[`rtk-ai/rtk`](https://github.com/rtk-ai/rtk) is a Rust CLI proxy that compresses common command outputs before they are sent to your coding agent context.

In practical OpenCode sessions, this can reduce prompt/context token usage significantly on repetitive commands like `git status`, `git diff`, `ls`, `grep`, test runners, and build logs.

## What RTK does in OpenCode

RTK can integrate with OpenCode through an OpenCode plugin hook and rewrite Bash commands to `rtk ...` equivalents automatically.

Examples:

- `git status` → `rtk git status`
- `git diff` → `rtk git diff`
- `ls` → `rtk ls`
- `rg pattern .` → `rtk grep pattern .`

That means you keep the same command habits while sending denser, less noisy output to the model.

## Install RTK

Choose one method.

### Homebrew (recommended on macOS)

```bash
brew install rtk
```

### Script install (Linux/macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh
```

### Verify installation

```bash
rtk --version
rtk gain
```

:::warning Name collision on Cargo
Another crates.io package is also named `rtk`. If you use Cargo and install the wrong one, RTK commands such as `rtk gain` will fail.

Use the upstream Git install command from the RTK docs when installing via Cargo.
:::

## Set up RTK in OpenCode

Install the global OpenCode plugin:

```bash
rtk init -g --opencode
```

This creates:

- `~/.config/opencode/plugins/rtk.ts`

Then restart OpenCode.

## Validate that OpenCode hook is active

After restart, run a few normal commands in OpenCode:

```bash
git status
git diff
ls
```

If RTK is hooked correctly, these commands are rewritten internally and produce compact summaries.

Use these checks as well:

```bash
rtk init --show
rtk gain --history
```

## Important limitation

The OpenCode plugin hook applies to Bash tool execution only. Built-in non-Bash tools (for example native file readers/searchers) are not rewritten by this hook.

If you want RTK compaction for those workflows, use shell commands or explicit RTK commands such as:

- `rtk read <file>`
- `rtk grep <pattern> <path>`
- `rtk find "*.ts" .`

## Optional tuning

RTK supports config tuning in `~/.config/rtk/config.toml` (or macOS app support path), including:

- rewrite exclusions (`hooks.exclude_commands`)
- tee/full-output capture behavior for failures
- tracking database location

This is useful if you want RTK in most places but need raw output for specific commands.

## When to use RTK in this docs stack

RTK is most useful when you frequently run command-heavy coding sessions and want to reduce token burn without changing your normal terminal habits.

If your sessions are mostly short or rely heavily on OpenCode built-in non-Bash tools, the impact will be smaller.

## References

- RTK repository: [https://github.com/rtk-ai/rtk](https://github.com/rtk-ai/rtk)
- RTK install docs: [https://github.com/rtk-ai/rtk/blob/master/INSTALL.md](https://github.com/rtk-ai/rtk/blob/master/INSTALL.md)
- OpenCode plugin docs: [https://open-code.ai/en/docs/plugins](https://open-code.ai/en/docs/plugins)
