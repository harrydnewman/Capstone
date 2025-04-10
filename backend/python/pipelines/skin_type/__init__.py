# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

processor = AutoImageProcessor.from_pretrained("dima806/skin_types_image_detection", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("dima806/skin_types_image_detection")





# Example: read an image
# image = Image.open("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")
# image = Image.open("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")


def get_skin_type(img_path):
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

# get_skin_type("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")
# get_skin_type("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")
# get_skin_type("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/oilyskin.webp")