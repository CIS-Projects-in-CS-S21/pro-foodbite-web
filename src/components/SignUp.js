import React from "react";
import {Group, LongButton,Input } from "../styles/FormElements"
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { useFormik } from "formik"
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


export default function SignUp() {
  const history = useHistory();
  const cancelClick = () =>{
    history.push("/");
  }

  const {sign_up_with_email_password} = useUserContext();

  const handle_submit = async(values) =>{
    try{
      await sign_up_with_email_password(values.email, values.password);
      history.push("/"); 
    }catch{
      alert("sign up failed");
    }
  }


  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      confirmPassword:""
    },
  
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Required"),

      password: Yup.string()
        .min(8, "Too short")
        .required("Required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),

    onSubmit:handle_submit,
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Group>
          <label style={{textAlign:"left"}}>Email</label>
          <Input type="email" 
            id="email" 
            onChange={formik.handleChange} 
            value={formik.values.email}/>
          <Message>
            {formik.errors.email? formik.errors.email: null}
          </Message>
        </Group>
        <Group>
          <label style={{textAlign:"left"}}>Password</label>
          <Input type="password" 
            id="password" 
            onChange={formik.handleChange} 
            value={formik.values.password}/>
          <Message>
            {formik.errors.password ? formik.errors.password: null}
          </Message>
        </Group>
        <Group>
          <label style={{textAlign:"left"}}>Confirm Password</label>
          <Input type="password" 
            id="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword} />
          <Message>
            {formik.errors.confirmPassword ? formik.errors.confirmPassword: null}
          </Message>
        </Group>
        <LongButton onClick={cancelClick} primary>Cancel</LongButton>
        <br/><br/>
        <LongButton type="submit">Submit</LongButton>
      </form>
    </Container>
  )
}
