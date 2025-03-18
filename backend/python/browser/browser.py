# import asyncio
# from playwright.async_api import async_playwright
# import random

# async def main():
#     async with async_playwright() as p:
#         context = await p.firefox.launch_persistent_context(
#             user_data_dir="/Users/harrisonnewman/Library/Application Support/Firefox/Profiles/6obnjb1c.default-default",  # Replace with your actual profile
#             headless=False  # Set to True if you want headless mode
#         )

#         page = context.pages[0] if context.pages else await context.new_page()
#         await page.goto("https://pimeyes.com/en", wait_until="domcontentloaded")

#         print("Page Title:", await page.title())

#         try:
#             await page.mouse.move(random.randint(100, 500), random.randint(100, 500))
#             await asyncio.sleep(random.uniform(1, 3))  # Random delay
#             await page.wait_for_selector("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll", timeout=5000)
#             await page.click("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
#             print("Clicked the 'Allow All' button!")
#         except:
#             print("Cookie consent button not found.")

#         await asyncio.sleep(100000)
#         await context.close()

# asyncio.run(main())
import undetected_chromedriver as uc
import chromedriver_autoinstaller

chromedriver_autoinstaller.install()
driver = uc.Chrome(headless=False)
driver.get("https://google.com")




