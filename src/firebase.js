import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import { Redirect } from "react-router";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiGUz_pHsRQAc6CYCGLhd5ek9H3wKK4Pg",
  authDomain: "foodbite-10690.firebaseapp.com",
  projectId: "foodbite-10690",
  storageBucket: "foodbite-10690.appspot.com",
  messagingSenderId: "474005837683",
  appId: "1:474005837683:web:cd6130d854a3d8f766d706",
  measurementId: "G-4DQ35CNG6V"
};

export const providers = {
  google_provider: new firebase.auth.GoogleAuthProvider(),
  facebook_provider: new firebase.auth.FacebookAuthProvider(),
}

export const signInWithEmailPassword = ( email, password ) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      // todo set auth true, re-render app.js 
      // redirect 

    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message); 
    });
}; 

// sign-out 
export const signOut = () => {
  firebase.auth().signOut()
  .then(() => {
    console.log("successful sign-out")

    // redirect
  })
  .catch( (error) => {
    console.log(error.code);
    console.log(error.message); 
  })
}; 


// sign-in with google

// sign-in with fb

// create user doc

// get user doc

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase; 