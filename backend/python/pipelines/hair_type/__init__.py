from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
import asyncio 
# Load environment variables from .env file
load_dotenv()
inference_api_key = os.getenv("INFERENCE_TOKEN")

client = InferenceClient(
    provider="hf-inference",
    api_key=inference_api_key,
)



async def get_hair_type(img_path):
    output = await client.image_classification(img_path, model="dima806/hair_type_image_detection")
    highest = max(output, key=lambda x: x.score)
    print(highest.label)
    print(highest.score)
    results = {
        "label": highest.label,
        "score": highest.score
    }
    return results

