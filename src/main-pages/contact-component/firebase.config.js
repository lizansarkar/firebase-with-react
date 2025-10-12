// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOTmoAkvP7V95hGn4EtkqfX-IP6A2eNA0",
  authDomain: "simple-firebase-auth-2fe4e.firebaseapp.com",
  projectId: "simple-firebase-auth-2fe4e",
  storageBucket: "simple-firebase-auth-2fe4e.firebasestorage.app",
  messagingSenderId: "534825254135",
  appId: "1:534825254135:web:1dfdcad60ea28ebc8b67f2",
  measurementId: "G-XX7FSZ9E6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);