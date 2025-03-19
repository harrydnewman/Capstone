const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.pimeyes.com', { waitUntil: 'networkidle2' });

    // Hook into Turnstile's render function to extract the site key
    await page.evaluate(() => {
        const originalRender = window.turnstile.render;
        window.turnstile.render = function (container, options) {
            console.log("Turnstile Site Key Found:", options.sitekey);
            window.siteKeyExtracted = options.sitekey; // Store it in the page context
            return originalRender(container, options);
        };
    });

    // Wait for Turnstile to be initialized
    await page.waitForFunction(() => window.siteKeyExtracted !== undefined, { timeout: 10000 });

    // Retrieve the extracted site key
    const siteKey = await page.evaluate(() => window.siteKeyExtracted);
    console.log("Cloudflare Turnstile Site Key:", siteKey);

    await browser.close();
})();
