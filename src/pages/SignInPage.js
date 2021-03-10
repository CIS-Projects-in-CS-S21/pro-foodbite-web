import React from "react"
import styled from "styled-components"
import SignIn from "../components/SignIn"
// import { useHistory } from "react-router-dom";

export default function SignInPage() {

  //const history = useHistory();

  return (
    <div>
      <Greeting> Welcome to the Sign In Page!</Greeting>
      <SignIn></SignIn>
      No Account? Sign Up here
    </div>
  )
}

const Greeting = styled.div`
  //border: 1px solid black; 
  margin: 1% 0 2% 0; 
`; 