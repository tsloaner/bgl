const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

    await page.goto('http://localhost:5173/books', { waitUntil: 'networkidle0', timeout: 30000 });

    await browser.close();
  } catch (err) {
    console.error("FAIL", err);
  }
})();
