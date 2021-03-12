import React, { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../context/UserContext"
import { useUserContext } from "../context/UserContext"

export default function SignInPage() {

  const user = useContext(UserContext);
  const { sign_out, restaurant } = useUserContext();  

  const test = () => {
    // todo

    if(restaurant) return <span>true</span>
    else return <span>FALSE</span>
  }

  // temporary 
  const handle_click = async () => {
    try{
      await sign_out();

    }
    catch{
      alert("sign-out failed"); 
    }
  }

  console.log(restaurant); 

  return (
    <Container>
      
      status: {test()}

      <button onClick={handle_click}>temp sign-out</button>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid black;
  



`; 