// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAamfg8AzDbLCl3DXVjuZ30cJYkMX-SGhs",
  authDomain: "todo-69.firebaseapp.com",
  projectId: "todo-69",
  storageBucket: "todo-69.firebasestorage.app",
  messagingSenderId: "1062125434569",
  appId: "1:1062125434569:web:a269aee7c5a1284ecf7f18",
  measurementId: "G-NF7MDF1V4Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };