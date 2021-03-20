import React, { createContext, useState, useEffect} from "react";
import {Group, LongButton, Input} from "../styles/FormElements"
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { auth} from "../firebase.js" 


const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  font-size: 1.2em;
`;


const TopPage = styled.div`
    z-index:1;
    align-items:center;
    justify-content:center;
    position:absolute;
    background-color:white;
    border-radius:5px;
    width:100%;
    margin-top:100px;
    visibility:hidden;
`



function PasswordEditForm(){

    const topPage = document.getElementById("thePage");

    const cancelClick = () =>{
        handlePasswordFormik.values.password = "";
        handlePasswordFormik.values.confirmPassword = "";
        topPage.style.visibility = "hidden";
    }
    
    const handle_change_password = () =>{
        auth.currentUser.updatePassword(handlePasswordFormik.values.password).then(function(){
            alert("Reset password success");
            handlePasswordFormik.values.password = "";
            handlePasswordFormik.values.confirmPassword = "";
            topPage.style.visibility = "hidden";
        }).catch(function(error){
            console.log(error);
        });
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
                    <LongButton type="cancel" onClick={cancelClick} primary>Cancel</LongButton>
                    <br/>
                    <LongButton type="submit">Submit</LongButton>
                </Group>
            </Container>
        </form>
    )
}



export default function Setting() {
    const topPage = document.getElementById("thePage");
    const currentUser = auth.currentUser;
  
    const [taskList, setTaskList] = useState([]);


    function passwordToList(){
        var newTask = <PasswordEditForm id="passwordForm"/>
        setTaskList([newTask]);
        topPage.style.visibility = "visible";
    }

    const loadFile = (event) =>{
        var imgData = event.target.files[0];
        var imgUrl = URL.createObjectURL(imgData);
        var output = document.getElementById("userPhoto");
        output.src = imgUrl;
    }
    
    return( 
        <Container id="container">
            
                <img id = "userPhoto" height="98px" width="98px" style={{borderRadius:"50px"}}  
                    src={currentUser.photoURL?currentUser.photoURL: "/assets/profile.png"}/>
            
            <input id="uploadImage" type="file" accept=".jpg, .jpeg, .png" 
                onChange={loadFile} style={{display:"none"}} />
            <Group>
                <text>Email: {currentUser.email}</text>
                <LongButton onClick={passwordToList}>Reset Password</LongButton>
            </Group>

            <TopPage id="thePage">
                {taskList}
            </TopPage>
        </Container>
    )
}