// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7pY6i2zjROvTvcjeTVPMWrKa3UghoflY",
  authDomain: "repo-16c8a.firebaseapp.com",
  projectId: "repo-16c8a",
  storageBucket: "repo-16c8a.appspot.com",
  messagingSenderId: "190769619819",
  appId: "1:190769619819:web:5bcd74d13c085758d7a22e",
  measurementId: "G-1HM50DYP99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db, analytics }