import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAuu0jfeTUqalNPLbjnYwRZX_sbMh8IbsY",
    authDomain: "unichat-3edb8.firebaseapp.com",
    databaseURL: "https://unichat-3edb8.firebaseio.com",
    projectId: "unichat-3edb8",
    storageBucket: "unichat-3edb8.appspot.com",
    messagingSenderId: "520360084263"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
