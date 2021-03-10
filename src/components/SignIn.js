import React from "react"
import styled from "styled-components"
import { useFormik, Formik } from "formik"
import * as Yup from "yup"

export default function SignIn() {

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
  
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Required"),
      password: Yup.string()
        .min(8, "Too short")
        .required("Required")
    }),
  
    onSubmit: ( { email, password } ) => {
      console.log("call function ... todo"); 
      console.log(email); 
      console.log(password); 
    },
  }); 


  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>

        <Group>
        <label style={{textAlign: "left"}}>Email</label>
        <Input
            id="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Error>
            {formik.errors.email ? formik.errors.email : null}
          </Error>
        </Group>

        <Group>
          <label style={{textAlign: "left"}}>Password</label>
          <Input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Error>
            {formik.errors.password ? formik.errors.password : null}
          </Error>
        </Group>
        
        <LongButton type="submit">Sign In</LongButton>
      </form>

      <ProviderContainer>
        todo log in other container here
      </ProviderContainer>
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

// Export these or put in separate folder for re-use with signup, settings, ?!?!?
const Group = styled.div`
  display: flex;
  flex-direction: column; 
  margin-bottom: 5%; 
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

  &:hover {
    border-color: #f9b767; 
  }
`;

const Error = styled.div`
  font-size: .6em;  
  height: 15px; 

`;

const ProviderContainer = styled.div`
  border: 1px solid black;
  margin: 2% 0;
`;