import { stemmer } from 'stemmer';

interface Token {
  start: number;
  stem: string;
}

// Match alphanumeric runs so v2, 401, and OAuth2 are searchable, not just words.
const TOKEN_REGEX = /\b[a-zA-Z0-9]{2,}\b/g;

/** Split text into words, recording each word's position and its stem. */
function tokenize(content: string): Token[] {
  const tokens: Token[] = [];
  let match;
  while ((match = TOKEN_REGEX.exec(content)) !== null) {
    tokens.push({ start: match.index, stem: stemmer(match[0].toLowerCase()) });
  }
  return tokens;
}

/** Wrap every word whose stem matches a query term in `**bold**`. */
function highlight(text: string, queryStems: Set<string>): string {
  return text.replace(TOKEN_REGEX, word =>
    queryStems.has(stemmer(word.toLowerCase())) ? `**${word}**` : word
  );
}

export interface Snippet {
  /** The passage text, with matched terms wrapped in `**bold**`. */
  text: string;
  /** Relevance score: how many query-term occurrences cluster in the passage. */
  score: number;
}

/**
 * Find the passages in `content` most relevant to `query`.
 *
 * Matching is stem-based (so "activate" finds "activation") and independent of word
 * order; a passage must contain every query term within a short window. Each passage is
 * scored by how densely the terms cluster, and matched words are highlighted.
 *
 * @param content    The document text to search.
 * @param query      One or more space-separated keywords.
 * @param maxResults Maximum number of passages to return (default 3).
 */
export function buildSnippets(
  content: string,
  query: string,
  maxResults = 3
): Snippet[] {
  const queryWords = query.toLowerCase().trim().split(/\s+/).filter(w => w.length > 1);
  if (queryWords.length === 0) return [];

  const queryStems = queryWords.map(w => stemmer(w));
  const tokens = tokenize(content);

  const stemPositions = new Map<string, number[]>();
  for (const { start, stem } of tokens) {
    const list = stemPositions.get(stem);
    if (list) list.push(start);
    else stemPositions.set(stem, [start]);
  }

  const snippets: Snippet[] = [];
  const usedPositions: number[] = [];

  // Anchor on the rarest query term — the most selective place to look.
  const uniqueStems = [...new Set(queryStems)];
  const stemSet = new Set(uniqueStems);
  const anchorStem = uniqueStems.reduce((rarest, stem) =>
    (stemPositions.get(stem)?.length ?? 0) < (stemPositions.get(rarest)?.length ?? 0)
      ? stem
      : rarest
  );
  const anchors = stemPositions.get(anchorStem) ?? [];

  const RADIUS = 400; // symmetric window, so query word order doesn't matter

  for (const anchor of anchors) {
    if (snippets.length >= maxResults) break;
    if (usedPositions.some(p => Math.abs(p - anchor) < 350)) continue;

    const inWindow = (p: number) => p >= anchor - RADIUS && p <= anchor + RADIUS;
    const allPresent = uniqueStems.every(stem =>
      (stemPositions.get(stem) ?? []).some(inWindow)
    );

    if (allPresent) {
      const score = uniqueStems.reduce(
        (sum, stem) => sum + (stemPositions.get(stem) ?? []).filter(inWindow).length,
        0
      );
      const start = Math.max(0, anchor - 150);
      const end = Math.min(content.length, anchor + 500);
      usedPositions.push(anchor);
      const text = highlight(content.slice(start, end).replace(/\n+/g, ' '), stemSet);
      snippets.push({ text, score });
    }
  }

  return snippets;
}
