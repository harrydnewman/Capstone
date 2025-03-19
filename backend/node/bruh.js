const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const randomUseragent = require('random-useragent');
const GhostCursor = require('ghost-cursor');
const clipboardy = require('clipboardy');
const fs = require('fs');
const path = require('path');
const robot = require('robotjs');
const { execSync } = require('child_process');
const axios = require('axios');
require('dotenv').config();

// Use Puppeteer stealth plugins to avoid detection
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// Your 2Captcha API Key
const API_KEY = process.env.TWOCAPTCHAKEY;

(async () => {
    // Define the absolute path of the image file
    const imagePath = path.resolve('/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/node/facetest.png');

    // Copy the image to clipboard (OS-specific)
    try {
        if (process.platform === "darwin") { // MacOS
            execSync(`osascript -e 'set the clipboard to (read (POSIX file "${imagePath}") as JPEG picture)'`);
        } else if (process.platform === "linux") { // Linux
            execSync(`xclip -selection clipboard -t image/png -i "${imagePath}"`);
        } else if (process.platform === "win32") { // Windows
            execSync(`powershell.exe -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('${imagePath}'))"`);
        }
        console.log("Image copied to clipboard.");
    } catch (error) {
        console.error("Error copying image to clipboard:", error);
        return;
    }

    // Launch Puppeteer with anti-detection settings
    const browser = await puppeteer.launch({ headless: false, args: [
        '--incognito',
        '--disable-webgl',
    '--disable-webrtc'
    ] });
    const page = await browser.newPage();

   

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: [
    //         '--no-sandbox',
    //         '--disable-setuid-sandbox',
    //         '--disable-blink-features=AutomationControlled',
    //         '--disable-dev-shm-usage',
    //         '--disable-extensions',
    //         '--disable-gpu',
    //         '--disable-infobars'
    //     ],
    //     defaultViewport: null
    // });

   

    // Set a random User-Agent
    const userAgent = randomUseragent.getRandom();
    await page.setUserAgent(userAgent);

    try {
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        console.log("✅ Cleared localStorage and sessionStorage.");
    } catch (error) {
        console.error("⚠️ Failed to clear storage:", error);
    }

    // Also delete cookies
    await page.deleteCookie(...(await page.cookies()));
    console.log("✅ Cleared cookies.");

    // Use Ghost Cursor for human-like interactions
    const cursor = GhostCursor.createCursor(page);

    // Visit Pimeyes
    await page.goto('https://www.pimeyes.com/en', { waitUntil: 'domcontentloaded' });

     // Accept cookies if prompted
     try {
        await page.waitForSelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection', { visible: true, timeout: 5000 });
        await cursor.click('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection');
        console.log("Accepted cookies.");
    } catch (error) {
        console.log("No cookie prompt found.");
    }

    // Wait for the 'Upload Photo' button to appear
    await page.waitForSelector('[aria-label="Upload photo"]', { visible: true });

    // Move the cursor to the button before clicking
    await cursor.move('[aria-label="Upload photo"]');
    await new Promise(resolve => setTimeout(resolve, Math.floor(500 + Math.random() * 1000)));

    await cursor.click('[aria-label="Upload photo"]');
    console.log("Upload Photo button clicked!");

     // Wait for the upload area to appear
     await page.waitForSelector('[class="dropzone-blue dropzone"]', { visible: true });

     console.log("Dropzone is visible, pasting image...");
 
     await new Promise(resolve => setTimeout(resolve, Math.floor(500 + Math.random() * 1000)));
 
     // Simulate paste using robotjs
     await page.bringToFront();
     await new Promise(resolve => setTimeout(resolve, 1000));
     robot.keyTap("v", process.platform === "darwin" ? "command" : "control");
     console.log("Image pasted!");

    // Detect when Turnstile runs automatically and extract site key
    const siteKey = await page.evaluate(() => {
        const originalRender = window.turnstile.render;
        let detectedKey = null;

        window.turnstile.render = function (container, options) {
            console.log("Turnstile Auto-Triggered at:", new Date().toISOString());
            console.log("Site Key:", options.sitekey);
            detectedKey = options.sitekey; // Store site key
            return originalRender(container, options);
        };

        return new Promise(resolve => {
            setTimeout(() => resolve(detectedKey), 5000); // Wait for site key to be detected
        });
    });

    if (!siteKey) {
        console.error("Failed to detect Turnstile site key.");
        await browser.close();
        return;
    }
    console.log("Turnstile Site Key Found:", siteKey);

    // Solve the Turnstile CAPTCHA
    async function solveTurnstile() {
        const response = await axios.post('https://api.2captcha.com/createTask', {
            clientKey: API_KEY,
            task: {
                type: "TurnstileTaskProxyless",
                websiteURL: "https://pimeyes.com/en",
                websiteKey: siteKey
            }
        });
        if (response.data.status !== 1) {
            console.error("Error requesting CAPTCHA solving:", response.data);
            return null;
        }

        let requestId = response.data.request;
        console.log("CAPTCHA solving started, waiting...");

        // Wait and poll for the solved CAPTCHA token
        await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 sec

        for (let i = 0; i < 10; i++) {
            let result = await axios.get(`http://2captcha.com/res.php?key=${API_KEY}&action=get&id=${requestId}&json=1`);
            if (result.data.status === 1) {
                console.log("CAPTCHA solved:", result.data.request);
                return result.data.request;
            }
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait another 5 sec
        }

        console.error("Failed to solve CAPTCHA.");
        return null;
    }

    // Get the solved token
    const solvedToken = await solveTurnstile();
    if (!solvedToken) {
        console.error("Could not solve Turnstile CAPTCHA.");
        // await browser.close();
        return;
    }

    // Inject the solved CAPTCHA token
    await page.evaluate((token) => {
        const turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
        if (turnstileInput) {
            turnstileInput.value = token;
            console.log("Injected CAPTCHA token!");
        }
    }, solvedToken);

    console.log("CAPTCHA solved and injected!");

   

   

    // Close the browser after upload (optional)
    await new Promise(resolve => setTimeout(resolve, 10000)); // Keep open for debugging
    // await browser.close();
})();
