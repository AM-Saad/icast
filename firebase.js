
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDvO67PaCyyMaL41_NC1gHVpnyRp5M2EAo",
    authDomain: "icast-fae97.firebaseapp.com",
    projectId: "icast-fae97",
    storageBucket: "gs://icast-fae97.appspot.com",
    messagingSenderId: "123855467444",
    appId: "1:123855467444:web:ee3255b70c22bb008df8e1",
    measurementId: "G-2MK5CVB4PQ"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
