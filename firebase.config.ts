import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJYWSp8SQ1tfVQtZasxLOBAQ8OlmcN6B0",
  authDomain: "bike-mechanic-app.firebaseapp.com",
  projectId: "bike-mechanic-app",
  storageBucket: "bike-mechanic-app.appspot.com",
  messagingSenderId: "503025848117",
  appId: "1:503025848117:web:58607d8e0ebdf0da22467c",
  measurementId: "G-WTHZBLMJVG",
};

const config = {
  name: "Tangram Educação",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

//export const db = firebase.firestore();
//export const auth = firebase.auth();
