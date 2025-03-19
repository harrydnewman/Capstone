import asyncio
from playwright.async_api import async_playwright

async def open_browser():
    """Launch the browser and return it without closing."""
    print("[+] Launching browser...")
    playwright = await async_playwright().start()  # Start Playwright manually
    browser = await playwright.chromium.launch(headless=False)
    page = await browser.new_page()

    print("[+] Navigating to example.com...")
    await page.goto("https://example.com", wait_until="domcontentloaded")

    print("[+] Page loaded, returning browser instance.")
    return browser, playwright  # Return both the browser and playwright instance

async def main():
    """Main function that receives the browser instance and continues execution."""
    browser, playwright = await open_browser()  # Keep both references

    print("[+] Browser is ready for further automation!")

    # Create a new page in the existing browser
    page = await browser.new_page()
    await page.goto("https://pimeyes.com", wait_until="domcontentloaded")
    print("[+] Pimeyes opened!")

    # Keep the browser open for debugging
    await asyncio.sleep(5)

    # Close everything properly
    await browser.close()
    await playwright.stop()  # Properly stop Playwright

# Run the async script
asyncio.run(main())
