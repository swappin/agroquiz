// database/firebaseDb.js

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPUjSgxlpPWJQpbOm7Baqj_sjoxf0GEvI",
    authDomain: "agroquiz-c1579.firebaseapp.com",
    databaseURL: "https://agroquiz-c1579.firebaseio.com",
    projectId: "agroquiz-c1579",
    storageBucket: "agroquiz-c1579.appspot.com",
    messagingSenderId: "627975228086",
    appId: "1:627975228086:web:ffa359b005e4c5e805b417"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();


export default firebase;