import React from "react"
import styled from "styled-components"
import { useFormik } from "formik"
import * as Yup from "yup"
import { signInWithEmailPassword } from "../firebase"
import { ReactComponent as GoogleLogo } from "../assets/google_logo.svg"
import { ReactComponent as FacebookLogo } from "../assets/facebook.svg"
import { Group, Input, LongButton } from "../styles/FormElements"

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
      signInWithEmailPassword(email, password); 
    },
  }); 

  const handle_google = () => {
    console.log("test google"); 
  };

  const handle_facebook = () => {
    console.log("test facebook"); 
  };

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
          <Message>
            {formik.errors.email ? formik.errors.email : null}
          </Message>
        </Group>

        <Group>
          <label style={{textAlign: "left"}}>Password</label>
          <Input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Message>
            {formik.errors.password ? formik.errors.password : null}
          </Message>
        </Group>
        
        <LongButton type="submit">Sign In</LongButton>
      </form>

      <ProviderContainer>
        Or Sign In with:
        <Provider onClick={handle_google}>
          <GoogleLogo style={{width: "25px"}}></GoogleLogo>
          Google
        </Provider>
        <Provider onClick={handle_facebook}>
          <FacebookLogo style={{width: "26px"}}></FacebookLogo>
          Facebook
        </Provider>
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


const Message = styled.div`
  font-size: .6em;  
  height: 15px; 
`;

const ProviderContainer = styled.div`
  font-size: .7em; 
  margin: 2% 0 5% 0;
  display: flex;
  flex-direction: row; 
`;

const Provider = styled.div`
  margin-left: 50px; 
  
  &:hover{
    cursor: pointer;
  }
`;