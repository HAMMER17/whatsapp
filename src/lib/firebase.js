
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjw13dzd1RHnE__VsS3YfJH7jRQRvpC6w",
  authDomain: "whatsapp-58a21.firebaseapp.com",
  projectId: "whatsapp-58a21",
  storageBucket: "whatsapp-58a21.appspot.com",
  messagingSenderId: "480071062206",
  appId: "1:480071062206:web:bb215275e79c7d94b444ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)