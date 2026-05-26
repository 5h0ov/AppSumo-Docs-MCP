# appsumo-docs-mcp

MCP server for the [AppSumo licensing docs](https://docs.licensing.appsumo.com). Exposes all documentation pages as resources and a keyword search tool. Docs are scraped weekly and bundled into each npm release so there's nothing to configure.

## Usage

**Claude Desktop** — edit `claude_desktop_config.json`:

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

- **Resources** — all documentation pages, accessible as `docs:///filename.md`
- **Tool: `search_appsumo_docs`** — keyword search across all docs with surrounding context

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
