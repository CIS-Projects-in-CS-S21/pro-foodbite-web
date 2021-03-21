import { useContext, createContext, useState, useEffect } from "react";
import firebase, { auth, } from "../firebase.js"

// auth (user), restaurant info  
export const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {

  const [user, set_user] = useState();
  const [userDb, setUserDb] = useState();
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    // set state observer w/ current user or null 

    const unsubscribe = auth.onAuthStateChanged((current_user) => {
      set_user(current_user);
      set_loading(false);

      if (current_user)
        getUserData();
    })

    return unsubscribe;
  }, []);

  const getUserData = () => {
    // get the user document inside the db
    // and add it to the user object
    if (user && userDb === undefined) {
      firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            setUserDb(doc.data());
          }
        })
        .catch(err => {
          console.log("unable to get user table data", err);
        });
    }
  }


  const sign_up_with_email_password = ((email, password) => {
    // create new account
    return auth.createUserWithEmailAndPassword(email, password)
  });

  const sign_in_with_email_password = ((email, password) => {
    // sign-in exisiting user 
    return auth.signInWithEmailAndPassword(email, password);
  });

  const sign_in_with_google = (() => {
    // sign-in with google
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  });

  const sign_in_with_facebook = (() => {
    // sign-in with facebook
    const provider = new firebase.auth.FacebookAuthProvider();
    return auth.signInWithPopup(provider);
  });


  const sign_out = () => auth.signOut();

  const assignRestaurantToUser = (restaurantId) => {
    if (user) {
      // get the user object in the db
      return firebase.firestore()
        .collection("users")
        .doc(user.uid)
        .update({ ownedRestaurants: firebase.firestore.FieldValue.arrayUnion(restaurantId) });
    }
    return null;
  };

  // change password todo
  // change ... todo 

  const values = {
    user,
    sign_up_with_email_password,
    sign_in_with_email_password,
    sign_in_with_google,
    sign_in_with_facebook,
    sign_out,
    assignRestaurantToUser,
    userDb,
  }

  return (
    <UserContext.Provider value={values}>
      {!loading && children}
    </UserContext.Provider>
  )
};


/*
  const [restaurant, set_restaurant] = useState({
    id: "",
    ownerId: "",
    name: "",
    image: "",
    description: "",
    menu: [],
    available: false,
    profile: {}
  });
*/