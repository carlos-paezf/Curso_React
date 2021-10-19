// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTOU7gNFH_rjkIS4IVA5-y8gVN3ZgeoS4",
    authDomain: "crud-react-226db.firebaseapp.com",
    projectId: "crud-react-226db",
    storageBucket: "crud-react-226db.appspot.com",
    messagingSenderId: "514854200161",
    appId: "1:514854200161:web:a8a186f1e28e5f3085db20"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const googleAuthProvider = new GoogleAuthProvider() 


export { app, db, googleAuthProvider }