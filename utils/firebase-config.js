// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, deleteDoc } from 'firebase/firestore'; // Añade deleteDoc al import

const firebaseConfig = {
  apiKey: "AIzaSyC82e-tB5jegLhbOFsjaMRsqKwb6eQE7OI",
  authDomain: "caremonitorreactnative.firebaseapp.com",
  projectId: "caremonitorreactnative",
  storageBucket: "caremonitorreactnative.appspot.com",
  messagingSenderId: "391244484880",
  appId: "1:391244484880:web:98fe0ed936e96207b59595",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(); // Inicializa Firestore

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, deleteDoc }; // Exporta también deleteDoc
