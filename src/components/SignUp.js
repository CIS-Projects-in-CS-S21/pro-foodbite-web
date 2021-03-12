import React from "react";
import {Group, LongButton,Input } from "../styles/FormElements"
import styled from "styled-components"
import {useHistory} from "react-router-dom"

const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
`

export default function SignUp() {
  const history = useHistory();
  const cancelClick = () =>{
    history.push("/");

  }

  return (
    <Container>
      <form>
        <Group>
          <label style={{textAlign:"left"}}>Email</label>
          <Input type="text" />
          <label style={{textAlign:"left"}}>Password</label>
          <Input type="text" />
        </Group>
        <LongButton onClick={cancelClick}>Cancel</LongButton>

        <LongButton>Submit</LongButton>
      </form>
    </Container>
  )
}
