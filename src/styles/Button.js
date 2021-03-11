import styled from "styled-components"

// FIX COLOR SCHEME! 
const Button = styled.button`

  font-size: 1.5rem; 
  font-family: "Amatic SC", cursive;
  font-weight: 600; 
  margin: 0 0.6em 0.1em 0;
  border: 0.18em solid rgba(255,255,255,0);
  border-color: ${props => props.primary ? "" : "#da4e2e"};
  border-radius: 2em;
  box-sizing: border-box;
  color: #da4e2e; 
  padding: 0.4em 1.2em;
  //background-color: ${props => props.primary ? "#f9b767" : "#dc4c28"};
  background-color: #f9b767;
  color: #fff; 

  &:hover {
    cursor: pointer; 
    background-color: #f4cdc3; 
  }

  &:focus {
    outline: 0;
    -moz-outline-style: none;
  }
`;

export default Button;