import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCnYiED5s7qbiUhu6GB4pK0Wwwy9nkY3m8",
  authDomain: "eduquest-963b1.firebaseapp.com",
  projectId: "eduquest-963b1",
  storageBucket: "eduquest-963b1.firebasestorage.app",
  messagingSenderId: "672314606069",
  appId: "1:672314606069:web:0d95797f5661792030a0bc"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)