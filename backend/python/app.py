from flask import Flask, request, jsonify
from flask_cors import CORS
from pipelines.age_and_race import ageandrace
import base64
import os
import uuid
from PIL import Image

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32 MB upload limit
app.config['UPLOAD_FOLDER'] = "uploads"

# Ensure upload folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Enable CORS for requests from your React frontend
CORS(app, origins=["http://localhost:3000"])

# Allowed file types (currently not used but here for future use)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# Optional helper (not used right now)
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Upload route
@app.route("/ageandrace", methods=["POST"])
def upload_image():
    if not request.is_json:
        return jsonify({"error": "Expected JSON"}), 400

    data = request.get_json()
    base64_data = data.get("file")

    if not base64_data:
        return jsonify({"error": "No image data provided"}), 400

    try:
        # Strip "data:image/jpeg;base64,..." if present
        if "," in base64_data:
            _, base64_data = base64_data.split(",", 1)

        image_data = base64.b64decode(base64_data)
    except Exception as e:
        print("❌ Base64 decode error:", e)
        return jsonify({"error": "Invalid base64", "details": str(e)}), 400

    try:
        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        with open(filepath, "wb") as f:
            f.write(image_data)

        print(f"✅ Saved image to {filepath}")

        # Replace this with your actual processing function
        ageAndRaceClassification = ageandrace(filepath)

        # os.remove(filepath)

        return jsonify({
            "ageRange": ageAndRaceClassification["AgeRange"],
            "ageAccuracy": ageAndRaceClassification["AgeAccuracy"],
            "raceClassification": ageAndRaceClassification["Race"],
            "fileName": filename
        }), 200

    except Exception as e:
        print("❌ Processing error:", e)
        return jsonify({"error": "Processing error", "details": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)

# FACE SEARCH
    
# import asyncio

# from pipelines.face_search import face_search

# async def main():
#     await face_search()

# if __name__ == "__main__":
#     asyncio.run(main())  # ✅ Fix: Run the async function properly
#     # app.run(debug=True)