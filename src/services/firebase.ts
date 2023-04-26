import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB-XOEw0yZSU8CMBQMUhFqxPJPdAKjjG7c',
  authDomain: 'tickets-54909.firebaseapp.com',
  projectId: 'tickets-54909',
  storageBucket: 'tickets-54909.appspot.com',
  messagingSenderId: '43130980622',
  appId: '1:43130980622:web:c2fd98c5d97e33285bef5f',
  measurementId: 'G-BB7XLBJDZH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
