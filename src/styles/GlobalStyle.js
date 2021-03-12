import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html {
    font-size: 18px;
    box-sizing: border-box;
  }

  body {
    // font-family: "Amatic SC", cursive;
    // font-size: 3.0rem; 
  }

  button {
    cursor: pointer; 
  }
  
  *:focus {
    outline: none; 
  }

`;

export default GlobalStyle;