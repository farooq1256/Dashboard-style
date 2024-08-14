// src/config/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaVB8nTONwjNMKVbr9LiAZ3m0S2Kalt2U",
  authDomain: "dashbord-app-e8390.firebaseapp.com",
  projectId: "dashbord-app-e8390",
  storageBucket: "dashbord-app-e8390.appspot.com",
  messagingSenderId: "1064817409375",
  appId: "1:1064817409375:web:4de6c3fc854a29a586caea",
};

// Initialize Firebase and export Firestore and Storage
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
