# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image

processor = AutoImageProcessor.from_pretrained("dima806/beard_face_image_detection", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("dima806/beard_face_image_detection")



def get_beard(img_path):
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

get_beard("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/test1.jpg")
get_beard("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png")