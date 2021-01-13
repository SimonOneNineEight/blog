import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCCDNYPR00cGC3tBGq11Xrr4920vdgXAGc",
  authDomain: "simon198-blog.firebaseapp.com",
  projectId: "simon198-blog",
  storageBucket: "simon198-blog.appspot.com",
  messagingSenderId: "9042449024",
  appId: "1:9042449024:web:b8fd1802ab355e47b30c65",
  measurementId: "G-B61GH5ZNVL",
};

firebase.initializeApp(config);
const db = firebase.database();
export default db;
