---
title: Tutorial - Image to Code Workflow
sidebar_position: 11
---

# Tutorial - Image to Code Workflow

This page covers an image-to-code workflow: let OpenCode inspect a design image, then turn that into structured implementation work.

## When to use this workflow

Use it when you have:

- a screenshot of a UI
- a local mockup
- a design reference from Figma or another source
- a page you want to recreate with OpenCode assistance

## Suggested workflow

1. Save the image locally in your project or accessible path
2. Open OpenCode
3. Attach or reference the image with the multimodal-capable workflow you use
4. Tell the agent what stack to target
5. Ask for structure first, then implementation

## Good prompt shape

```text
Analyze this design image and break it into layout, components, spacing, colors, and interaction states.
Target stack: Next.js App Router, TypeScript, Tailwind CSS.
First produce an implementation plan, then generate code.
```

## Best practice

Do not jump straight to giant generated code if the UI is complex. A better sequence is:

1. ask for design analysis
2. ask for component breakdown
3. ask for implementation plan
4. implement one section at a time

## Why this matters

This reduces hallucinated structure and makes the output closer to a real design workflow instead of a one-shot guess.

## Related pages

- [Use planner strategy to save tokens](/docs/opencode/planner-strategy)
- [Create custom local skills](/docs/opencode/skills-integration)
- [Set up workflows, MCP tools, and project rules](/docs/opencode/workflow-and-tools)
