import React from "react"
import styled from "styled-components"
import { useFormik } from "formik"
import * as Yup from "yup"

export default function SignIn() {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
  
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email").required("Enter an email"),
      password: Yup.string().required("Enter a password")
    }),
  
    onSubmit: ( { email, password} ) => {
      console.log("call function ... todo"); 
      console.log(email); 
      console.log(password); 
    }
  }); 


  return (
    <Container>
      <form>
        <Group>
          <Label>Email</Label>
          <Input></Input>
        </Group>

        <Group>
          <Label>Password</Label>
          <Input></Input>
        </Group>
        
        <LongButton>Sign In</LongButton>
      </form>

      todo log in other container here
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  //border: 1px solid blue; 
  width: 70%; 
  margin: 0 auto; 
`;

const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 5%; 
`;

const Label = styled.label`
  text-align: left; 
`;

const Input = styled.input`
  border-radius: 15px;
  border: 2px solid #dc4c28; 
  padding: 15px 20px;
  width: 500px; 

  &:focus {
    border-color: #f9b767; 
  }
`;

const LongButton = styled.button`
  font-size: 1.2rem; 
  font-family: "Amatic SC", cursive;
  font-weight: 600; 
  border: 0.18em solid rgba(255,255,255,0);
  border-radius: 2em;
  box-sizing: border-box;
  color: #da4e2e; 
  padding: 0.4em 1.2em;
  background-color: #da4e2e; 
  color: #fff; 

  width: 100%; 
`;

