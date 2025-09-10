// Fix: Use Firebase v9 compat libraries to support v8 API syntax.
// This resolves the "no exported member" errors by providing the namespaced firebase object.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// --- IMPORTANT ---
// The Firebase configuration below is using placeholder values. This allows
// the application to load without crashing. To enable Firebase functionality
// (like login and onboarding), you MUST replace these placeholders with your
// actual Firebase project's configuration.
//
// You can find your configuration in your Firebase project settings:
// Project Settings > General > Your apps > Web app > SDK setup and configuration
//
// In a real-world application, these keys should be stored securely using
// environment variables and a build tool (e.g., import.meta.env.VITE_FIREBASE_API_KEY).
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

// A check to see if the config is still using placeholder values
const isConfigured = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PASTE_");

// Fix: Use types from the v8 compat library.
let app: firebase.app.App | null = null;
let auth: firebase.auth.Auth | null = null;
let firestore: firebase.firestore.Firestore | null = null;
let storage: firebase.storage.Storage | null = null;

if (isConfigured) {
  try {
    // Fix: Use v8 compat initialization methods.
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    firestore = firebase.firestore();
    storage = firebase.storage();
  } catch (e) {
    console.error("Firebase initialization error:", e);
  }
} else {
    // This warning will appear in the browser console if Firebase keys are not set.
    console.warn("Firebase is not configured. Please add your project credentials to `firebase.ts` to enable login and other features.");
}

export { app, auth, firestore, storage };