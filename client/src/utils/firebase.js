
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewai-da48b.firebaseapp.com",
  projectId: "interviewai-da48b",
  storageBucket: "interviewai-da48b.firebasestorage.app",
  messagingSenderId: "492751903922",
  appId: "1:492751903922:web:cd1008fa9d3479f53c3dab",
  measurementId: "G-SR61NNV8FM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
