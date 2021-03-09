import React from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png"
import Button from "../styles/Button"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"


export default function Header( {auth} ) {

  const history = useHistory();

  return (
    <Container>
      <Logo src={logo}></Logo>

      {/* if not auth show these buttons */}
      <Buttons>
        <Button
          onClick={() => history.push("/sign-in")}
          primary
        >
          Sign In
        </Button>
        <Button
          onClick={() => history.push("/sign-up")}
        >
          Sign Up
        </Button>
      </Buttons>

    </Container>
  )
}

// Style
const Container = styled.header`
  display: flex;
  flex-direction: row; 
  justify-content: space-around;
  align-items: center;
  height: 20vh;
  // width: 100%; 
  border: 3px solid black; 
`; 

const Logo = styled.img`
  border: 4px solid #dc4c28;
  border-radius: 25px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
