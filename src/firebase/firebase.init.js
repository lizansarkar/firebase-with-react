// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_4ZVAOIZ0ZcNBW1GFWouNIJV-HcFOnOE",
  authDomain: "email-password-authentic-951c7.firebaseapp.com",
  projectId: "email-password-authentic-951c7",
  storageBucket: "email-password-authentic-951c7.firebasestorage.app",
  messagingSenderId: "360166242521",
  appId: "1:360166242521:web:d613a6a2c17666ae6466c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
