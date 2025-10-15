// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfLvTOD0lW50pGxbtvEBEG3mTycjWi8BM",
  authDomain: "react-firebase-auth-b747d.firebaseapp.com",
  projectId: "react-firebase-auth-b747d",
  storageBucket: "react-firebase-auth-b747d.firebasestorage.app",
  messagingSenderId: "922688150129",
  appId: "1:922688150129:web:d4ce73b127e1efc23b19d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);