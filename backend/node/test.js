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

// Use Puppeteer stealth plugins to avoid detection
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

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

    // Launch the browser with bot evasion settings
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-gpu',
            '--disable-infobars'
        ],
        defaultViewport: null
    });

    const page = await browser.newPage();

    // Set a random User-Agent
    const userAgent = randomUseragent.getRandom();
    await page.setUserAgent(userAgent);

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
    await new Promise(resolve => setTimeout(resolve, Math.floor(500 + Math.random() * 100)));

    await cursor.click('[aria-label="Upload photo"]');

    console.log("Upload Photo button clicked!");


    // Wait for the upload area to appear
    await page.waitForSelector('[class="dropzone-blue dropzone"]', { visible: true });

    console.log("Dropzone is visible, pasting image...");

    await new Promise(resolve => setTimeout(resolve, Math.floor(500 + Math.random() * 1000)));

    // Simulate paste using robotjs
    await page.bringToFront(); // Ensure the browser window is active
    await new Promise(resolve => setTimeout(resolve, 1000)); // Give time for the system to focus on the input
    robot.keyTap("v", process.platform === "darwin" ? "command" : "control"); // Cmd+V (Mac) or Ctrl+V (Windows/Linux)

    console.log("Image pasted!");

    // Keep the browser open for debugging (optional)
    // await browser.close();
})();


// KEEP GOING WITH THIS

// const axios = require('axios');
// require('dotenv').config();

// const API_KEY = process.env.TWO_CAPTCHA_KEY;
// const SITE_KEY = 'your_target_site_key_here';
// const PAGE_URL = 'https://www.pimeyes.com';

// // Step 1: Request CAPTCHA solving
// async function solveCaptcha() {
//     let response = await axios.get(`http://2captcha.com/in.php?key=${API_KEY}&method=userrecaptcha&googlekey=${SITE_KEY}&pageurl=${PAGE_URL}&json=1`);
    
//     if (response.data.status !== 1) {
//         console.error("Error requesting CAPTCHA solving:", response.data);
//         return null;
//     }

//     let requestId = response.data.request;
//     console.log("CAPTCHA solving started, waiting...");

//     // Step 2: Wait and get the solved token
//     await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 sec

//     for (let i = 0; i < 10; i++) {
//         let result = await axios.get(`http://2captcha.com/res.php?key=${API_KEY}&action=get&id=${requestId}&json=1`);
//         if (result.data.status === 1) {
//             console.log("CAPTCHA solved:", result.data.request);
//             return result.data.request;
//         }
//         await new Promise(resolve => setTimeout(resolve, 5000)); // Wait another 5 sec
//     }

//     console.error("Failed to solve CAPTCHA.");
//     return null;
// }

// // Step 3: Use the token in your request
// solveCaptcha().then(token => {
//     if (token) {
//         console.log("Use this CAPTCHA token in your request:", token);
//         // Inject token into the form and submit
//     }
// });

