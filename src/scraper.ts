import { chromium } from 'playwright';
import TurndownService from 'turndown';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BASE_URL = 'https://docs.licensing.appsumo.com';
const DELAY_MS = 500;
const CONTENT_SELECTORS = ['main', 'article', '[role="main"]', '.content', '.doc-content'];

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

function urlToFilename(url: string): string {
  const pathname = new URL(url).pathname;
  const base = path.basename(pathname, '.html') || 'index';
  return base + '.md';
}

// Static assets that may be linked from the page head/nav but aren't docs pages.
const ASSET_EXTENSIONS =
  /\.(css|js|mjs|map|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|pdf|zip|xml|json|txt|mp4|webm)$/i;

/**
 * Collect the documentation links from a page's HTML: same-host only, with hashes
 * and query strings stripped and static assets excluded. Relative hrefs are resolved
 * against `currentUrl`.
 */
export function extractLinks(html: string, currentUrl: string): string[] {
  const baseHostname = new URL(BASE_URL).hostname;
  const links: string[] = [];
  const hrefRegex = /href="([^"]+)"/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    try {
      const resolved = new URL(match[1], currentUrl);
      if (resolved.hostname !== baseHostname) continue;
      if (ASSET_EXTENSIONS.test(resolved.pathname)) continue;
      resolved.hash = '';
      resolved.search = '';
      links.push(resolved.toString());
    } catch {
      // skip malformed hrefs
    }
  }
  return [...new Set(links)];
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  await fs.mkdir(DOCS_DIR, { recursive: true });
  const existing = await fs.readdir(DOCS_DIR).catch(() => [] as string[]);
  await Promise.all(
    existing.filter(f => f.endsWith('.md')).map(f => fs.unlink(path.join(DOCS_DIR, f)))
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'appsumo-docs-mcp-scraper/1.0 (open-source)',
  });
  const page = await context.newPage();

  const visited = new Set<string>();
  const queue: string[] = [`${BASE_URL}/`];

  while (queue.length > 0) {
    const url = queue.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);

    process.stdout.write(`Scraping: ${url} ... `);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

      const title = await page.title();

      const tabContainers = await page.locator('div.container:has(div.menu)').all();
      for (const container of tabContainers) {
        const buttons = await container.locator('button:not(.copy-btn)').all();
        if (buttons.length === 0) continue;

        const codeBlocks: { lang: string; code: string }[] = [];
        for (const button of buttons) {
          const label = (await button.innerText()).trim();
          await button.click();
          await page.waitForTimeout(150);
          const code = await container.locator('code.code-example').innerText().catch(() => '');
          if (code) codeBlocks.push({ lang: label, code });
        }

        if (codeBlocks.length === 0) continue;

        await container.evaluate((el, blocks: { lang: string; code: string }[]) => {
          const wrapper = document.createElement('div');
          for (const { lang, code } of blocks) {
            const h5 = document.createElement('h5');
            h5.textContent = lang;
            const pre = document.createElement('pre');
            const codeEl = document.createElement('code');
            codeEl.textContent = code;
            pre.appendChild(codeEl);
            wrapper.appendChild(h5);
            wrapper.appendChild(pre);
          }
          el.parentNode?.replaceChild(wrapper, el);
        }, codeBlocks);
      }

      await page.evaluate(() => {
        document.querySelectorAll('img[src^="data:"]').forEach(el => el.remove());
        document.querySelectorAll(
          '.line-numbers-wrapper,.line-number,[class*="line-num"]'
        ).forEach(el => el.remove());

        document.querySelectorAll<HTMLElement>('code').forEach(code => {
          if (!code.closest('pre') && (code.textContent?.length ?? 0) > 50) {
            const pre = document.createElement('pre');
            code.parentNode?.insertBefore(pre, code);
            pre.appendChild(code);
          }
        });
      });

      let contentHtml = '';
      for (const selector of CONTENT_SELECTORS) {
        const html = await page.$eval(selector, el => el.innerHTML).catch(() => '');
        if (html.trim().length > 100) {
          contentHtml = html;
          break;
        }
      }
      if (!contentHtml) {
        contentHtml = await page.$eval('body', el => el.innerHTML).catch(() => '');
      }

      const markdown = turndown.turndown(contentHtml).replace(/!\[[^\]]*\]\(data:image[^)]+\)/g, '');
      const filename = urlToFilename(url);

      await fs.writeFile(
        path.join(DOCS_DIR, filename),
        `# ${title}\n\n${markdown}\n`,
        'utf-8'
      );
      process.stdout.write(`saved → ${filename}\n`);

      // Crawl the whole page (nav/sidebar/footer), so a layout change can't drop pages.
      const pageHtml = await page.content();
      const links = extractLinks(pageHtml, url);
      for (const link of links) {
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      process.stdout.write(`FAILED (${msg})\n`);
    }

    if (queue.length > 0) await sleep(DELAY_MS);
  }

  await browser.close();
  console.log(`\nComplete. Pages scraped: ${visited.size}`);
}

// Only crawl when run directly (npm run scrape), not when imported for tests.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch(err => {
    console.error('Scraper error:', err);
    process.exit(1);
  });
}
