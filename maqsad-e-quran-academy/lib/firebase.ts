import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXsluYPqqyY4ZY0sxDTb2Se1a-7bT1-LQ",
  authDomain: "maqsad-e-quran-academy.firebaseapp.com",
  projectId: "maqsad-e-quran-academy",
  storageBucket: "maqsad-e-quran-academy.firebasestorage.app",
  messagingSenderId: "571208938343",
  appId: "1:571208938343:web:df9573c1cbb0b70e3e75c2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;