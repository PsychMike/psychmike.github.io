import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Correct absolute directory path
IMAGE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../assets/gallery_imgs"))

@app.route("/gallery")
def get_gallery():
    """API endpoint to list all images in the gallery folder."""
    images = [f for f in os.listdir(IMAGE_DIR) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    return jsonify({"images": sorted(images)})

@app.route("/gallery_imgs/<filename>")  # ✅ Serve images under "/gallery_imgs/"
def serve_image(filename):
    return send_from_directory(IMAGE_DIR, filename)  # ✅ Serve from absolute path

if __name__ == "__main__":
    app.run(debug=True)
