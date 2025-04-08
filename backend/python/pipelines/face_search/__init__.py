import asyncio
from playwright.async_api import async_playwright
from .browser_init import launch_stealth_browser
async def browser_init(playwright):
    print("Initializing Browser!")
    browser = await launch_stealth_browser(playwright)
    print("Finished Initializing Browser")
    
    return browser

async def solve_init():
    print("Starting Solve Process")
    # run open stealth browser function
    await asyncio.sleep(3)  
    print("Solved Turnstile!")
    return "dummy_token"

async def face_search():
    print("hi")
    playwright = await async_playwright().start() 
    browser, captcha_token = await asyncio.gather(browser_init(playwright), solve_init())
    print(browser)
    print(captcha_token)
    await asyncio.sleep(500000)
    # start 2 threads
        # open stealth browser

        # start solving captcha

    # navigate to pimeyes

    # get everything ready

    # await the captcha to be solved

    # inject

    # run

    # test
