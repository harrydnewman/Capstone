import os
import tkinter as tk
from tkinter import filedialog
from ultralytics import YOLO


def get_top_class_from_image(model, image_path):
    try:
        results = model(image_path)
        if not results:
            print(f"No results returned for image: {image_path}")
            return None
        

        result = results[0]
        # Check for a 'pred' attribute first.
        if hasattr(result, "pred") and result.pred is not None:
            pred_val = result.pred
            if isinstance(pred_val, (list, tuple)):
                top_index = int(pred_val[0])
            elif hasattr(pred_val, "cpu"):
                top_index = int(pred_val.cpu().item())
            elif isinstance(pred_val, int):
                top_index = pred_val
            else:
                print(f"Unexpected type for pred in image {image_path}: {type(pred_val)}")
                return None
            label = model.names.get(top_index, str(top_index))
            return label
        elif hasattr(result, "probs"):
            top_index = result.probs.top1
            label = model.names.get(top_index, str(top_index))
            return label
        else:
            print(f"No valid classification result found for image: {image_path}")
            return None
    except Exception as e:
        print(f"Error processing image '{image_path}': {e}")
        return None

def update_tag_file(image_path, tag):
    base, _ = os.path.splitext(image_path)
    txt_file = base + '.txt'
    try:
        if os.path.exists(txt_file):
            with open(txt_file, 'r') as f:
                content = f.read().strip()
            new_content = content + ',' + tag if content else tag
            with open(txt_file, 'w') as f:
                f.write(new_content)
        else:
            with open(txt_file, 'w') as f:
                f.write(tag)
    except Exception as e:
        print(f"Error updating tag file for '{image_path}': {e}")

def process_images(model, folder_path):
    allowed_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tif', '.tiff'}
    for file_name in os.listdir(folder_path):
        file_path = os.path.join(folder_path, file_name)
        if os.path.isfile(file_path):
            ext = os.path.splitext(file_name)[1].lower()
            if ext in allowed_extensions:
                print(f"Processing image: {file_name}")
                tag = get_top_class_from_image(model, file_path)
                if tag:
                    return tag
                    # print(f"Appending tag: {tag}")
                    # update_tag_file(file_path, tag)
                else:
                    print(f"No classification result for image: {file_name}")

def race_classification(folder_path):
    model_file = "models/Race-CLS-FairFace_yolo11l.pt"
    model = YOLO(model_file)
    tag = process_images(model, folder_path)
    return f"{tag}"
    
