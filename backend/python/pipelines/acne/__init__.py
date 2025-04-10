from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

processor = AutoImageProcessor.from_pretrained("imfarzanansari/skintelligent-acne", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("imfarzanansari/skintelligent-acne")

def get_acne(img_path):
    image = Image.open(img_path)

    # Preprocess the image
    inputs = processor(images=image, return_tensors="pt")

    # Perform a forward pass
    with torch.no_grad():
        outputs = model(**inputs)

    # Get predicted class index
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Define mapping from model labels to human-readable labels
    level_mapping = {
        -1: "Clear Skin",
         0: "Occasional Spots",
         1: "Mild Acne",
         2: "Moderate Acne",
         3: "Severe Acne",
         4: "Very Severe Acne"
    }

    # Sometimes model.config.id2label returns 'level -1' as a string, so let's clean it up
    labels = model.config.id2label
    raw_label = labels[predicted_class_idx]

    # Extract numeric level from the label string (e.g., "level -1")
    level_number = int(raw_label.replace("level ", ""))

    # Get the descriptive label
    descriptive_label = level_mapping.get(level_number, "Unknown")

    print(f"Predicted class: {descriptive_label}")
    return descriptive_label


# get_acne("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")
# get_acne("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")
get_acne("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/acne.jpg")