import {} from "firebase/firestore";
//import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(tipestamp) {
  if (tipestamp) {
    const date = new Date(tipestamp.toDate());

    const day = date.toLocaleDateString("en-US");
    const hour = date.toLocaleTimeString("en-US");

    return `${day} at ${hour}`;
  }
}
