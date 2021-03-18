import React from "react"
import styled from "styled-components"
import { Formik } from "formik"
import * as Yup from "yup"
import { ReactComponent as GoogleLogo } from "../assets/google_logo.svg"
import { ReactComponent as FacebookLogo } from "../assets/facebook.svg"
import { Group, Input, LongButton } from "../styles/FormElements"
import { useHistory } from "react-router-dom"
import { useUserContext } from "../context/UserContext"


export default function SignIn( { onSubmit } ) {

  const history = useHistory();
  const { sign_in_with_email_password, sign_in_with_google, sign_in_with_facebook } = useUserContext(); 

  const sign_in_schema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .required("Required")
  });  

  const handle_submit = async ( values ) => {
    // sign-in, auth context updated, navigate home. 
    await sign_in_with_email_password(values.email, values.password)
      .then( () => {
        history.push("/");  
        })
      .catch(error => window.alert(error.message)); 

    // for tests/Auth.test
    if(typeof onSubmit === "function") onSubmit(values);
  }; 
    
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
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={sign_in_schema}
        onSubmit={handle_submit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Group>
              <label style={{textAlign: "left"}} htmlFor="email">Email</label>
              <Input
                  id="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
              />
              <Message data-testid="emailError">
                {errors.email ? errors.email : null}
              </Message>
            </Group>

            <Group>
              <label style={{textAlign: "left"}} htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                value={values.password}
              />
              <Message data-testid="passwordError">
                {errors.password ? errors.password : null}
              </Message>
          </Group>
            <LongButton type="submit">Sign In</LongButton>
          </form>
        )}
      </Formik>
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