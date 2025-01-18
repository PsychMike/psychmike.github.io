import cv2
import os

def crop_and_center_face(image_path, output_path, output_size=(200, 200)):
    # Load the image
    image = cv2.imread(image_path)

    # Check if the image was loaded successfully
    if image is None:
        print(f"Error: Unable to read image at {image_path}. Skipping.")
        return False

    # Convert to grayscale for face detection
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Load the Haar Cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) > 0:
        # Use the first detected face
        x, y, w, h = faces[0]
        face_center = (x + w // 2, y + h // 2)

        # Crop around the face
        left = max(face_center[0] - output_size[0] // 2, 0)
        top = max(face_center[1] - output_size[1] // 2, 0)
        right = min(left + output_size[0], image.shape[1])
        bottom = min(top + output_size[1], image.shape[0])

        cropped = image[top:bottom, left:right]
    else:
        # If no face detected, perform center cropping
        print(f"Warning: No face detected in {image_path}. Performing center crop.")
        height, width, _ = image.shape
        left = max((width - output_size[0]) // 2, 0)
        top = max((height - output_size[1]) // 2, 0)
        cropped = image[top:top + output_size[1], left:left + output_size[0]]

    # Resize and save the cropped image
    result = cv2.resize(cropped, output_size)
    cv2.imwrite(output_path, result)
    print(f"Processed image saved at: {output_path}")
    return True

# Directory paths
input_folder = os.path.abspath("C:/Users/Mike/Documents/personal-website-portfolio/public_html/projects/Unika/unika-html/unika-html/img/team")
output_folder = os.path.abspath("C:/Users/Mike/Documents/personal-website-portfolio/public_html/projects/Unika/unika-html/unika-html/img/proc_team")

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Loop through all files in the input folder
for filename in os.listdir(input_folder):
    input_path = os.path.join(input_folder, filename)

    # Skip non-image files
    if not (filename.lower().endswith(('.png', '.jpg', '.jpeg'))):
        print(f"Skipping non-image file: {filename}")
        continue

    # Define the output path
    output_path = os.path.join(output_folder, filename)

    # Process the image
    try:
        crop_and_center_face(input_path, output_path)
    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")
