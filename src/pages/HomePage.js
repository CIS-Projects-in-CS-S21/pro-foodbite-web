import React from "react"
import styled from "styled-components"
import { useUserContext } from "../context/UserContext"

export default function SignInPage() {

  const { user, userDb } = useUserContext();

  const test = () => {
    // test auth context 
    if (user) return <temp style={{ fontWeight: 700, fontSize: "1.2em" }}>TRUE</temp>
    else return <temp style={{ fontWeight: 800 }}>FALSE</temp>
  }

  const demo2 = () => {
    if(userDb) return <temp  style={{ fontWeight: 700, fontSize: "1.2em" }}>TRUE</temp>
    else return <temp style={{ fontWeight: 800 }}>FALSE</temp>
  }

  console.log(user);
  //sessionStorage.clear();

  return (
    <Container>

      <div>current user: {test()}</div>
      <div>registered restaurant: {demo2()}</div>
    </Container>
  )
}

const Container = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: column; 
  font-size: 1.4em; 
  margin: 0 auto; 
`;

const temp = styled.span`
  
`; 