import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Use initializeFirestore with long polling to bypass potential network/proxy issues
const firestoreSettings = { experimentalForceLongPolling: true };
const firestoreDatabaseId = import.meta.env.VITE_FIRESTORE_DATABASE_ID;
export const db = firestoreDatabaseId
  ? initializeFirestore(app, firestoreSettings, firestoreDatabaseId)
  : initializeFirestore(app, firestoreSettings);

export const auth = getAuth(app);
