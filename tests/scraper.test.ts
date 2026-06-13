import { describe, it, expect } from 'vitest';
import { extractLinks } from '../src/scraper.js';

const BASE = 'https://docs.licensing.appsumo.com';

describe('extractLinks', () => {
  it('keeps same-host links and resolves relative hrefs', () => {
    const html = `<a href="/webhooks">a</a><a href="${BASE}/api">b</a>`;
    const links = extractLinks(html, `${BASE}/`);
    expect(links).toContain(`${BASE}/webhooks`);
    expect(links).toContain(`${BASE}/api`);
  });

  it('drops external-host links', () => {
    const html = `<a href="https://example.com/x">ext</a><a href="/keep">keep</a>`;
    const links = extractLinks(html, `${BASE}/`);
    expect(links).toContain(`${BASE}/keep`);
    expect(links.some(l => l.includes('example.com'))).toBe(false);
  });

  it('strips hash and query so the same page is not crawled twice', () => {
    const html = `<a href="/page?ref=nav#section">x</a>`;
    const links = extractLinks(html, `${BASE}/`);
    expect(links).toEqual([`${BASE}/page`]);
  });

  it('deduplicates repeated links', () => {
    const html = `<a href="/dup">1</a><a href="/dup">2</a>`;
    expect(extractLinks(html, `${BASE}/`)).toEqual([`${BASE}/dup`]);
  });

  it('discovers nav links outside the main content area', () => {
    const html = `<nav><a href="/hidden-nav-page">nav</a></nav><main>body</main>`;
    expect(extractLinks(html, `${BASE}/`)).toContain(`${BASE}/hidden-nav-page`);
  });

  it('excludes static asset URLs (css/js/images/fonts/icons)', () => {
    const html = [
      '<a href="/assets/js/app.2db4f0a9.js">js</a>',
      '<a href="/assets/css/0.styles.css">css</a>',
      '<a href="/favicons/favicon.ico">ico</a>',
      '<a href="/favicons/apple-touch-icon.png">png</a>',
      '<a href="/fonts/roboto.woff2">font</a>',
      '<a href="/webhooks">page</a>',
    ].join('');
    expect(extractLinks(html, `${BASE}/`)).toEqual([`${BASE}/webhooks`]);
  });

  it('keeps .html documentation pages', () => {
    const html = `<a href="/api/license.html">doc</a>`;
    expect(extractLinks(html, `${BASE}/`)).toEqual([`${BASE}/api/license.html`]);
  });
});
