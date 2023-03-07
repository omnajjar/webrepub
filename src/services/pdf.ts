import puppeteer from 'puppeteer';

export async function createPDF(resourceURL: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  await page.goto(resourceURL, { waitUntil: 'networkidle2' });

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  return pdf;
}
