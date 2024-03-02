import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_CRENDENTIALS",
    authDomain: "YOUR_FIREBASE_CRENDENTIALS",
    projectId: "YOUR_FIREBASE_CRENDENTIALS",
    storageBucket: "YOUR_FIREBASE_CRENDENTIALS",
    messagingSenderId: "YOUR_FIREBASE_CRENDENTIALS",
    appId: "YOUR_FIREBASE_CRENDENTIALS",
    measurementId: "YOUR_FIREBASE_CRENDENTIALS"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const firestore = getFirestore(app);
