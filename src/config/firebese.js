import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyDnZmQFwKhBq4u52QpypiIchh6HoyvpPjQ",
  authDomain: "sukemasa-bc5a3.firebaseapp.com",
  databaseURL: "https://sukemasa-bc5a3.firebaseio.com",
  projectId: "sukemasa-bc5a3",
  storageBucket: "sukemasa-bc5a3.appspot.com",
  messagingSenderId: "954200219871",
  appId: "1:954200219871:web:4ee96b22e5694937a1896a",
  measurementId: "G-3D46LL8TMB",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
