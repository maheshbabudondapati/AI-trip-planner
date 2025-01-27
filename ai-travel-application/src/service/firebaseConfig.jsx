// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxgPnbxzgdZ8UspRBFfmy3XmmYKZdfSdA",
  authDomain: "tripplannerai-4ceb5.firebaseapp.com",
  projectId: "tripplannerai-4ceb5",
  storageBucket: "tripplannerai-4ceb5.firebasestorage.app",
  messagingSenderId: "500434324823",
  appId: "1:500434324823:web:3cdd7bc4d2df376287c212",
  measurementId: "G-LB064SJ6MY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)