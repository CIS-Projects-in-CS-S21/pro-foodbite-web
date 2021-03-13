import React from "react"
import styled from "styled-components"
import { useUserContext } from "../context/UserContext"

export default function SignInPage() {

  const { restaurant } = useUserContext();

  const test = () => {
    // test auth context 
    if (restaurant) return <span style={{ fontWeight: 700, fontSize: "1.2em" }}>true</span>
    else return <span style={{ fontWeight: 700 }}>FALSE</span>
  }

  console.log(restaurant);

  return (
    <Container>

      <div>status: {test()}</div>
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column; 
`;