// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXZAIuKDbKl21hKhBgTFgS0urDsNFF3Y",
  authDomain: "chatting-app-7.firebaseapp.com",
  projectId: "chatting-app-7",
  storageBucket: "chatting-app-7.firebasestorage.app",
  messagingSenderId: "606359677771",
  appId: "1:606359677771:web:86a07d6248414db81e96ce",
  measurementId: "G-30BRERKF87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
