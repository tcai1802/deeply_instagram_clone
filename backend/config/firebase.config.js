
const { initializeApp } = require('firebase/app');
const {getFirestore, collection} = require('firebase/firestore');
const  {getMessaging} =  require('firebase/messaging');

const firebaseConfig = {
  apiKey: "AIzaSyCZZ9ys77HQj-peRZLG5CPihHj0lL5U2WA",
  authDomain: "social-media-fb35b.firebaseapp.com",
  projectId: "social-media-fb35b",
  storageBucket: "social-media-fb35b.appspot.com",
  messagingSenderId: "916831591136",
  appId: "1:916831591136:web:57e4fd8ce36d91874b8e85",
  measurementId: "G-913X3DMLFG"
};



//const db = firebase.firestore()
//const User = db.collection("Users");
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
//const messaging = getMessaging(app)



const User = collection(db, "Users")
module.exports = User;