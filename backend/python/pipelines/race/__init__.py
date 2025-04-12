import os
from ultralytics import YOLO

def get_top_class_from_image(model, image_path):
    try:
        results = model(image_path)
        if not results:
            print(f"No results returned for image: {image_path}")
            return None

        result = results[0]
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

def get_race(image_path):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(base_dir)
    python_dir = os.path.dirname(parent_dir)
    model_file = os.path.join(python_dir, "models", "Race-CLS-FairFace_yolo11l.pt")
    model = YOLO(model_file)

    tag = get_top_class_from_image(model, image_path)
    print(tag)
    return tag

# Call function with a single image path
# get_race("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/race_image_test/janedl.png")
