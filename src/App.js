import './App.css';
import React, { useState, useEffect } from 'react';
import GlobalStyle from "./styles/GlobalStyle"; 
import Routes from "./Routes"
import { UserContext } from "./context/UserContext.js";
import firebase from "./firebase"

function App() {

  // init session state

  // state
  const [auth, set_auth] = useState(false); 
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

  // useEffects


  // firebase.auth().signOut()
  //   .then(() => {
  //     console.log("logged-out"); 
  //   })

  return (
    <div className="App">
      <GlobalStyle/>
      <UserContext.Provider value={{auth, }}>
        <Routes ></Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;