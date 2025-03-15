#!/usr/bin/env python
"""
This script uses the Hugging Face transformers pipeline for image classification.
It loads the model "dima806/fairface_age_image_detection" and processes a provided image.
"""

from transformers import pipeline

def age_classification(image_path):
    # Initialize the image-classification pipeline with the specified model
    pipe = pipeline("image-classification", model="dima806/fairface_age_image_detection")
    
    # Replace this with the path or URL to your input image
    
    # Run the pipeline on the image and capture the results
    results = pipe(image_path)
    
    # Print the results
    print("Classification Results:")
    for result in results:
        print(result)
    return results

