import React from "react"
import styled from "styled-components"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ReactComponent as GoogleLogo } from "../assets/google_logo.svg"
import { ReactComponent as FacebookLogo } from "../assets/facebook.svg"
import { Group, Input, LongButton } from "../styles/FormElements"
import { useHistory } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

export default function SignIn() {

  const history = useHistory();
  const { sign_in_with_email_password, sign_in_with_google, sign_in_with_facebook } = useUserContext(); 


  const handle_submit = async ( values ) => {
    try{
      // sign-in, auth context updated, navigate home. 
      await sign_in_with_email_password(values.email, values.password);
      history.push("/"); 
    }
    catch{
      alert("sign-in failed"); 
    }
  }; 

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
  
    onSubmit: handle_submit,
  }); 


  const handle_google = async () => {
     try{
      await sign_in_with_google();
      history.push("/"); 
     }
     catch{
      alert("sign-in failed"); 
     }
  };

  const handle_facebook = async () => {
    try{
      await sign_in_with_facebook();
      history.push("/"); 
     }
     catch{
      alert("sign-in failed"); 
     } 
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
        Sign In with:
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
  width: 70%; 
  margin: 0 auto; 
  font-size: 1.2em; 
`;


const Message = styled.div`
  font-size: .9em;  
  height: 15px; 
`;

const ProviderContainer = styled.div`
  font-size: .8em; 
  margin: 2.5% 0 5% 0;
  display: flex;
  flex-direction: row; 
  align-items: center; 
`;

const Provider = styled.div`
  margin-left: 50px; 
  border: 1px solid transparent; 
  padding: 5px; 
  
  &:hover{
    cursor: pointer;
    border: 1px solid #f9b767; 
  }
`;