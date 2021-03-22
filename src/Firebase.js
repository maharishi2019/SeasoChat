import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAhVp8NTQu7gDLhhnAEpxucWDkjvWXsMvA",
    authDomain: "seasochat.firebaseapp.com",
    projectId: "seasochat",
    storageBucket: "seasochat.appspot.com",
    messagingSenderId: "821005952558",
    appId: "1:821005952558:web:3ce9afcd866efbbbd0e1bf",
    measurementId: "G-BG7M47D2PC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase; 