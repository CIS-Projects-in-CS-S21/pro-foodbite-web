import { useContext, createContext, useState, useEffect } from "react"; 
import { auth } from "../firebase.js" 

// auth (user), restaurant info  
export const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext); 
}

export const UserContextProvider = ( { children } ) => {

  const [user, set_user] = useState(); 
  const [loading, set_loading] = useState(true); 

  useEffect(() => {
    // set state observer w/ current user or null 

    const unsubscribe = auth.onAuthStateChanged( (current_user) => {
      set_user(current_user); 
      set_loading(false); 
    })

    return unsubscribe; 
  }, []); 

  const sign_up_with_email_password = ((email, password) =>{
    //create new account
    return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  });

  const sign_in_with_email_password = ( (email, password) => {
     // sign-in exisiting user 
    return auth.signInWithEmailAndPassword(email, password); 
  }); 

  // google toddo
  // facebook todo
  // change password todo

  const sign_out = () => auth.signOut(); 

  const values = {
    user,
    sign_up_with_email_password,
    sign_in_with_email_password,
    sign_out
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