//This is how we mirror the state of our app to firebase
import Rebase from 're-base';
//The actual firebase pkg.
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACP1RK2dgEtnz7htKVW0-Z4G2og2wSHFU",
    authDomain: "catch-of-the-day-pizzati.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-pizzati.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;

