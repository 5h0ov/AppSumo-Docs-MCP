import { describe, it, expect } from 'vitest';
import { buildSnippets } from '../src/search.js';

describe('buildSnippets', () => {
  it('returns empty array when query is not found', () => {
    expect(buildSnippets('hello world', 'xyz')).toEqual([]);
  });

  it('returns a snippet containing the matched text', () => {
    const content = 'word '.repeat(40) + 'target ' + 'word '.repeat(40);
    const [result] = buildSnippets(content, 'target');
    expect(result.text).toContain('target');
  });

  it('is case-insensitive', () => {
    const [result] = buildSnippets('Hello World', 'hello');
    expect(result).toBeDefined();
    expect(result.text).toContain('Hello');
  });

  it('caps results at maxResults', () => {
    const content = Array.from({ length: 20 }, (_, i) => `match ${'x'.repeat(400)} ${i}`).join(' ');
    expect(buildSnippets(content, 'match', 5)).toHaveLength(5);
  });

  it('returns a snippet shorter than the full content', () => {
    const content = 'word '.repeat(60) + 'query ' + 'word '.repeat(60);
    const [result] = buildSnippets(content, 'query');
    expect(result.text.length).toBeLessThan(content.length);
  });

  it('collapses internal newlines to spaces', () => {
    const content = 'before\n\nquery\n\nafter';
    const [result] = buildSnippets(content, 'query');
    expect(result.text).not.toMatch(/\n/);
  });

  it('defaults to a max of 3 results', () => {
    const content = Array.from({ length: 15 }, (_, i) => `hit ${'x'.repeat(400)} ${i}`).join(' ');
    expect(buildSnippets(content, 'hit').length).toBeLessThanOrEqual(3);
  });

  it('matches plural when query is singular', () => {
    const content = 'all webhook events are managed by AppSumo';
    const [result] = buildSnippets(content, 'event');
    expect(result).toBeDefined();
    expect(result.text).toContain('events');
  });

  it('matches word stem — activate finds activation', () => {
    const content = 'license activation is required before use';
    const [result] = buildSnippets(content, 'activate');
    expect(result).toBeDefined();
    expect(result.text).toContain('activation');
  });

  it('matches multi-word query across a window', () => {
    const content = 'use the license key to activate your account on the platform';
    const [result] = buildSnippets(content, 'license activate');
    expect(result).toBeDefined();
    expect(result.text).toContain('license');
    expect(result.text).toContain('activate');
  });

  it('matches regardless of query word order', () => {
    const content = 'signature ' + 'filler '.repeat(40) + 'webhook fires';
    const forward = buildSnippets(content, 'webhook signature');
    const reverse = buildSnippets(content, 'signature webhook');
    expect(forward.length).toBeGreaterThan(0);
    expect(reverse.length).toBeGreaterThan(0);
  });

  it('matches a numeric token like a status code', () => {
    const content = 'the API returns a 401 unauthorized response when the token is missing';
    const [result] = buildSnippets(content, '401');
    expect(result).toBeDefined();
    expect(result.text).toContain('401');
  });

  it('matches an alphanumeric token like an API version', () => {
    const content = 'call the licensing API v2 endpoint to verify a license';
    const [result] = buildSnippets(content, 'v2');
    expect(result).toBeDefined();
    expect(result.text).toContain('v2');
  });

  it('scores a snippet by the number of distinct query terms matched', () => {
    const [two] = buildSnippets('the webhook signature is valid', 'webhook signature');
    const [one] = buildSnippets('the webhook fires now', 'webhook');
    expect(two.score).toBe(2);
    expect(one.score).toBe(1);
  });

  it('highlights matched terms in bold', () => {
    const [result] = buildSnippets('license activation is required', 'activation');
    expect(result.text).toContain('**activation**');
  });

  it('highlights the stemmed surface form, not the query word', () => {
    const [result] = buildSnippets('license activation is required', 'activate');
    expect(result.text).toContain('**activation**');
  });
});
