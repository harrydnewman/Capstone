import asyncio
import random
import json
from playwright.async_api import async_playwright

# Load Stealth JavaScript Script (Equivalent to Puppeteer-extra-plugin-stealth)
stealth_js = """
() => {
    Object.defineProperty(navigator, 'webdriver', {get: () => false});
    Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']});
    Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
    Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 8});
    Object.defineProperty(navigator, 'deviceMemory', {get: () => 8});
    Object.defineProperty(navigator, 'maxTouchPoints', {get: () => 2});
    
    const getParameter = WebGLRenderingContext.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) return 'Intel Open Source Technology Center';
        if (parameter === 37446) return 'Mesa DRI Intel(R) HD Graphics 620';
        return getParameter(parameter);
    };
}
"""

# Random User-Agent Generator
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36",
]

async def launch_stealth_browser(playwright):
    """Launch a stealth browser to avoid bot detection."""
    print("[+] Launching stealth browser...")

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--disable-infobars",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-web-security",
                "--disable-extensions",
                "--disable-dev-shm-usage",
                "--mute-audio",
                "--disable-gpu",
                "--no-zygote",
                "--disable-software-rasterizer",
                "--disable-features=IsolateOrigins,site-per-process"
            ]
        )

        context = await browser.new_context(
            user_agent=random.choice(USER_AGENTS),
            viewport={"width": 1280, "height": 720},
            java_script_enabled=True
        )

        page = await context.new_page()

        # Inject Stealth JavaScript
        await page.add_init_script(stealth_js)

        print("[+] Navigating to Pimeyes...")
        await page.goto("https://www.pimeyes.com/en", wait_until="domcontentloaded")

        # Print navigator properties to verify stealth
        data = await page.evaluate("""
            () => ({
                webdriver: navigator.webdriver,
                languages: navigator.languages,
                plugins: navigator.plugins.length,
                hardwareConcurrency: navigator.hardwareConcurrency,
                maxTouchPoints: navigator.maxTouchPoints
            })
        """)
        print("[+] Stealth Test Data:", json.dumps(data, indent=2))
        print("[+] Page loaded, returning browser instance.")
        return browser, playwright

# Run the stealth browser
