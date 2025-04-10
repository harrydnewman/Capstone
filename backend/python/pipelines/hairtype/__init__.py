from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
inference_api_key = os.getenv("INFERENCE_TOKEN")


client = InferenceClient(
    provider="hf-inference",
    api_key=inference_api_key,
)

def run():
    output = client.image_classification("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png", model="Falconsai/nsfw_image_detection")
    print(output)

run()

