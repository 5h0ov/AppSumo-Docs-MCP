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
      description: 'Search the AppSumo licensing documentation for a keyword or phrase',
      inputSchema: {
        type: 'object' as const,
        properties: {
          query: { type: 'string', description: 'Keyword or phrase to search for' },
        },
        required: ['query'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'search_appsumo_docs') {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const query = String(request.params.arguments?.query ?? '');
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
});

const transport = new StdioServerTransport();
await server.connect(transport);
