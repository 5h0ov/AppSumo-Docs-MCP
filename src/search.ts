export function buildSnippets(
  content: string,
  query: string,
  maxResults = 10
): string[] {
  const lower = content.toLowerCase();
  const q = query.toLowerCase();
  const snippets: string[] = [];
  let idx = lower.indexOf(q);

  while (idx !== -1 && snippets.length < maxResults) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(content.length, idx + q.length + 200);
    const snippet = content.slice(start, end).replace(/\n+/g, ' ');
    snippets.push(snippet);
    idx = lower.indexOf(q, idx + q.length);
  }

  return snippets;
}
