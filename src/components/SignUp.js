import React from "react";
import { Group, LongButton, Input } from "../styles/FormElements"
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { useUserContext } from "../context/UserContext"


const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  font-size: 1.2em; 
`;

const Message = styled.div`
  font-size: .6em;
  height: 15px;
`;


export default function SignUp( { onSubmit } ) {

  const history = useHistory();
  const cancelClick = () => {
    history.push("/");
  }

  const { sign_up_with_email_password, insertUserIntoDb } = useUserContext();

  const sign_up_schema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .required("Required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  });  

  const handle_submit = async(values) =>{
    // sign-up, auth context updated, navigate home. 
    await sign_up_with_email_password(values.email, values.password)
      .then((res) => {
        insertUserIntoDb(res.user);
        history.push("/");
      })
      .catch(error => alert(error.message));
    
    // for tests/Auth.test
    if(typeof onSubmit === "function") onSubmit(values);
  }

  return (
    <Container>
      <Formik
        initialValues={{
          email:"",
          password:"",
          confirmPassword:""
        }}
        validationSchema={sign_up_schema}
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
              <label style={{textAlign:"left"}} htmlFor="email">Email</label>
              <Input type="email" 
                id="email" 
                onChange={handleChange} 
                value={values.email}/>
              <Message data-testid="emailError">
                {errors.email ? errors.email: null}
              </Message>
            </Group>
            <Group>
              <label style={{textAlign:"left"}} htmlFor="password">Password</label>
              <Input type="password" 
                id="password" 
                data-testid="password"
                onChange={handleChange} 
                value={values.password}/>
              <Message data-testid="passwordError">
                {errors.password ? errors.password: null}
              </Message>
          </Group>
          <Group>
            <label style={{textAlign:"left"}} htmlFor="confirmPassword">Confirm Password</label>
            <Input type="password" 
              id="confirmPassword"
              data-testid="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword} />
            <Message data-testid="confirmPasswordError">
              {errors.confirmPassword ? errors.confirmPassword: null}
            </Message>
          </Group>
          <LongButton onClick={cancelClick} type="button" primary>Cancel</LongButton>
          <br/><br/>
          <LongButton type="submit">Submit</LongButton>
          </form>
        )}
      </Formik>
    </Container>
  )
}
