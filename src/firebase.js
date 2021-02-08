import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTIbU_vQ8lUo9E8wMh9m-6b_DlRUiowAE",
    authDomain: "instagram-web-b440f.firebaseapp.com",
    projectId: "instagram-web-b440f",
    storageBucket: "instagram-web-b440f.appspot.com",
    messagingSenderId: "121771444843",
    appId: "1:121771444843:web:fa4bd866a4a611ea047f2e",
    measurementId: "G-X5B83KPB9V"
  });

  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage();

  export {db, auth, storage};
