# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

processor = AutoImageProcessor.from_pretrained("Leilab/hair_lenght", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("Leilab/hair_lenght")


def get_hair_length(img_path):
    image = Image.open(img_path)

    # Preprocess the image
    inputs = processor(images=image, return_tensors="pt")

    # Perform a forward pass
    with torch.no_grad():
        outputs = model(**inputs)

    # Get predicted class
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Retrieve labels
    labels = model.config.id2label  

    print(f"Predicted class: {labels[predicted_class_idx]}")
    return labels[predicted_class_idx]

get_hair_length("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")
get_hair_length("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")
get_hair_length("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test2.webp")