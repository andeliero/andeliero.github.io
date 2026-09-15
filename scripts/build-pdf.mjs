// Renders index.html to cv.pdf using the print stylesheet.
// The page is the single source of truth: there is no separate PDF layout.
import { writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

const page_url = new URL('../index.html', import.meta.url).href;
const output = new URL('../cv.pdf', import.meta.url);

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });

try {
  const page = await browser.newPage();
  await page.goto(page_url, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await writeFile(output, pdf);
  console.log(`Wrote cv.pdf (${(pdf.length / 1024).toFixed(1)} kB)`);
} finally {
  await browser.close();
}
