import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBbESP-cu81RZKFseAtG88TOvr98y9rUFQ",
    authDomain: "todo-app1-68560.firebaseapp.com",
    projectId: "todo-app1-68560",
    storageBucket: "todo-app1-68560.appspot.com",
    messagingSenderId: "74205826713",
    appId: "1:74205826713:web:9d43582b723757e177b208",
    measurementId: "G-ML9R9G6R5P"
});

const db = firebaseApp.firestore();

export default db;