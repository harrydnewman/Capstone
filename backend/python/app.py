# import os
# from flask import Flask, request, jsonify
# from werkzeug.utils import secure_filename
# from pipelines.age_and_race import ageandrace
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app) 
# # Define upload folder and allowed extensions
# UPLOAD_FOLDER = "uploads"
# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

# # Ensure the upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# # Function to check allowed file types
# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# @app.route("/upload", methods=["POST"])
# def upload_image():

#     if "file" not in request.files:
#         return jsonify({"error": "No file part"}), 400  # 🛑 This is where it's failing

#     file = request.files["file"]

#     if file.filename == "":
#         return jsonify({"error": "No selected file"}), 400

#     filepath = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
#     file.save(filepath)

#     ageAndRaceClassification = ageandrace(filepath)
#     print(ageAndRaceClassification)

#     os.remove(filepath)

#     return jsonify({"ageRange": ageAndRaceClassification["AgeRange"], 
#                     "ageAccuracy": ageAndRaceClassification["AgeAccuracy"],
#                     "raceClassification": ageAndRaceClassification["Race"]
#                     }), 200

# if __name__ == "__main__":
#     app.run(debug=True)
    
import asyncio

from pipelines.face_search import face_search

async def main():
    await face_search()

if __name__ == "__main__":
    asyncio.run(main())  # ✅ Fix: Run the async function properly
    # app.run(debug=True)