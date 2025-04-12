import asyncio
import websockets
import json
import base64
import os
import uuid

from pipelines.acne import get_acne
from pipelines.aesthetic import get_aesthetic
from pipelines.age import get_age

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------------
# STUB FUNCTIONS (Replace with real work)
# ---------------------------
async def acne(filepath):
    # await asyncio.sleep(2)  
    acne = await get_acne(filepath)
    return acne

async def aesthetic(filepath):
    # await asyncio.sleep(2)  
    aesthetic = await get_aesthetic(filepath)
    return aesthetic

async def age(filepath):
    age = await get_age(filepath)
    return age

async def function_two(filepath):
    await asyncio.sleep(4)  # simulate longer processing
    return "Function Two Result"

async def function_three(filepath):
    await asyncio.sleep(3)  # simulate processing time
    return "Function Three Result"

# async def age(filepath):


# ---------------------------
# Task runner for individual functions
# ---------------------------
async def run_function_and_notify(func, filepath, websocket, connection_id, step_name):
    try:
        result = await func(filepath)
        await websocket.send(json.dumps({
            "type": step_name,
            "message": f"{step_name} complete. Result: {result}"
        }))
        print(f"✅ Connection {connection_id}: {step_name} done")
    except websockets.exceptions.ConnectionClosed:
        print(f"Connection {connection_id} closed before {step_name} could complete")
    except Exception as e:
        print(f"❌ Error in {step_name}: {e}")

async def on_connect(websocket):
    connection_id = str(uuid.uuid4())
    print(f"New WebSocket connection: {connection_id}")
    return connection_id

async def on_disconnect(connection_id):
    print(f"WebSocket connection closed: {connection_id}")

async def handle_image(websocket, connection_id):
    async for message in websocket:
        try:
            data = json.loads(message)
        except json.JSONDecodeError:
            await websocket.send(json.dumps({"error": "Invalid JSON"}))
            continue

        base64_data = data.get("file")
        if not base64_data:
            await websocket.send(json.dumps({"error": "No image data provided"}))
            continue

        print(f"Received: image from {connection_id}")

        if "," in base64_data:
            _, base64_data = base64_data.split(",", 1)

        try:
            image_data = base64.b64decode(base64_data)
        except Exception as e:
            await websocket.send(json.dumps({"error": "Invalid base64", "details": str(e)}))
            continue

        filename = f"{uuid.uuid4().hex}.png"
        filepath = os.path.join(UPLOAD_FOLDER, filename)

        try:
            with open(filepath, "wb") as f:
                f.write(image_data)
            print(f"✅ Connection {connection_id} saved image to {filepath}")
        except Exception as e:
            await websocket.send(json.dumps({"error": "Failed to save image", "details": str(e)}))
            continue

        # Notify client image is saved
        await websocket.send(json.dumps({
            "success": True,
            "filename": filename
        }))

        # Run all functions in parallel (fire and forget)
        tasks = [
            run_function_and_notify(acne, filepath, websocket, connection_id, "acne"),
            run_function_and_notify(aesthetic, filepath, websocket, connection_id, "aesthetic"),
            run_function_and_notify(age, filepath, websocket, connection_id, "age"),
        ]
        asyncio.gather(*tasks)  # Not awaited, runs all in parallel

async def connection_handler(websocket):
    connection_id = await on_connect(websocket)
    try:
        await handle_image(websocket, connection_id)
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection {connection_id} closed unexpectedly: {e}")
    finally:
        await on_disconnect(connection_id)

async def main():
    async with websockets.serve(connection_handler, "localhost", 8765, max_size=None):
        print("WebSocket server is running on ws://localhost:8765")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
