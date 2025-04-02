from playwright.async_api import async_playwright

import asyncio
import random

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("https://www.pimeyes.com/en")

        try:
            await page.mouse.move(random.randint(100, 500), random.randint(100, 500))
            await asyncio.sleep(random.uniform(1, 3))  # Random delay
            await page.wait_for_selector("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll", timeout=5000)
            await page.click("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
            print("Clicked the 'Allow All' button!")
        except:
            print("Cookie consent button not found.")

        await asyncio.sleep(100000)
        # await browser.close()

asyncio.run(main())