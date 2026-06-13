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

/** Read the package version so the server reports its real release number. */
async function getVersion(): Promise<string> {
  try {
    const pkg = await fs.readFile(path.join(__dirname, '..', 'package.json'), 'utf-8');
    return JSON.parse(pkg).version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

const server = new Server(
  { name: 'appsumo-docs-mcp', version: await getVersion() },
  { capabilities: { resources: {}, tools: {} } }
);

let cachedFiles: string[] | null = null;

/** List the bundled doc filenames, cached after the first read. */
async function getDocFiles(): Promise<string[]> {
  if (cachedFiles) return cachedFiles;
  try {
    const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true });
    cachedFiles = entries
      .filter(e => e.isFile() && e.name.endsWith('.md'))
      .map(e => e.name);
    return cachedFiles;
  } catch {
    return [];
  }
}

/** Read a doc's title from its first heading line, falling back to the filename. */
async function getDocTitle(filename: string): Promise<string> {
  try {
    const fd = await fs.open(path.join(DOCS_DIR, filename), 'r');
    const buf = Buffer.alloc(200);
    await fd.read(buf, 0, 200, 0);
    await fd.close();
    const firstLine = buf.toString('utf-8').split('\n')[0].replace(/^#\s*/, '').trim();
    return firstLine || filename;
  } catch {
    return filename;
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
    const matches: { file: string; text: string; score: number }[] = [];

    for (const file of files) {
      const content = await fs.readFile(path.join(DOCS_DIR, file), 'utf-8');
      for (const { text, score } of buildSnippets(content, query)) {
        matches.push({ file, text, score });
      }
    }

    // Rank the densest matches across all pages first, then keep the top 10.
    matches.sort((a, b) => b.score - a.score);
    const top = matches.slice(0, 10);

    const formatted = await Promise.all(
      top.map(async ({ file, text }) => {
        const title = await getDocTitle(file);
        return `### ${title} (\`${file}\`)\n...${text}...`;
      })
    );

    return {
      content: [{
        type: 'text' as const,
        text: formatted.length ? formatted.join('\n\n') : 'No results found.',
      }],
    };
  }

  if (name === 'list_appsumo_docs') {
    const files = await getDocFiles();
    const lines = await Promise.all(files.map(async f => {
      const title = await getDocTitle(f);
      return `- ${title} → \`${f}\``;
    }));
    return {
      content: [{ type: 'text' as const, text: lines.join('\n') || 'No documentation files found.' }],
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
