#!/usr/bin/env python
"""
This script uses the Hugging Face transformers pipeline for image classification.
It loads the model "dima806/fairface_age_image_detection" and processes a provided image.
"""

from transformers import pipeline

def age_classification(image_path):

    pipe = pipeline("image-classification", model="dima806/fairface_age_image_detection")

    results = pipe(image_path)
    
    print("Classification Results:")
    for result in results:
        print(result)
    return results

