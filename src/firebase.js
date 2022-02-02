// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIEBzWvqFlb1iuuYqkDLr5nmUbZ9brcOQ",
  authDomain: "sparta-react-basic-803ec.firebaseapp.com",
  projectId: "sparta-react-basic-803ec",
  storageBucket: "sparta-react-basic-803ec.appspot.com",
  messagingSenderId: "321325006956",
  appId: "1:321325006956:web:6740c11779122e7ab95849",
  measurementId: "G-1SVH43EC2R"
};
initializeApp(firebaseConfig);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);



export const db = getFirestore();