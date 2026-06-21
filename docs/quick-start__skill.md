# Set up licensing with AI | AppSumo Licensing API (v2)

# [#](#set-up-licensing-with-ai) Set up licensing with AI

Drop this skill into Claude Code (or any agentic AI) and it'll wire up your webhook handler, OAuth flow, and license-key storage — trained on the AppSumo Licensing API.

[Download skill (.zip)](/appsumo-licensing-partner-guide.zip)

* * *

## [#](#what-it-handles) What it handles

*   **Webhook handler** — processes all AppSumo license events (purchase, activate, upgrade, downgrade, deactivate)
*   **OAuth flow** — token exchange, license key retrieval, and new vs. returning user logic
*   **Key storage** — guides you to store and expose license keys for your support team
*   **Test scaffolds** — local test server + validation against the Partner Portal

* * *

## [#](#how-to-install) How to install

Download the zip above and unzip it. Then follow the steps for your AI tool:

### [#](#claude-code) Claude Code

Move the `appsumo-licensing-partner-guide` folder into your skills directory:

```
~/.claude/skills/
```

[Claude Code skills docs → (opens new window)](https://code.claude.com/docs/en/skills)

### [#](#cursor) Cursor

Copy the contents of `SKILL.md` into a new file at `.cursor/rules/appsumo-licensing.mdc` in your project. Upload the `references/` files as additional context. [Cursor rules docs → (opens new window)](https://cursor.com/docs/rules)

### [#](#chatgpt) ChatGPT

Create a custom GPT, paste the contents of `SKILL.md` into the instructions field, and upload the `references/` files as knowledge files. [Custom GPT docs → (opens new window)](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts)

### [#](#claude-ai) Claude.ai

Open a Project, paste the contents of `SKILL.md` into the project instructions, and upload the `references/` files as project knowledge. [Claude Projects docs → (opens new window)](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

* * *

## [#](#how-to-use-it) How to use it

Once installed, describe what you need in plain language:

> _"I need to add AppSumo licensing to my app"_

> _"Help me handle the webhook events"_

> _"My OAuth redirect is returning a 403"_

The assistant will read your existing code, write what's needed, and help you verify everything works before going live.

← [Overview](/quick-start/quick-start__overview.html) [Overview](/licensing/licensing__overview.html) →
