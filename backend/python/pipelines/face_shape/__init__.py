from transformers import ViTImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import requests
import asyncio 

# Load the image processor and the model
processor = ViTImageProcessor.from_pretrained("metadome/face_shape_classification", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("metadome/face_shape_classification")

async def get_face_shape(image_path):
    image = Image.open(image_path)

    # Preprocess the image for the model
    inputs = processor(images=image, return_tensors="pt")

    # Perform inference
    with torch.no_grad():
        outputs = await asyncio.to_thread(lambda: model(**inputs))

    # Get the prediction
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

    # Mapping from index to face shape categories
    face_shape_classes = ['Oval', 'Round', 'Square', 'Heart', 'Diamond']

    # Output the predicted class and its confidence score
    predicted_label = face_shape_classes[predicted_class_idx]
    confidence = torch.nn.functional.softmax(logits, dim=-1)[0][predicted_class_idx].item()

    print(f"Predicted Face Shape: {predicted_label} with confidence {confidence * 100:.2f}%")

    # data = {
    #     predicted_label: predicted_label,
    #     confidence: confidence * 100
    # }
    return predicted_label
