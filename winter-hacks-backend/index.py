import cv2
import numpy as np
import os
from google.cloud import storage
from flask import Flask
from flask import request
from uuid import uuid4

app = Flask(__name__)

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)
    blob.make_public()

    os.remove('blurred_video.mp4')
    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )

@app.route("/upload")
async def upload():
    link = request.args.get('link')
    video = cv2.VideoCapture('https://storage.googleapis.com/blur-video-posts/e5da8e1214c92182d2cf39900')
    face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

    kernel = np.ones((80, 80), np.float32) / 6400

    frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = video.get(cv2.CAP_PROP_FPS)

    fourcc = cv2.VideoWriter_fourcc(*'X264')
    out = cv2.VideoWriter("blurred_video.mp4", fourcc, fps, (frame_width, frame_height))
    
    while (video.isOpened()):
        success, frame = video.read()

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            face = frame[y:y+h, x:x+w]

            blurred_face = cv2.filter2D(face, -1, kernel)

            frame[y:y+h, x:x+w] = blurred_face

        out.write(frame)

    video.release()
    out.release()

    # Destroy all windows
    cv2.destroyAllWindows()
    
    upload_blob('blur-video-posts', "blurred_video.mp4", "blurred_video.mp4")
    return "Done"

app.run(port=3000)