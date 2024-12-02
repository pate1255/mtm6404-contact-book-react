// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPaOxiBg4CXP480aXp5iYKluuVUcp2D14",
  authDomain: "contact-book-2db46.firebaseapp.com",
  projectId: "contact-book-2db46",
  storageBucket: "contact-book-2db46.firebasestorage.app",
  messagingSenderId: "75867682855",
  appId: "1:75867682855:web:bc9a142e223a84b752f602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;