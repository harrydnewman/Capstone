import asyncio

async def task_one():
    print("Task One: Starting...")
    await asyncio.sleep(3)  
    print("Task One: Done!")

async def task_two():
    print("Task Two: Starting...")
    await asyncio.sleep(2)  # Simulating another async operation
    print("Task Two: Done!")

async def main():
    # Run both tasks concurrently
    await asyncio.gather(task_one(), task_two())

asyncio.run(main())
