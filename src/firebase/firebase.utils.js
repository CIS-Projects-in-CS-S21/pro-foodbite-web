import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {}; 

export const providers = {
  google_provider: new firebase.auth.GoogleAuthProvider(),
  facebook_provider: new firebase.auth.FacebookAuthProvider()
}; 

// export auth ... 
// export firestore ... 
export default firebase; 