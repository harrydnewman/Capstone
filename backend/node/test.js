const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    // Set a realistic User-Agent
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Remove Playwright-like fingerprints
    await page.evaluateOnNewDocument(() => {
        delete window.__playwright;
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    // Go to PimEyes
    await page.goto('https://pimeyes.com/en', { waitUntil: 'domcontentloaded' });

    console.log("Page Title:", await page.title());

    // Try clicking the cookie consent button
    try {
        await page.waitForSelector("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll", { timeout: 5000 });
        await page.click("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
        console.log("Clicked the 'Allow All' button!");
    } catch {
        console.log("Cookie consent button not found.");
    }

    await new Promise(resolve => setTimeout(resolve, 1000000)); // Sleep 10 sec before closing
    await browser.close();
})();
