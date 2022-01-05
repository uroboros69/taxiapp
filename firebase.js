import firebase from "firebase";


const firebaseConfig = {

    apiKey: "AIzaSyDk0c_ebFfEkX2tyCG4pBMfbMUyEwYlFig",
  
    authDomain: "chataxi-e5873.firebaseapp.com",
  
    projectId: "chataxi-e5873",
  
    storageBucket: "chataxi-e5873.appspot.com",
  
    messagingSenderId: "544849511431",
  
    appId: "1:544849511431:web:fc1913ea13faccdab196a2",
  
    measurementId: "G-BJTQSXRH3M"
  
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};
  
