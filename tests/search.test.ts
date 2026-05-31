import { describe, it, expect } from 'vitest';
import { buildSnippets } from '../src/search.js';

describe('buildSnippets', () => {
  it('returns empty array when query is not found', () => {
    expect(buildSnippets('hello world', 'xyz')).toEqual([]);
  });

  it('returns a snippet containing the matched text', () => {
    const content = 'word '.repeat(40) + 'target ' + 'word '.repeat(40);
    const [snippet] = buildSnippets(content, 'target');
    expect(snippet).toContain('target');
  });

  it('is case-insensitive', () => {
    const [snippet] = buildSnippets('Hello World', 'hello');
    expect(snippet).toBeDefined();
    expect(snippet).toContain('Hello');
  });

  it('caps results at maxResults', () => {
    const content = Array.from({ length: 20 }, (_, i) => `match ${'x'.repeat(400)} ${i}`).join(' ');
    expect(buildSnippets(content, 'match', 5)).toHaveLength(5);
  });

  it('returns a snippet shorter than the full content', () => {
    const content = 'word '.repeat(60) + 'query ' + 'word '.repeat(60);
    const [snippet] = buildSnippets(content, 'query');
    expect(snippet.length).toBeLessThan(content.length);
  });

  it('collapses internal newlines to spaces', () => {
    const content = 'before\n\nquery\n\nafter';
    const [snippet] = buildSnippets(content, 'query');
    expect(snippet).not.toMatch(/\n/);
  });

  it('defaults to a max of 3 results', () => {
    const content = Array.from({ length: 15 }, (_, i) => `hit ${'x'.repeat(400)} ${i}`).join(' ');
    expect(buildSnippets(content, 'hit').length).toBeLessThanOrEqual(3);
  });

  it('matches plural when query is singular', () => {
    const content = 'all webhook events are managed by AppSumo';
    const [snippet] = buildSnippets(content, 'event');
    expect(snippet).toBeDefined();
    expect(snippet).toContain('events');
  });

  it('matches word stem — activate finds activation', () => {
    const content = 'license activation is required before use';
    const [snippet] = buildSnippets(content, 'activate');
    expect(snippet).toBeDefined();
    expect(snippet).toContain('activation');
  });

  it('matches multi-word query across a window', () => {
    const content = 'use the license key to activate your account on the platform';
    const [snippet] = buildSnippets(content, 'license activate');
    expect(snippet).toBeDefined();
    expect(snippet).toContain('license');
    expect(snippet).toContain('activate');
  });
});
