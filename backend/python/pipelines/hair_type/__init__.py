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

def classify_image(img_path):
    output = client.image_classification(img_path, model="dima806/hair_type_image_detection")
    highest = max(output, key=lambda x: x.score)
    print(highest.label)
    print(highest.score)
    return highest.label
    # return {
    #     "label": highest.label,
    #     "score": highest.score
    # }

async def get_hair_type(img_path):
    return await asyncio.to_thread(classify_image, img_path)
