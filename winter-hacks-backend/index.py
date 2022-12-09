import cv2
import numpy as np
from ffpyplayer.player import MediaPlayer

# Load the video file
video = cv2.VideoCapture("yash.mp4")
player = MediaPlayer("song.wav")

# Create a Haar Cascade classifier to detect faces
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

# Create a kernel for blurring the image
kernel = np.ones((20, 20), np.float32) / 400

# Get the video's frame size and number of frames per second
frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = video.get(cv2.CAP_PROP_FPS)

# Create a VideoWriter object to save the blurred video
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter("blurred_video.mp4", fourcc, fps, (frame_width, frame_height))

# Read each frame from the video
while True:
    # Read the frame
    success, frame = video.read()
    audio_frame, val = player.get_frame()

    # If there are no more frames in the video, exit the loop
    if not success:
        break

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # For each face detected
    for (x, y, w, h) in faces:
        # Crop the face from the frame
        face = frame[y:y+h, x:x+w]

        # Blur the face using the kernel
        blurred_face = cv2.filter2D(face, -1, kernel)

        # Replace the original face in the frame with the blurred face
        frame[y:y+h, x:x+w] = blurred_face

    # Write the frame to the output video
    out.write(frame)
    if val != 'eof' and audio_frame is not None:
        #audio
        img, t = audio_frame

# Release the video capture and writer objects
video.release()
out.release()

# Destroy all windows
cv2.destroyAllWindows()