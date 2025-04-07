import os
import tkinter as tk
from tkinter import filedialog
from ultralytics import YOLO


def get_top_class_from_image(model, image_path):
    """
    Runs the YOLOv8 classification model on the given image and returns the class label 
    corresponding to the top prediction.
    
    The function first checks if the result provides a 'pred' attribute. If not, it 
    uses the 'probs' attribute's built-in 'top1' value.
    
    Args:
        model (YOLO): The loaded YOLO classification model.
        image_path (str): The path to the image file.
    
    Returns:
        str or None: The predicted class label, or None if processing fails.
    """
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

        # Otherwise, use the 'probs' attribute's top1 value.
        elif hasattr(result, "probs"):
            # 'probs' is an instance of a Probs class that provides a top1 attribute.
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
    """
    Updates (or creates) the text file corresponding to the image by appending 
    the provided tag. The text file is assumed to share the same base name as 
    the image, but with a '.txt' extension.
    
    Args:
        image_path (str): The full path to the image file.
        tag (str): The class label to append.
    """
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
    """
    Iterates over image files in the specified folder, runs classification 
    on each image, and appends the top class tag to the corresponding text file.
    
    Args:
        model (YOLO): The loaded YOLO classification model.
        folder_path (str): The path to the folder containing images.
    """
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
    """
    Main pipeline function:
      1. Prompts the user to select a YOLO classification model file.
      2. Prompts the user to select an image folder.
      3. Loads the classification model and processes each image in the folder.
    """
    model_file = "models/Race-CLS-FairFace_yolo11l.pt"
    model = YOLO(model_file)
    tag = process_images(model, folder_path)
    return f"{tag}"
    
