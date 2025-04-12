# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import asyncio 

processor = AutoImageProcessor.from_pretrained("Minapotheo/hatornot", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("Minapotheo/hatornot")

async def get_hat_or_not(img_path):
    image = Image.open(img_path)


    # Preprocess the image
    inputs = processor(images=image, return_tensors="pt")

    # Perform a forward pass
    with torch.no_grad():
        outputs = await asyncio.to_thread(lambda: model(**inputs))

    # Get predicted class
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Retrieve labels
    labels = model.config.id2label  # typically a dict in form {0: "label1", 1: "label2", ...}
    if labels[predicted_class_idx] == "bare head":
        return False
    else:
        return True
    # return labels[predicted_class_idx]
