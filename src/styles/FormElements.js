import styled from "styled-components"

// FIX COLOR SCHEME! 
export const Button = styled.button`

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

export const LongButton = styled.button`
  font-size: 1.2rem; 
  font-family: "Amatic SC", cursive;
  font-weight: 600; 
  border: 0.18em solid rgba(255,255,255,0);
  border-radius: 2em;
  box-sizing: border-box;
  color: #da4e2e; 
  padding: 0.4em 1.2em;
  background-color: ${props => props.primary ? "#5bc0de" : "#da4e2e"};
  color: #fff; 
  width: 100%; 
  
  &:hover {
    border-color: #f9b767; 
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 3%; 
`;

export const Input = styled.input`
  border-radius: 15px;
  border: 2px solid #dc4c28; 
  padding: 15px 20px;
  width: 500px; 
  font-size: 1em; 

  &:focus {
    border-color: #f9b767; 
  }


`;

export const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  font-size: 1.2em;
`;