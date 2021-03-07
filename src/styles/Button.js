import styled from "styled-components"

// FIX COLOR SCHEME! 
const Button = styled.button`

  font-size: 1.4rem; 
  margin: 0 0.1em 0.1em 0;
  border: 0.18em solid rgba(255,255,255,0);
  border-color: ${props => props.primary ? "" : "#0e4c55"};
  border-radius: 2em;
  box-sizing: border-box;
  font-family:'Roboto',sans-serif;
  color: #da4e2e;
  padding: 0.4em 1.2em;


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