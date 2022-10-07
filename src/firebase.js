import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAsL6TS9-W4eocC5_s48Ht7uszmN1MgM94",
    authDomain: "rhucarpool.firebaseapp.com",
    projectId: "rhucarpool",
    storageBucket: "rhucarpool.appspot.com",
    messagingSenderId: "153673025128",
    appId: "1:153673025128:web:9481d12dabe6a3c9589ddd"
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