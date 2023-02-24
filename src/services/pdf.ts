import puppeteer from 'puppeteer';

export async function createPDF(resourceURL: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(resourceURL, { waitUntil: 'networkidle0' });
  await page.waitForNetworkIdle();

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    scale: 0.85,
    omitBackground: true,
  });

  await browser.close();
  return pdf;
}
