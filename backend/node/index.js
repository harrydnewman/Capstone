const { chromium } = require('playwright-extra');
const Captcha = require('2captcha');
const randomUseragent = require('random-useragent');
require('dotenv').config()
// THIS DOES NOT WORK


// Solve Cloudflare Turnstile using 2Captcha
const solver = new Captcha.Solver(process.env.TWOCAPTCHAKEY);

async function solveTurnstile(page) {
    console.log("Solving Cloudflare Turnstile...");

    const siteKey = await page.evaluate(() => {
        const turnstile = document.querySelector('.cf-turnstile');
        return turnstile ? turnstile.getAttribute('data-sitekey') : null;
    });

    if (!siteKey) {
        console.log("No Turnstile Captcha found.");
        return;
    }

    console.log("Turnstile site key:", siteKey);
    const response = await solver.turnstile(siteKey, 'https://www.pimeyes.com/en');

    await page.evaluate((token) => {
        document.querySelector('textarea[name="cf-turnstile-response"]').value = token;
    }, response.data);

    console.log("Cloudflare Turnstile solved!");

    await page.evaluate(() => {
        document.querySelector('form').submit(); // Submit the solved CAPTCHA
    });
}

(async () => {
    const userAgent = randomUseragent.getRandom();
    const browser = await chromium.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-gpu',
            '--disable-infobars',
            '--window-size=1280,720'
        ]
    });

    const context = await browser.newContext({ userAgent });
    const page = await context.newPage();

    await page.goto('https://www.pimeyes.com/en', { waitUntil: 'domcontentloaded' });

    console.log("PimEyes loaded!");

    await solveTurnstile(page);  // 🔥 Solve Turnstile CAPTCHA
    await page.waitForTimeout(3000); // Simulate human-like delay

    await page.click('[aria-label="Upload photo"]'); // Click AFTER solving

    console.log("Cloudflare Turnstile bypassed!");

    // Keep the browser open for debugging
    // await browser.close();
})();
