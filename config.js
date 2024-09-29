const fireBase = require('firebase/app')
const fireStore = require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBEc1ksW4UZH4CZ3gY1_QhA4WayHTZn54Y",
    authDomain: "crud-firestore-fff1f.firebaseapp.com",
    projectId: "crud-firestore-fff1f",
    storageBucket: "crud-firestore-fff1f.appspot.com",
    messagingSenderId: "649200232804",
    appId: "1:649200232804:web:bb417e8fe7a1c1c3c1b271",
    measurementId: "G-JDEPS69DFX"
};

const fireBaseApp = fireBase.initializeApp(firebaseConfig);
const db = fireStore.getFirestore(fireBaseApp);

module.exports = db;