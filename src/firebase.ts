import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCSBuboeImSVIA42UO1YFQ7rzwcDiJZ3ik',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'jobfilter-493219.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'jobfilter-493219',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'jobfilter-493219.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '299748081651',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:299748081651:web:5e4d59b6a8d34b8c631c86',
};

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with long polling to bypass potential network/proxy issues
const firestoreSettings = { experimentalForceLongPolling: true };
const firestoreDatabaseId = import.meta.env.VITE_FIRESTORE_DATABASE_ID || 'ai-studio-a33d68a2-6566-4935-9e6a-6d37cb4e8a74';
export const db = firestoreDatabaseId
  ? initializeFirestore(app, firestoreSettings, firestoreDatabaseId)
  : initializeFirestore(app, firestoreSettings);

export const auth = getAuth(app);
