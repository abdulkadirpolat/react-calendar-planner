import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXZODYsLzFY4qQsp0sExNQF0XZqUC8bVk",
  authDomain: "planning-calendar-9123b.firebaseapp.com",
  projectId: "planning-calendar-9123b",
  storageBucket: "planning-calendar-9123b.appspot.com",
  messagingSenderId: "40699258112",
  appId: "1:40699258112:web:52a29b75b256a8025fffe5",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
 
export const auth = getAuth(firebaseApp);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword }
 
 
