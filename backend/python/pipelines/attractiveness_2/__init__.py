from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

processor = AutoImageProcessor.from_pretrained("ongkn/attraction-classifier", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("ongkn/attraction-classifier")


def get_attractiveness_2(img_path):
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
    labels = model.config.id2label  # typically a dict in form {0: "label1", 1: "label2", ...}

    print(f"Predicted class: {labels[predicted_class_idx]}")
    return labels[predicted_class_idx]

get_attractiveness_2("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")
get_attractiveness_2("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")
get_attractiveness_2("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test2.webp")