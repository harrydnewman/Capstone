import sys
print("🔥 app.py has started"); sys.stdout.flush()


import asyncio
import websockets
import json
import base64
import os
import uuid
from PIL import Image
import io

print("📦 importing acne", flush=True)
from pipelines.acne import get_acne
print("✅ acne imported", flush=True)

print("📦 importing aesthetic", flush=True)
from pipelines.aesthetic import get_aesthetic
print("✅ aesthetic imported", flush=True)

print("📦 importing age", flush=True)
from pipelines.age import get_age
print("✅ age imported", flush=True)

print("📦 importing attractiveness", flush=True)
from pipelines.attractiveness import get_attractiveness
print("✅ attractiveness imported", flush=True)

# print("📦 importing bald", flush=True)
# from pipelines.bald import get_bald
# print("✅ bald imported", flush=True)

print("📦 importing beard", flush=True)
from pipelines.beard import get_beard
print("✅ beard imported", flush=True)

print("📦 importing emotion", flush=True)
from pipelines.emotion import get_emotion
print("✅ emotion imported", flush=True)

print("📦 importing face_shape", flush=True)
from pipelines.face_shape import get_face_shape
print("✅ face_shape imported", flush=True)

print("📦 importing facemask", flush=True)
from pipelines.facemask import get_facemask
print("✅ facemask imported", flush=True)

print("📦 importing gender", flush=True)
from pipelines.gender import get_gender
print("✅ gender imported", flush=True)

print("📦 importing hair_length", flush=True)
from pipelines.hair_length import get_hair_length
print("✅ hair_length imported", flush=True)

print("📦 importing hair_type", flush=True)
from pipelines.hair_type import get_hair_type
print("✅ hair_type imported", flush=True)

# print("📦 importing hat", flush=True)
# from pipelines.hat import get_hat
# print("✅ hat imported", flush=True)

print("📦 importing race", flush=True)
from pipelines.race import get_race
print("✅ race imported", flush=True)

print("📦 importing skin_type", flush=True)
from pipelines.skin_type import get_skin_type
print("✅ skin_type imported", flush=True)

print("📦 importing smoker", flush=True)
from pipelines.smoker import get_smoker
print("✅ smoker imported", flush=True)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------------
# Async functions per pipeline
# ---------------------------

async def acne(filepath):
    return await get_acne(filepath)

async def aesthetic(filepath):
    return await get_aesthetic(filepath)

async def age(filepath):
    return await get_age(filepath)

async def attractiveness(filepath):
    return await get_attractiveness(filepath)

# async def bald(filepath):
#     return await get_bald(filepath)

async def beard(filepath):
    return await get_beard(filepath)

async def emotion(filepath):
    return await get_emotion(filepath)

async def face_shape(filepath):
    return await get_face_shape(filepath)

async def facemask(filepath):
    return await get_facemask(filepath)

async def gender(filepath):
    return await get_gender(filepath)

async def hair_length(filepath):
    return await get_hair_length(filepath)

async def hair_type(filepath):
    return await get_hair_type(filepath)

# async def hat(filepath):
#     return await get_hat(filepath)

async def race(filepath):
    return await get_race(filepath)

async def skin_type(filepath):
    return await get_skin_type(filepath)

async def smoker(filepath):
    return await get_smoker(filepath)

# ---------------------------
# Task runner for individual functions
# ---------------------------

async def run_function_and_notify(func, filepath, websocket, connection_id, step_name):
    try:
        result = await func(filepath)
        await websocket.send(json.dumps({
            "type": step_name,
            "message": f"{result}"
        }))
        print(f"✅ Connection {connection_id}: {step_name} done")
    except websockets.exceptions.ConnectionClosed:
        print(f"Connection {connection_id} closed before {step_name} could complete")
    except Exception as e:
        print(f"❌ Error in {step_name}: {e}")

# ---------------------------
# Connection handlers
# ---------------------------

async def on_connect(websocket):
    connection_id = str(uuid.uuid4())
    print(f"New WebSocket connection: {connection_id}")
    return connection_id

async def on_disconnect(connection_id):
    print(f"WebSocket connection closed: {connection_id}")
    file_path = f"./uploads/{connection_id}.png"
    
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            print(f"Deleted image: {file_path}")
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")
    else:
        print(f"No image found for connection: {file_path}")

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

        filename = f"{connection_id}.png"
        filepath = os.path.join(UPLOAD_FOLDER, filename)

        try:
            # Force image to RGB mode and save
            image = Image.open(io.BytesIO(image_data))
            if image.mode != "RGB":
                image = image.convert("RGB")
            image.save(filepath)
            print(f"✅ Connection {connection_id} saved image to {filepath}")
        except Exception as e:
            await websocket.send(json.dumps({"error": "Failed to process image", "details": str(e)}))
            continue
       

        # Prepare all tasks
        tasks = [
            run_function_and_notify(acne, filepath, websocket, connection_id, "acne"),
            run_function_and_notify(aesthetic, filepath, websocket, connection_id, "aesthetic"),
            run_function_and_notify(age, filepath, websocket, connection_id, "age"),
            run_function_and_notify(attractiveness, filepath, websocket, connection_id, "attractiveness"),
            # run_function_and_notify(bald, filepath, websocket, connection_id, "bald"),
            run_function_and_notify(beard, filepath, websocket, connection_id, "beard"),
            run_function_and_notify(emotion, filepath, websocket, connection_id, "emotion"),
            run_function_and_notify(face_shape, filepath, websocket, connection_id, "face_shape"),
            run_function_and_notify(facemask, filepath, websocket, connection_id, "facemask"),
            run_function_and_notify(gender, filepath, websocket, connection_id, "gender"),
            run_function_and_notify(hair_length, filepath, websocket, connection_id, "hair_length"),
            run_function_and_notify(hair_type, filepath, websocket, connection_id, "hair_type"),
            # run_function_and_notify(hat, filepath, websocket, connection_id, "hat"),
            run_function_and_notify(race, filepath, websocket, connection_id, "race"),
            run_function_and_notify(skin_type, filepath, websocket, connection_id, "skin_type"),
            run_function_and_notify(smoker, filepath, websocket, connection_id, "smoker"),
        ]

        # Await all tasks together and handle exceptions
        await asyncio.gather(*tasks, return_exceptions=True)

async def connection_handler(websocket):
    connection_id = await on_connect(websocket)
    try:
        await handle_image(websocket, connection_id)
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection {connection_id} closed unexpectedly: {e}")
    finally:
        await on_disconnect(connection_id)



async def main():
    print("🧠 Entered main()")
    async with websockets.serve(connection_handler, "0.0.0.0", 8765, max_size=None):
        print("WebSocket server is running on ws://0.0.0.0:8765")
        await asyncio.Future() 

print(f"🐛 __name__ is {__name__}", flush=True)

if __name__ == "__main__":
    import asyncio
    print("🚀 Calling asyncio.run(main())", flush=True)
    try:
        asyncio.run(main())
    except Exception as e:
        import traceback
        print(f"💥 Failed to start WebSocket server: {e}", flush=True)
        traceback.print_exc()

