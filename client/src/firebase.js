// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-807c2.firebaseapp.com",
  projectId: "mern-estate-807c2",
  storageBucket: "mern-estate-807c2.appspot.com",
  messagingSenderId: "497724695035",
  appId: "1:497724695035:web:c28c8f4786d252df81ab5e",
  measurementId: "G-1NMFLK6JKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);