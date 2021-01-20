import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPCjKQ2dilMT745ES3jOP1h9GpDzc5vNM",
    authDomain: "inbox-daf98.firebaseapp.com",
    projectId: "inbox-daf98",
    storageBucket: "inbox-daf98.appspot.com",
    messagingSenderId: "306537746626",
    appId: "1:306537746626:web:d3ec76ab5ec1423e85eb5b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
