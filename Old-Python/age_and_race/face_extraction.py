from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
from PIL import Image
import os
import random

def extract_faces_from_image(
    image_path,
    output_dir="./extracted_faces"):
    """
    Detects faces in an image, extracts and saves them, computes embeddings,
    and returns the list of saved file paths.

    Args:
        image_path (str): Path to the input image.
        output_dir (str): Directory to save extracted face images.

    Returns:
        list of str: File paths of the saved face images. If no faces are detected, returns an empty list.
    """
    # Initialize MTCNN for face detection
    mtcnn = MTCNN(image_size=160, margin=0, min_face_size=20)

    # Initialize InceptionResnetV1 for face recognition
    resnet = InceptionResnetV1(pretrained="vggface2").eval()

    # Generate a random integer for unique file naming
    rand_int = random.randint(1, 1000000)

    # Load the image
    img = Image.open(image_path)

    # ✅ Ensure image is in RGB mode (converts from RGBA, grayscale, etc.)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Detect faces in the image
    boxes, _ = mtcnn.detect(img)

    if boxes is None:
        print("No faces detected.")
        return []

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Define a save path template for the extracted faces
    save_path_template = os.path.join(output_dir, f"face_{rand_int}.jpg")

    # Extract and save face images
    faces = mtcnn.extract(img, boxes, save_path=save_path_template)

    # Ensure faces are in batch tensor format
    if isinstance(faces, torch.Tensor):
        if faces.dim() == 3:  # Single face: add batch dim
            faces = faces.unsqueeze(0)
    elif isinstance(faces, list):
        faces = torch.stack([face for face in faces if face is not None])

    # Compute embeddings (optional but useful for face features)
    embeddings = resnet(faces)
    print("Embeddings:", embeddings)

    # Determine the number of faces detected
    num_faces = len(boxes) if isinstance(boxes, list) else 1

    # Build list of saved face image paths
    saved_paths = []
    for i in range(num_faces):
        if num_faces == 1:
            saved_paths.append(save_path_template)
        else:
            base, ext = os.path.splitext(save_path_template)
            saved_paths.append(f"{base}_{i}{ext}")

    return saved_paths
