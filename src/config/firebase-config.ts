import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAVW46AmowgFeLKtw60hhf--R4F30JCW8s',
  authDomain: 'planto-v1.firebaseapp.com',
  projectId: 'planto-v1',
  storageBucket: 'planto-v1.appspot.com',
  messagingSenderId: '291970194958',
  appId: '1:291970194958:web:9b3efef217caac8f54265f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
