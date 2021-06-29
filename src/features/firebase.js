import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD--dDkyfZV2uDoJ8Lv03grfeSwl4",
    authDomain: "snapchat.firebaseapp.com",
    projectId: "snapchat",
    storageBucket: "snapchatmmm.appspot.com",
    messagingSenderId: "131733699",
    appId: "1:138941733699:web:8875f85809faf66df6",
    measurementId: "G-BSE4WH6"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();//popup provider

export {db,storage,auth,provider}
