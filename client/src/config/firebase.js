// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBukuFRISjl7r3UzAtwP5KVgw9MCKYF8Gk",
  authDomain: "chatting-app-e00ed.firebaseapp.com",
  projectId: "chatting-app-e00ed",
  storageBucket: "chatting-app-e00ed.firebasestorage.app",
  messagingSenderId: "238956251871",
  appId: "1:238956251871:web:562d7d28ea1936b5bcf76a",
  measurementId: "G-064JR56RSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
