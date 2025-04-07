# __init__.py
from .face_extraction import extract_faces_from_image
from .age_classification import age_classification
from .race_classification import race_classification
from .helper import get_folder_from_path
from .helper import parse_age_data

import os

def ageandrace(image_path):
    saved_paths = extract_faces_from_image(image_path)
    print(saved_paths)
    if saved_paths:
        print("Extracted face images saved at:")
        for path in saved_paths:
            print(path)
            ageTest = age_classification(path)
            ageData = parse_age_data(ageTest)
            race_image_folder = get_folder_from_path(image_path)
            raceClassification = race_classification(race_image_folder)
            data = {
                "AgeRange": ageData["AgeRange"],
                "AgeAccuracy": ageData["Accuracy"],
                "Race": raceClassification
            }
            # remove this for testing
            # os.remove(path)
            return data
    else:
        print("No faces were extracted.")


