// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , set } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {db , auth , storage , set , refStorage , createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , signOut};