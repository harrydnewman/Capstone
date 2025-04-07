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

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

CORS(app, origins=["http://localhost:3000"])

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/ageandrace", methods=["POST"])
def upload_image():
    if not request.is_json:
        return jsonify({"error": "Expected JSON"}), 400

    data = request.get_json()
    base64_data = data.get("file")

    if not base64_data:
        return jsonify({"error": "No image data provided"}), 400

    try:
        if "," in base64_data:
            _, base64_data = base64_data.split(",", 1)

        image_data = base64.b64decode(base64_data)
    except Exception as e:
        print("Base64 decode error:", e)
        return jsonify({"error": "Invalid base64", "details": str(e)}), 400

    try:
        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

        with open(filepath, "wb") as f:
            f.write(image_data)

        print(f"Saved image to {filepath}")

        ageAndRaceClassification = ageandrace(filepath)

        os.remove(filepath) 

        return jsonify({
            "ageRange": ageAndRaceClassification["AgeRange"],
            "ageAccuracy": ageAndRaceClassification["AgeAccuracy"],
            "raceClassification": ageAndRaceClassification["Race"],
            "fileName": filename
        }), 200

    except Exception as e:
        print("Processing error:", e)
        return jsonify({"error": "Processing error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)