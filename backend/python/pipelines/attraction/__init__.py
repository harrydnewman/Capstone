import gradio as gr
from transformers import ViTForImageClassification, ViTImageProcessor
import numpy as np
from PIL import Image
import torch
from pytorch_grad_cam import run_dff_on_image, GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image
from torchvision import transforms
from face_grab import FaceGrabber
from gradcam import GradCam
import logging

# Setting up logging
logging.basicConfig(level=logging.INFO)

# Model and Processor Setup
model = ViTForImageClassification.from_pretrained("ongkn/attraction-classifier")
processor = ViTImageProcessor.from_pretrained("ongkn/attraction-classifier")

# Grad-CAM Setup
faceGrabber = FaceGrabber()
gradCam = GradCam()

# Grad-CAM and DFF Targets
targetsForGradCam = [ClassifierOutputTarget(gradCam.category_name_to_index(model, "pos")),
                     ClassifierOutputTarget(gradCam.category_name_to_index(model, "neg"))]

targetLayerDff = model.vit.layernorm
targetLayerGradCam = model.vit.encoder.layer[-2].output

def classify_image(input):
    # For testing, use the static image path instead of Gradio input
    image_path = "/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/janedl.png"
    
    # Load the image from the path
    input = Image.open(image_path)
    
    # Step 1: Detect and grab face
    face = faceGrabber.grab_faces(np.array(input))
    
    # If no face is detected
    if face is None:
        return "No face detected", 0, input, None, None, None

    # Step 2: Preprocess image
    face = Image.fromarray(face)
    faceResized = face.resize((224, 224))  # Resize image to (224, 224)
    tensorResized = transforms.ToTensor()(faceResized)
    
    # Step 3: Run DFF for deep feature fusion explanation
    dffImage = run_dff_on_image(model=model,
                                target_layer=targetLayerDff,
                                classifier=model.classifier,
                                img_pil=faceResized,
                                img_tensor=tensorResized,
                                reshape_transform=gradCam.reshape_transform_vit_huggingface,
                                n_components=6,
                                top_k=15)

    # Step 4: Run Grad-CAM for explanation
    result = gradCam.get_top_category(model, tensorResized)
    cls = result[0]["label"]
    result[0]["score"] = round(result[0]["score"], 2)

    # Convert label to index for Grad-CAM
    clsIdx = gradCam.category_name_to_index(model, cls)
    clsTarget = ClassifierOutputTarget(clsIdx)

    gradCamImage = gradCam.run_grad_cam_on_image(model=model,
                                                target_layer=targetLayerGradCam,
                                                targets_for_gradcam=[clsTarget],
                                                input_tensor=tensorResized,
                                                input_image=faceResized,
                                                reshape_transform=gradCam.reshape_transform_vit_huggingface)

    # Step 5: Classification result and subjective message
    if result[0]["label"] == "pos" and result[0]["score"] > 0.85 and result[0]["score"] <= 0.9:
        return result[0]["label"], result[0]["score"], "Nice!", face, dffImage, gradCamImage
    elif result[0]["label"] == "pos" and result[0]["score"] > 0.9 and result[0]["score"] <= 0.95:
        return result[0]["label"], result[0]["score"], "Pretty!", face, dffImage, gradCamImage
    elif result[0]["label"] == "pos" and result[0]["score"] > 0.95 and result[0]["score"] <= 0.98:
        return result[0]["label"], result[0]["score"], "WHOA!!!!", face, dffImage, gradCamImage
    elif result[0]["label"] == "pos" and result[0]["score"] > 0.98:
        return result[0]["label"], result[0]["score"], "** ABSOLUTELY MINDBLOWING **", face, dffImage, gradCamImage
    else:
        return cls, result[0]["score"], "Indifferent", face, dffImage, gradCamImage

# Gradio Interface
iface = gr.Interface(
    fn=classify_image,
    inputs="image",  # Use image for input when testing
    outputs=["text", "number", "text", "image", "image", "image"],
    title="Attraction Classifier - Subjective",
    description=f"Takes an image and classifies the attraction class into 'pos' or 'neg'. Also provides Grad-CAM and DFF visualizations."
)

# Launch the interface
iface.launch()
