import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDf1VVIJDBObbq3hfA8FSvsqR2gWmEmCR0",
    authDomain: "finalproject-80363.firebaseapp.com",
    databaseURL: "https://finalproject-80363.firebaseio.com",
    projectId: "finalproject-80363",
    storageBucket: "finalproject-80363.appspot.com",
    messagingSenderId: "1019383261761"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { 
    auth, provider
};