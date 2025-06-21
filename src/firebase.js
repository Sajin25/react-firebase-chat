// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7BAOKpPAUowCR9WvRXRnZl_L35PffgEU",
  authDomain: "react-chat-app-60731.firebaseapp.com",
  projectId: "react-chat-app-60731",
  storageBucket: "react-chat-app-60731.firebasestorage.app",
  messagingSenderId: "1024258717463",
  appId: "1:1024258717463:web:585ffc7bb9bc95326ba952",
  measurementId: "G-17P05ZXCBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
