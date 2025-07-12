import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAamfg8AzDbLCl3DXVjuZ30cJYkMX-SGhs",
  authDomain: "todo-69.firebaseapp.com",
  projectId: "todo-69",
  storageBucket: "todo-69.firebasestorage.app",
  messagingSenderId: "1062125434569",
  appId: "1:1062125434569:web:a269aee7c5a1284ecf7f18",
  measurementId: "G-NF7MDF1V4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };