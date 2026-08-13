import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVpkBMhrorVG1fReafCYp7QBgriU7LkPg",
  authDomain: "sinaq-f6a5b.firebaseapp.com",
  projectId: "sinaq-f6a5b",
  storageBucket: "sinaq-f6a5b.firebasestorage.app",
  messagingSenderId: "797215937728",
  appId: "1:797215937728:web:e72de4d6e2fa1d51ca0925",
  measurementId: "G-LDERHPYWJV",
};

const app = initializeApp(firebaseConfig);

let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
    experimentalForceLongPolling: true,
  });
} catch (e) {
  firestoreDb = getFirestore(app);
}

export const db = firestoreDb;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
