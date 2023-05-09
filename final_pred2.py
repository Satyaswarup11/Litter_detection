import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import cv2
import numpy as np
import tensorflow as tf
import serial
import json


#port = '/dev/ttyAMA0'
port='/dev/serial0'

ser = serial.Serial(port, baudrate=9600, timeout=0.5)

# Load the TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path="/home/thomas/Desktop/final/my_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()


cred = credentials.Certificate('./config.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

cap = cv2.VideoCapture(0)
cap.set(3, 160)  # set the width of the frame
cap.set(4, 160)  # set the height of the frame

time.sleep(2)  # Camera warm-up time

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    # Resize the frame to the input size of the model
    img = cv2.resize(frame, (160, 160))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)

    # Set the input tensor
    interpreter.set_tensor(input_details[0]['index'], img)

    # Perform inference
    interpreter.invoke()

    # Get the output tensor
    output_array = interpreter.get_tensor(output_details[0]['index'])


    # Print the predicted class
    if output_array[0][0]>0.5:
        print("Not Trash")
    else:
        print("Trash")
        data = ser.readline().decode('utf-8')
        if data[0:6] == '$GPRMC':
            values = data.split(",")
            if values[2] == 'V':
                print("No GPS data available")
            else:
                lat = values[3] + " " + values[4]
                lon = values[5] + " " + values[6]
                gps_data = {"latitude": lat, "longitude": lon}
                print(json.dumps(gps_data))

                       # Create a reference to the cities collection
        collection_ref = db.collection(u'TrashLocation')

        # Create a query against the collection
        query_ref = collection_ref.where(u'latitude', u'==', lat).where(u'longitude', u'==', lng)
        docs = query_ref.get()
        print("docs", docs)
        if len(docs) == 0:
            # Write the GPS location to a Firestore document
            doc_ref = db.collection('TrashLocation').document()
            data = {
                'latitude': lat,
                'longitude': lng
            }
            doc_ref.set(data)
            print("Data sent")
        else:
            print("already present")

    time.sleep(8)  # Wait for 8 seconds before capturing the next image
