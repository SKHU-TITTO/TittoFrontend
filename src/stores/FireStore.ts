// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import QuilllEditor from "../components/board/QuillEditor";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUwwhUUTv8n9D5T0syMNKryy02vKeOPac",
  authDomain: "titto-60f14.firebaseapp.com",
  projectId: "titto-60f14",
  storageBucket: "titto-60f14.appspot.com",
  messagingSenderId: "219286922206",
  appId: "1:219286922206:web:740d8bf64908948195334f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export default app;
