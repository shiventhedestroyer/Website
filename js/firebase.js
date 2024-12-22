// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQZU93WtpWp8n5ADvO8DFIVre_g_EOgsA",
    authDomain: "shivwebsite-e7ec5.firebaseapp.com",
    projectId: "shivwebsite-e7ec5",
    storageBucket: "shivwebsite-e7ec5.firebasestorage.app",
    messagingSenderId: "1074872877454",
    appId: "1:1074872877454:web:242eb352a148661f6aa4df",
    measurementId: "G-MLXT60F5Y6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Debugging log
console.log("Firebase initialized:", app.name);
