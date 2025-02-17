import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy4S3BBl-mhAC6s6zWSquSrJ8XKc1mMbM",
  authDomain: "projecte-llibres.firebaseapp.com",
  projectId: "projecte-llibres",
  storageBucket: "projecte-llibres.firebasestorage.app",
  messagingSenderId: "895169029443",
  appId: "1:895169029443:web:861a7221e2ef10d109bbf6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };