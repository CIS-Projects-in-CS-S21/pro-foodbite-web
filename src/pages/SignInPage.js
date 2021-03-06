import React from "react"
import styled from "styled-components"
import SignIn from "../components/SignIn"
import { Link} from "react-router-dom";

export default function SignInPage() {

  return (
    <div>
      <Greeting> Welcome to the Sign In Page!</Greeting>
      <SignIn></SignIn>
      No Account? <Link to={"/sign-up"} style={{color: "#da962e"}}>Sign Up Here</Link>
    </div>
  )
}

export const Greeting = styled.div`
  margin: 1% 0 2.1% 0; 
  font-size: 1.2em; 
`; 