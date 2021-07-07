import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD--dDkyfZV2uDoPY4hwJ8Lv03grfeSwl4",
    authDomain: "snapchat-clone-2104.firebaseapp.com",
    projectId: "snapchat-clone-2104",
    storageBucket: "snapchat-clone-2104.appspot.com",
    messagingSenderId: "138941733699",
    appId: "1:138941733699:web:8875f2ffd85809faf66df6",
    measurementId: "G-BSEYPF4WH6"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();//popup provider

export {db,storage,auth,provider}
