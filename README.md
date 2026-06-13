# appsumo-docs-mcp

An MCP server that gives your AI assistant (Claude, Cursor, and others) the full [AppSumo licensing docs](https://docs.licensing.appsumo.com) — so it can answer your questions and help you build against the licensing API without you digging through the docs yourself. The pages are refreshed every week and bundled right in, so there's nothing to set up.

Everything works straight from the bundled docs — no API key, no account, and no internet needed once it's installed.

> **Note:** This is an unofficial, community-built tool and is not affiliated with or endorsed by AppSumo. For the most accurate and up-to-date information, refer to the [official documentation](https://docs.licensing.appsumo.com).

## Usage

**Claude Code** — run:

```bash
claude mcp add --transport stdio appsumo-docs -- npx -y appsumo-docs-mcp
```

Or add manually to `~/.claude.json`:

```json
{
  "mcpServers": {
    "appsumo-docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "appsumo-docs-mcp"]
    }
  }
}
```

**Claude Desktop** — edit your config file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json` (e.g. `C:\Users\YOUR_USERNAME\AppData\Roaming\Claude\claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "appsumo-docs": {
      "command": "npx",
      "args": ["-y", "appsumo-docs-mcp"]
    }
  }
}
```

**Cursor** — add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "appsumo-docs": {
      "command": "npx",
      "args": ["-y", "appsumo-docs-mcp"]
    }
  }
}
```

**Antigravity** — add to `~/.gemini/config/mcp_config.json`:

```json
{
  "mcpServers": {
    "appsumo-docs": {
      "command": "npx",
      "args": ["-y", "appsumo-docs-mcp"]
    }
  }
}
```

**OpenCode** — add to `opencode.json` in your project root:

```json
{
  "mcp": {
    "appsumo-docs": {
      "type": "local",
      "command": ["npx", "-y", "appsumo-docs-mcp"]
    }
  }
}
```

## What's included

- **All the docs** — every AppSumo licensing page is bundled in, ready to read.
- **Search** (`search_appsumo_docs`) — ask a question or type a few words and get back the most relevant passages, with your words highlighted. It's forgiving about wording (e.g. "activate" also finds "activation").
- **List** (`list_appsumo_docs`) — see all the pages that are available.
- **Read** (`get_appsumo_doc`) — open a full page when you want all the details.

## Development

```bash
git clone https://github.com/5h0ov/appsumo-docs-mcp
cd appsumo-docs-mcp
npm install

npm run scrape    # pull latest docs into docs/*.md
npm run build     # compile src/ → dist/
npm start         # run the MCP server locally
npm test          # run tests
```

Docs can also be refreshed manually:

```bash
npm run scrape
git add docs/
git commit -m "chore: update docs"
git push
```

GitHub Actions runs this every Sunday and publishes a new patch version if anything changed.

## License

[MIT](./LICENSE)
