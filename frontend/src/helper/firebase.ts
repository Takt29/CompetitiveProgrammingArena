import { initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  TwitterAuthProvider,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  appId: "x-local-emu",
  authDomain: "x-local-emu.firebaseapp.com",
  projectId: "x-local-emu",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const authProvider = new TwitterAuthProvider();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth, authProvider };
