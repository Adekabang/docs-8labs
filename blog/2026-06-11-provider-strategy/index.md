---
title: "Provider Strategy"
authors: [Adekabang]
tags: [opencode, agent, workflow, guide]
date: 2026-06-10
---

     1|---
     2|title: Choose Between opencode, opencode-go, and cliproxyapi
     3|sidebar_position: 4
     4|---
     5|
     6|# Choose Between opencode, opencode-go, and cliproxyapi
     7|
     8|OpenCode does not have to run through only one provider path. In practice, you can use:
     9|
    10|- `opencode`
    11|- `opencode-go`
    12|- `cliproxyapi`
    13|
    14|The best choice depends on what problem you are trying to solve.
    15|
    16|## The short version
    17|
    18|### Use `opencode` when
    19|
    20|- you want a straightforward provider path
    21|- the models you need are already available there
    22|- you do not need your own proxy layer in front of Codex accounts
    23|
    24|### Use `opencode-go` when
    25|
    26|- you want another direct provider path with different model availability or routing behavior
    27|- your preferred models are exposed there
    28|- you do not need account aggregation behind one local endpoint
    29|
    30|### Use `cliproxyapi` when
    31|
    32|- you want a single local OpenAI-compatible endpoint
    33|- you want to put **multiple Codex accounts** behind that endpoint
    34|- you want request routing or load balancing across those accounts
    35|- you want OpenCode to talk to one provider while the proxy handles upstream account switching
    36|
    37|## Why `cliproxyapi` exists in this setup
    38|
    39|In this repository, the main value of `cliproxyapi` is **not** just “another provider config.”
    40|
    41|Its real value is:
    42|
    43|1. collect several Codex-capable upstream accounts behind one local API
    44|2. expose them through one endpoint such as `http://localhost:8317/v1`
    45|3. let the proxy handle retry, routing, and account distribution
    46|4. keep OpenCode pointed at one stable provider definition
    47|
    48|That makes it easier to:
    49|
    50|- rotate between accounts
    51|- reduce friction when one account is rate-limited or exhausted
    52|- centralize configuration in one place
    53|
    54|## Practical decision table
    55|
    56|| Goal | Best choice |
    57||---|---|
    58|| Simple direct provider setup | `opencode` or `opencode-go` |
    59|| One stable local API for OpenCode | `cliproxyapi` |
    60|| Multiple Codex accounts behind one endpoint | `cliproxyapi` |
    61|| No need for local proxy or account balancing | `opencode` or `opencode-go` |
    62|
    63|## Example mental model
    64|
    65|### Direct provider path
    66|
    67|```text
    68|OpenCode -> opencode / opencode-go
    69|```
    70|
    71|This is simpler when you do not need extra provider orchestration.
    72|
    73|### Proxy path
    74|
    75|```text
    76|OpenCode -> CLIProxyAPI -> multiple upstream Codex accounts
    77|```
    78|
    79|This is stronger when your goal is account pooling, load balancing, or a unified local endpoint.
    80|
    81|## Configuration implications
    82|
    83|If you use direct providers, your OpenCode provider configuration points to those providers directly.
    84|
    85|If you use `cliproxyapi`, your OpenCode config points to one OpenAI-compatible base URL and the proxy handles the upstream complexity.
    86|
    87|## Recommendation for this docs set
    88|
    89|This docs section keeps `cliproxyapi` as the main walkthrough because that is the setup used in this repository, but you should think of it as a **strategy choice**, not the only valid setup.
    90|
    91|## Related pages
    92|
    93|- [Configure providers, agents, and models](/guides/opencode/configuration)
    94|- [Install OpenCode and CLIProxyAPI](/guides/opencode/installation)
    95|- [Launch OpenCode and use model variants](/guides/opencode/launch-and-model-reference)
    96|
