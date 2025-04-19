import logging
import sys
import asyncio
import websockets
import json
import base64
import os
import uuid
from PIL import Image
import io

# ---------------------------
# Logger config
# ---------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------------------
# Initial logs and imports
# ---------------------------

logger.info("🔥 app.py has started")

logger.info("📦 importing acne")
from pipelines.acne import get_acne
logger.info("✅ acne imported")

logger.info("📦 importing aesthetic")
from pipelines.aesthetic import get_aesthetic
logger.info("✅ aesthetic imported")

logger.info("📦 importing age")
from pipelines.age import get_age
logger.info("✅ age imported")

logger.info("📦 importing attractiveness")
from pipelines.attractiveness import get_attractiveness
logger.info("✅ attractiveness imported")

# logger.info("📦 importing bald")
# from pipelines.bald import get_bald
# logger.info("✅ bald imported")

logger.info("📦 importing beard")
from pipelines.beard import get_beard
logger.info("✅ beard imported")

logger.info("📦 importing emotion")
from pipelines.emotion import get_emotion
logger.info("✅ emotion imported")

logger.info("📦 importing face_shape")
from pipelines.face_shape import get_face_shape
logger.info("✅ face_shape imported")

logger.info("📦 importing facemask")
from pipelines.facemask import get_facemask
logger.info("✅ facemask imported")

logger.info("📦 importing gender")
from pipelines.gender import get_gender
logger.info("✅ gender imported")

logger.info("📦 importing hair_length")
from pipelines.hair_length import get_hair_length
logger.info("✅ hair_length imported")

logger.info("📦 importing hair_type")
from pipelines.hair_type import get_hair_type
logger.info("✅ hair_type imported")

# logger.info("📦 importing hat")
# from pipelines.hat import get_hat
# logger.info("✅ hat imported")

logger.info("📦 importing race")
from pipelines.race import get_race
logger.info("✅ race imported")

logger.info("📦 importing skin_type")
from pipelines.skin_type import get_skin_type
logger.info("✅ skin_type imported")

logger.info("📦 importing smoker")
from pipelines.smoker import get_smoker
logger.info("✅ smoker imported")

# ---------------------------
# Setup
# ---------------------------

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------------
# Async functions per pipeline
# ---------------------------

async def acne(filepath): return await get_acne(filepath)
async def aesthetic(filepath): return await get_aesthetic(filepath)
async def age(filepath): return await get_age(filepath)
async def attractiveness(filepath): return await get_attractiveness(filepath)
# async def bald(filepath): return await get_bald(filepath)
async def beard(filepath): return await get_beard(filepath)
async def emotion(filepath): return await get_emotion(filepath)
async def face_shape(filepath): return await get_face_shape(filepath)
async def facemask(filepath): return await get_facemask(filepath)
async def gender(filepath): return await get_gender(filepath)
async def hair_length(filepath): return await get_hair_length(filepath)
async def hair_type(filepath): return await get_hair_type(filepath)
# async def hat(filepath): return await get_hat(filepath)
async def race(filepath): return await get_race(filepath)
async def skin_type(filepath): return await get_skin_type(filepath)
async def smoker(filepath): return await get_smoker(filepath)

# ---------------------------
# Task runner
# ---------------------------

async def run_function_and_notify(func, filepath, websocket, connection_id, step_name):
    try:
        result = await func(filepath)
        await websocket.send(json.dumps({
            "type": step_name,
            "message": f"{result}"
        }))
        logger.info(f"✅ Connection {connection_id}: {step_name} done")
    except websockets.exceptions.ConnectionClosed:
        logger.warning(f"Connection {connection_id} closed before {step_name} could complete")
    except Exception as e:
        logger.error(f"❌ Error in {step_name}: {e}", exc_info=True)

# ---------------------------
# Connection handlers
# ---------------------------

async def on_connect(websocket):
    connection_id = str(uuid.uuid4())
    logger.info(f"🔌 New WebSocket connection: {connection_id}")
    return connection_id

async def on_disconnect(connection_id):
    logger.info(f"🔌 WebSocket connection closed: {connection_id}")
    file_path = f"./uploads/{connection_id}.png"
    
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            logger.info(f"🧹 Deleted image: {file_path}")
        except Exception as e:
            logger.error(f"Error deleting file {file_path}: {e}", exc_info=True)
    else:
        logger.info(f"No image found to delete for connection: {file_path}")

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

        logger.info(f"📩 Received image from {connection_id}")

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
            image = Image.open(io.BytesIO(image_data))
            if image.mode != "RGB":
                image = image.convert("RGB")
            image.save(filepath)
            logger.info(f"✅ Saved image for {connection_id} to {filepath}")
        except Exception as e:
            await websocket.send(json.dumps({"error": "Failed to process image", "details": str(e)}))
            logger.error(f"❌ Failed to save/process image: {e}", exc_info=True)
            continue

        # Kick off analysis
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

        await asyncio.gather(*tasks, return_exceptions=True)

async def connection_handler(websocket):
    connection_id = await on_connect(websocket)
    try:
        await handle_image(websocket, connection_id)
    except websockets.exceptions.ConnectionClosed as e:
        logger.warning(f"⚠️ Connection {connection_id} closed unexpectedly: {e}")
    finally:
        await on_disconnect(connection_id)

# ---------------------------
# Entry point
# ---------------------------

async def main():
    logger.info("🧠 Entered main()")
    async with websockets.serve(connection_handler, "0.0.0.0", 8765, max_size=None):
        logger.info("📡 WebSocket server is running on ws://0.0.0.0:8765")
        await asyncio.Future()

logger.info(f"🐛 __name__ is {__name__}")

if __name__ == "__main__":
    logger.info("🚀 Calling asyncio.run(main())")
    try:
        asyncio.run(main())
    except Exception as e:
        logger.error("💥 Failed to start WebSocket server", exc_info=True)
