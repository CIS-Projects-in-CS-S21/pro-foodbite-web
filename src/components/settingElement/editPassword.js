import React from "react";
import {Group, LongButton, Input, Container} from "../../styles/FormElements"
import { useFormik } from "formik"
import * as Yup from "yup"
import { auth} from "../../firebase.js" 

export default function PasswordEditForm({show, closeShow}){

    const handle_change_password = () =>{
        auth.currentUser.updatePassword(handlePasswordFormik.values.password).then(function(){
            alert("Reset password success");
        }).catch(function(error){
            console.log(error);
        });
        document.getElementById("close").click();
    }

    const handlePasswordFormik = useFormik({
        initialValues:{
            password:"",
            confirmPassword:"",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "password is too short")
                .required("Required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "password must match")
                .required("Required")
        }),
        onSubmit:handle_change_password,
    });

    if(!show){
        handlePasswordFormik.values.password = "";
        handlePasswordFormik.values.confirmPassword = "";
        return null;
    }

    return(
        <form id="changePasswordForm" onSubmit={handlePasswordFormik.handleSubmit}>
            <h1>Reset Password</h1>
            <label>New Password</label>
            <br/>
            <Input type="password" 
                id="password"
                onChange={handlePasswordFormik.handleChange}
                value={handlePasswordFormik.values.password}
            />
            <div>{handlePasswordFormik.errors.password? handlePasswordFormik.errors.password: null}</div>
            <br/>
            <label>Confirm Password</label>
            <br/>
            <Input type="password" 
                id="confirmPassword"
                onChange={handlePasswordFormik.handleChange}
                value={handlePasswordFormik.values.confirmPassword}
            />
            <div>{handlePasswordFormik.errors.confirmPassword? handlePasswordFormik.errors.confirmPassword: null}</div>    
            <br/>
            <Container>
                <Group>
                    <LongButton id="close" onClick={closeShow}>Cancel</LongButton>
                    <br/>
                    <LongButton type="submit">Submit</LongButton>
                </Group>
            </Container>
        </form>
    )
}