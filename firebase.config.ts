import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJYWSp8SQ1tfVQtZasxLOBAQ8OlmcN6B0",
  authDomain: "bike-mechanic-app.firebaseapp.com",
  projectId: "bike-mechanic-app",
  storageBucket: "bike-mechanic-app.appspot.com",
  messagingSenderId: "503025848117",
  appId: "1:503025848117:web:58607d8e0ebdf0da22467c",
  measurementId: "G-WTHZBLMJVG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
