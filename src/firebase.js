import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA_ROokAMBFrtDUPUOBbbWnMGs0tPrqU7U",
    authDomain: "whatsapp-mern-21da1.firebaseapp.com",
    projectId: "whatsapp-mern-21da1",
    storageBucket: "whatsapp-mern-21da1.appspot.com",
    messagingSenderId: "737617953412",
    appId: "1:737617953412:web:05acac7f46acb75247f8d1"
  });

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };