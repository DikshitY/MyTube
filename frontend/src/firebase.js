import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mytube-b639c.firebaseapp.com",
  projectId: "mytube-b639c",
  storageBucket: "mytube-b639c.firebasestorage.app",
  messagingSenderId: "544291165486",
  appId: "1:544291165486:web:20a066a83f21fb2f9696bf",
};

const app = initializeApp(firebaseConfig);

export default app;