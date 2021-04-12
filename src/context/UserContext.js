import { useContext, createContext, useState, useEffect } from "react";
import firebase, { auth, firestore } from "../firebase.js"

// auth (user), restaurant info  
export const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }) => {

  const [user, set_user] = useState();
  const [userDb, setUserDb] = useState(null);
  const [loading, set_loading] = useState(true);
  const [restaurant, set_restaurant] = useState(null); 

  useEffect(() => {
    // set state observer w/ current user or null 

    const unsubscribe = auth.onAuthStateChanged((current_user) => {

      if(current_user){
        
        firestore
          .collection("restaurants")
          .where("ownerId", "==", current_user.uid)
          .get()
          .then( snapshot => {
            if(snapshot.empty) set_restaurant(null);
            else set_restaurant(snapshot.docs[0].data());
          }); 
      }

      set_user(current_user);
      set_loading(false);

      //console.log('auth change', current_user);
    })

    return unsubscribe;
  }, []);


  const getUserData = (force) => {
    // get the user document inside the db
    // and add it to the user object

    if ((user !== undefined && user !== null) && (userDb === null || force)) {
      console.log('getting user data forced:', force === undefined ? false : force);
      set_loading(true);
      firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            // userDb = doc.data();
            setUserDb(doc.data())
          }
        })
        .catch(err => {
          console.log("unable to get user table data", err);
        })
        .finally(() => {
          //console.log('done', userDb);
          
          set_loading(false)
        });
    } else {
      //console.log('already got user data', userDb)
    }

  }

  useEffect(getUserData, [user, userDb]);

  // const get_restaurant = () => {
  //   set_loading(true);
  //   if (user !== undefined && user !== null) {

  //     firestore
  //       .collection("restaurants")
  //       .where("ownerId", "==", user.uid)
  //       .get()
  //       .then( snapshot => {
  //         if(snapshot.empty) set_restaurant(null);
  //         else set_restaurant(snapshot.docs[0].data());
  //       }); 
  //   }

  //   set_loading(false);
  //   console.log("set restaurant"); 
  // }

  // useEffect(get_restaurant, [user]); 


  const insertUserIntoDb = async (user) => {
    if (user === undefined)
      return;
    await firestore
      .collection("users")
      .doc(user.uid)
      .set({
        id: user.uid,
        name: user.displayName ? user.displayName : "Foodie",
        image: user.photoURL ? user.photoURL : "default image",
        followedRestaurants: {}
      })
      .then(() => {
        console.log('new user added');
      })
      .catch(err => {
        console.log('unable to add new user', err);
      });
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


  const sign_out = () => {
    setUserDb(null);
    return auth.signOut();
  }

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

  
  const get_doc_snapshot = (path, update) => {
    // realtime updates for a specific document

    return firebase.firestore()
          .doc(path)
          .onSnapshot(update);
  }

  const get_doc = (path) => {
    // get a specific document

    return firebase.firestore()
          .doc(path)
          .get()
  }

  const update_doc = (path, updated) => {

    return firebase.firestore()
          .doc(path)
          .update(updated)
  }


  const values = {
    user,
    sign_up_with_email_password,
    sign_in_with_email_password,
    sign_in_with_google,
    sign_in_with_facebook,
    sign_out,
    assignRestaurantToUser,
    userDb,
    getUserData,
    insertUserIntoDb,
    restaurant,
    get_doc_snapshot,
    get_doc,
    update_doc
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