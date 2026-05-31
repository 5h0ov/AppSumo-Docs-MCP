import { stemmer } from 'stemmer';

interface Token {
  start: number;
  stem: string;
}

function tokenize(content: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\b[a-zA-Z]{2,}\b/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens.push({ start: match.index, stem: stemmer(match[0].toLowerCase()) });
  }
  return tokens;
}

export function buildSnippets(
  content: string,
  query: string,
  maxResults = 3
): string[] {
  const queryWords = query.toLowerCase().trim().split(/\s+/).filter(w => w.length > 1);
  if (queryWords.length === 0) return [];

  const queryStems = queryWords.map(w => stemmer(w));
  const tokens = tokenize(content);

  // Map each stem to the sorted list of positions where it appears
  const stemPositions = new Map<string, number[]>();
  for (const { start, stem } of tokens) {
    const list = stemPositions.get(stem);
    if (list) list.push(start);
    else stemPositions.set(stem, [start]);
  }

  const snippets: string[] = [];
  const usedPositions: number[] = [];

  const anchors = stemPositions.get(queryStems[0]) ?? [];

  for (const anchor of anchors) {
    if (snippets.length >= maxResults) break;
    if (usedPositions.some(p => Math.abs(p - anchor) < 350)) continue;

    const allPresent = queryStems.every(stem => {
      const positions = stemPositions.get(stem) ?? [];
      return positions.some(p => p >= anchor - 50 && p <= anchor + 500);
    });

    if (allPresent) {
      const start = Math.max(0, anchor - 150);
      const end = Math.min(content.length, anchor + 500);
      usedPositions.push(anchor);
      snippets.push(content.slice(start, end).replace(/\n+/g, ' '));
    }
  }

  return snippets;
}
