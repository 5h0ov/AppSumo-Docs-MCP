import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildSnippets } from './search.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '..', 'docs');

const server = new Server(
  { name: 'appsumo-docs-mcp', version: '1.0.0' },
  { capabilities: { resources: {}, tools: {} } }
);

async function getDocFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true });
    return entries
      .filter(e => e.isFile() && e.name.endsWith('.md'))
      .map(e => e.name);
  } catch {
    return [];
  }
}

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const files = await getDocFiles();
  return {
    resources: files.map(file => ({
      uri: `docs:///${file}`,
      name: file.replace(/_/g, ' ').replace(/\.md$/, ''),
      mimeType: 'text/markdown',
      description: `AppSumo licensing documentation: ${file}`,
    })),
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const filename = request.params.uri.replace('docs:///', '');
  if (!filename.endsWith('.md') || filename.includes('/') || filename.includes('..')) {
    throw new Error('Invalid resource URI');
  }
  const content = await fs.readFile(path.join(DOCS_DIR, filename), 'utf-8');
  return {
    contents: [{ uri: request.params.uri, mimeType: 'text/markdown', text: content }],
  };
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_appsumo_docs',
      description: 'Search the AppSumo licensing documentation for a keyword or phrase. Use this first — it returns relevant snippets with context across all pages. Prefer this over get_appsumo_doc unless you need the full content of a specific page.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          query: { type: 'string', description: 'Keyword or phrase to search for' },
        },
        required: ['query'],
      },
    },
    {
      name: 'list_appsumo_docs',
      description: 'List all available AppSumo documentation pages. Use this to discover which pages exist before fetching one with get_appsumo_doc.',
      inputSchema: {
        type: 'object' as const,
        properties: {},
        required: [],
      },
    },
    {
      name: 'get_appsumo_doc',
      description: 'Fetch the full content of a specific AppSumo documentation page by filename. Only use this when search_appsumo_docs snippets are insufficient and you need the complete content of a particular page. Use list_appsumo_docs first to find the correct filename.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          filename: { type: 'string', description: 'The filename of the doc page (e.g. webhook_security_appsumo_licensing_api_v2.md). Use list_appsumo_docs to see all available filenames.' },
        },
        required: ['filename'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'search_appsumo_docs') {
    const query = String(args?.query ?? '');
    if (!query.trim()) {
      return { content: [{ type: 'text' as const, text: 'No query provided.' }] };
    }

    const files = await getDocFiles();
    const allResults: string[] = [];

    for (const file of files) {
      if (allResults.length >= 10) break;
      const content = await fs.readFile(path.join(DOCS_DIR, file), 'utf-8');
      const snippets = buildSnippets(content, query);
      for (const snippet of snippets) {
        allResults.push(`--- From ${file} ---\n...${snippet}...`);
      }
    }

    return {
      content: [{
        type: 'text' as const,
        text: allResults.length ? allResults.join('\n\n') : 'No results found.',
      }],
    };
  }

  if (name === 'list_appsumo_docs') {
    const files = await getDocFiles();
    const list = files.map(f => `- ${f}`).join('\n');
    return {
      content: [{ type: 'text' as const, text: list || 'No documentation files found.' }],
    };
  }

  if (name === 'get_appsumo_doc') {
    const filename = String(args?.filename ?? '');
    if (!filename.endsWith('.md') || filename.includes('/') || filename.includes('..')) {
      throw new Error('Invalid filename');
    }
    try {
      const content = await fs.readFile(path.join(DOCS_DIR, filename), 'utf-8');
      return { content: [{ type: 'text' as const, text: content }] };
    } catch {
      throw new Error(`File not found: ${filename}. Use list_appsumo_docs to see available files.`);
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
