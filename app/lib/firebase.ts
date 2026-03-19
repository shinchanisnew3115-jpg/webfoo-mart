import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tumhari Real Config Keys
const firebaseConfig = {
  apiKey: "AIzaSyBOtXyz2ofL4coqBdIsIjIUZPWfwsyce5A",
  authDomain: "webfoo-mart.firebaseapp.com",
  projectId: "webfoo-mart",
  storageBucket: "webfoo-mart.firebasestorage.app",
  messagingSenderId: "254961125661",
  appId: "1:254961125661:web:b58dc046dca30e19ec39f4",
  measurementId: "G-Q32SC6D7BL"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);