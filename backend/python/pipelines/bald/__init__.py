from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import asyncio

# Load processor and model globally
processor = AutoImageProcessor.from_pretrained("mvaloatto/bald-or-not", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("mvaloatto/bald-or-not")

# Label mapping for binary classification (optional)
binary_mapping = {
    "bald": "bald",
    "full_hair": "not bald",
    "short_hair": "not bald",
    "receding_hair": "not bald"
}

async def get_bald(img_path):
    # Load image
    image = Image.open(img_path)

    # Preprocess the image
    inputs = processor(images=image, return_tensors="pt")

    # Perform inference in a background thread (non-blocking)
    with torch.no_grad():
        outputs = await asyncio.to_thread(lambda: model(**inputs))

    # Get predicted class index
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Retrieve label
    labels = model.config.id2label
    predicted_label = labels[predicted_class_idx]

    # Map to binary (bald / not bald)
    mapped_label = binary_mapping.get(predicted_label, "unknown")

    print(f"Predicted class: {predicted_label} -> Mapped: {mapped_label}")
    return mapped_label
