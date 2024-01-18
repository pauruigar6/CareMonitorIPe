// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';  // Agregado para la base de datos

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
const database = getDatabase(firebaseApp);  // Agregado para la base de datos

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, database };
