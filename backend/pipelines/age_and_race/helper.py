import os
import shutil

def get_folder_from_path(file_path: str) -> str:
    return os.path.dirname(file_path)

def move_folder_contents(source_folder: str, destination_folder: str) -> None:
    """
    Moves all contents (files and subdirectories) from source_folder to destination_folder.
    
    Args:
        source_folder (str): Path to the folder whose contents you want to move.
        destination_folder (str): Path to the folder where the contents will be moved.
    """
    # Create the destination folder if it does not exist.
    os.makedirs(destination_folder, exist_ok=True)
    
    # Iterate over every item in the source folder.
    for item in os.listdir(source_folder):
        source_item = os.path.join(source_folder, item)
        destination_item = os.path.join(destination_folder, item)
        
        # Use shutil.move to move files or directories.
        shutil.move(source_item, destination_item)
    
    print(f"All contents moved from '{source_folder}' to '{destination_folder}'.")

def parse_age_data(data):
    highestValue = max(data, key=lambda item: item['score'])
    ageRange = highestValue['label']
    accuracyRate = highestValue['score']
    accuracyRatePercentage = accuracyRate * 100
    formattedPercentage = f"{accuracyRatePercentage:.2f}"
    return {
        "AgeRange": ageRange,
        "Accuracy": f"{formattedPercentage}%"
    }

def get_file_name_without_extension(file_path):
    # Get the base name (e.g., "file.txt" from "/path/to/file.txt")
    base_name = os.path.basename(file_path)
    # Split the file name and extension
    file_name, _ = os.path.splitext(base_name)
    return file_name

def get_directory_path(file_path):
    # Return the directory path without the file name
    return os.path.dirname(file_path)

def write_output_file(data, imagePath):
    file_name = get_file_name_without_extension(imagePath)
    file_path = get_directory_path(imagePath)
    text_file_name = f"{file_name}.txt"
    text_file_path = f"{file_path}/{text_file_name}"
    with open(text_file_path, "w") as file:
        file.write(data)
        file.close()
    print("Data written successfully")