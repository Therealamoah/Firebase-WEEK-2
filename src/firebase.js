//  Import Firebase functions
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

//  My Firebase config ( from Firebase Web App)
const firebaseConfig = {
  apiKey: "AIzaSyBAiHl4asEARZOmIS3tlTRPJwy2RHoPhb0",
  authDomain: "student-list-20293.firebaseapp.com",
  projectId: "student-list-20293",
  storageBucket: "student-list-20293.firebasestorage.app",
  messagingSenderId: "1013690905933",
  appId: "1:1013690905933:web:eaf60ba1ff9493439cb304",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Initialize Firestore
const db = getFirestore(app);

// initiate auth
const auth = getAuth(app);

// export auth
export { auth };

//  Export Firestore functions so your store can use them
export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };
