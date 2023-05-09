# A Litter Heatmap

This project uses a machine learning model to detect trash in images captured by a camera connected to a Raspberry Pi 4. The model was prepared using Edge Impulse and has an accuracy of 85% and is deployed using a TFLite interpreter. When trash is detected, the location is sent to a Firebase account and displayed on a Heatmap using react-leaflet.js, which uses OpenStreetMap.The project also includes code for capturing an image using OpenCV and a Raspberry Pi camera, sending data to Firebase, and displaying trash location on a heatmap using React Leaflet and OpenStreetMap.

## Requirements

- Raspberry Pi 4
- Camera
- GPS module
- OpenCV
- TensorFlow Lite
- Firebase

## Getting Started

To get started with this project, you will need the following:

- A Raspberry Pi 4 with camera and GPS modules
- The `final_pred2.py` file in this repository
- A Firebase account
- The TensorFlow Lite model file `my_model.tflite`
- Edge Impulse account for model preparation and dataset creation
- Install all node modules necessary to run the website

To prepare the machine learning model and dataset, follow [this link](https://studio.edgeimpulse.com/studio/210762) to Edge Impulse.This is where I have written the code for machine learning model preparation.

## Setup

1. Attach the camera and GPS module to the Raspberry Pi 4.
2. Install OpenCV, TensorFlow Lite, and Firebase on the Raspberry Pi 4.
3. Clone the repository.
4. Make sure `final_pred2.py` and `my_model.tflite` are in the same directory.
5. Run the `final_pred2.py` file.

## Running the Code

To run the code, make sure the Raspberry Pi is connected to the camera and GPS modules.

## References

- [Firebase](https://firebase.google.com/)
- [Edge Impulse](https://www.edgeimpulse.com/)

