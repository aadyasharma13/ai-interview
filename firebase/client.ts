import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_a-iRxeemYlPe-YQ8YB7h4xLQ7uno82g",
  authDomain: "prepwise-4e25b.firebaseapp.com",
  projectId: "prepwise-4e25b",
  storageBucket: "prepwise-4e25b.appspot.com",
  messagingSenderId: "460323936960",
  appId: "1:460323936960:web:ad1e97cd4638e95158ab25",
  measurementId: "G-T6VTP155F2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);