import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
  }

  body {
    // would be best to apply this font only to elements that are using
    // it instead of all elements
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