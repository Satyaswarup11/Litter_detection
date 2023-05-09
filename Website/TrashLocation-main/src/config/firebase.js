// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvHMK_57M-khuxOYFHaD88ORt6cWpPNsc",
  authDomain: "roadside-litter-detection.firebaseapp.com",
  projectId: "roadside-litter-detection",
  storageBucket: "roadside-litter-detection.appspot.com",
  messagingSenderId: "181397076252",
  appId: "1:181397076252:web:182472546e22c2066122d9",
  measurementId: "G-JXFD7T1HTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db= getFirestore(app);