// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoQjL3zv40bDmPZcT457TbFa5dGbqih2U",
  authDomain: "note-taking-app-1c792.firebaseapp.com",
  projectId: "note-taking-app-1c792",
  storageBucket: "note-taking-app-1c792.firebasestorage.app",
  messagingSenderId: "401699676374",
  appId: "1:401699676374:web:36c208b8340a7b18f5e977",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
