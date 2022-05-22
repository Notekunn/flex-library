import { initializeApp } from 'firebase/app';
export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
export const firebaseConfig = {
  apiKey: 'AIzaSyBhbZy1Au_kCKwNeUzp7aE0U3HfZkY2GaM',
  authDomain: 'storage-7c69b.firebaseapp.com',
  projectId: 'storage-7c69b',
  storageBucket: 'storage-7c69b.appspot.com',
  messagingSenderId: '908686838783',
  appId: '1:908686838783:web:a0ad83dec97fae7cac35ca',
  measurementId: 'G-90KVPXWJC0',
};

const app = initializeApp(firebaseConfig);
