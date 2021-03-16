import './App.css';
import React from 'react';
import GlobalStyle from "./styles/GlobalStyle"; 
import Routes from "./Routes"
import { UserContextProvider } from "./context/UserContext.js";
// import firebase from "./firebase"

function App() {


  return (
    <div className="App">
      <GlobalStyle/>
      <UserContextProvider>
        <Routes></Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;