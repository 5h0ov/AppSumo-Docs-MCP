import { describe, it, expect } from 'vitest';
import { buildSnippets } from '../src/search.js';

describe('buildSnippets', () => {
  it('returns empty array when query is not found', () => {
    expect(buildSnippets('hello world', 'xyz')).toEqual([]);
  });

  it('returns a snippet containing the matched text', () => {
    const content = 'a'.repeat(200) + 'TARGET' + 'b'.repeat(200);
    const [snippet] = buildSnippets(content, 'TARGET');
    expect(snippet).toContain('TARGET');
  });

  it('is case-insensitive', () => {
    const [snippet] = buildSnippets('Hello World', 'hello');
    expect(snippet).toBeDefined();
    expect(snippet).toContain('Hello');
  });

  it('caps results at maxResults', () => {
    const content = Array.from({ length: 20 }, () => 'MATCH foo').join(' ');
    expect(buildSnippets(content, 'MATCH', 5)).toHaveLength(5);
  });

  it('returns a snippet shorter than the full content', () => {
    const content = 'x'.repeat(300) + 'QUERY' + 'y'.repeat(300);
    const [snippet] = buildSnippets(content, 'QUERY');
    expect(snippet.length).toBeLessThan(content.length);
  });

  it('collapses internal newlines to spaces', () => {
    const content = 'before\n\nQUERY\n\nafter';
    const [snippet] = buildSnippets(content, 'QUERY');
    expect(snippet).not.toMatch(/\n/);
  });

  it('defaults to a max of 10 results', () => {
    const content = Array.from({ length: 15 }, () => 'HIT x').join(' ');
    expect(buildSnippets(content, 'HIT').length).toBeLessThanOrEqual(10);
  });
});
