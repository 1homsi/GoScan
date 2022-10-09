import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBH50gcJAnS0O60mFNqu3RuNVNN3ZO34EI",
    authDomain: "inventorydb-23174.firebaseapp.com",
    projectId: "inventorydb-23174",
    storageBucket: "inventorydb-23174.appspot.com",
    messagingSenderId: "810381392343",
    appId: "1:810381392343:web:1ca95b4f0912f7ae803392"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    // eslint-disable-next-line no-unused-vars
    app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
db.settings({ experimentalForceLongPolling: true, merge: true });


export { auth, db, storage, firebase };