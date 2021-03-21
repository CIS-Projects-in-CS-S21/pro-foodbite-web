import React, { createContext, useState, useEffect} from "react";
import {Group, LongButton, Container} from "../styles/FormElements"
import styled from "styled-components"
import { useFormik } from "formik"
import * as Yup from "yup"
import firebase, { auth} from "../firebase.js" 
import PasswordEditForm from "./settingElement/editPassword"
import MenuEditForm from "./settingElement/editMenu"
import { useHistory } from "react-router";


const UserPhotoButton = styled.button`
    display:flex;
    flex-direction:column;
    align-items:center;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: none;
    background-size: 100px;

    :hover{
        border:1px solid;
        border-color: rgba(0,0,0,0.5);
        background-size: 50px;
    }
`

const TopPage = styled.div`
    z-index:1;
    align-items:center;
    justify-content:center;
    position:absolute;
    border-radius:5px;
    width:100%;
    height:100%;
    top:0px;
    
`;


export default function Setting() {

    const history = useHistory();
    const [theMenu, setTheMenu] = useState([]);
    const [menuIsShow, setMenuIsShow] = useState(false);
    const [passwordIsShow, setPasswordIsShow] = useState(false);
    const currentUser = auth.currentUser;

    const photoClick = () =>{   
        var el = document.getElementById("uploadImage");
        el.click();
    }

    

    const loadFile = (event) =>{
        var imgData = event.target.files[0];
        var output = document.getElementById("userPhoto");
        // if(window.confirm("Change profile image?")){
        //     var storageRef = firebase.storage().ref();
        //     var imageRef = storageRef.child(currentUser.uid + "/profileImage/" + imgData.name);
        //     imageRef.put(imgData).then((snapshot) =>{
        //         console.log("uploaded a file")
        //     });
        //     imageRef.getDownloadURL().then((url) =>{
        //         output.src = url;
        //         currentUser.updateProfile({
        //             photoURL:url,
        //         }).then(function(){
        //             var photoURL = currentUser.photoURL;
        //         }, function(error){
        //             console.log("update error " + error);
        //         });
        //     }).catch((error) =>{
        //         console.log("download error " + error);
        //     })
        // }
    }
    
    const registerRestaurant= () =>{
        history.push("/new");
    }

    const getDataFromChild = (theData) =>{
        setTheMenu(theData);
    }

    function PageShow(){
        if(menuIsShow || passwordIsShow){
            return(
                <TopPage id="thePage">
                    <div style={{backgroundColor:"rgba(125,125,125,0.5)",
                    borderRadius:"5px", top:"50%"}}>
                        <MenuEditForm show={menuIsShow} sendData={getDataFromChild}
                            closeShow={()=>setMenuIsShow(false)}
                            menuData={theMenu}
                            style={{marginTop:"10px"}}>
                            </MenuEditForm>
                        <PasswordEditForm show={passwordIsShow} 
                            closeShow = {() => setPasswordIsShow(false)}
                            style={{marginTop:10}}>              
                            </PasswordEditForm>
                    </div>
                </TopPage>
            )
        }else{
            return null;
        }
    }

    return( 
        <Container id="container">
            <UserPhotoButton id="photoButton" onClick={photoClick} >
                <img id = "userPhoto" height="98px" width="98px" style={{borderRadius:"50px"}}  
                    src={currentUser.photoURL?currentUser.photoURL: "/assets/profile.png"}/>
            </UserPhotoButton>
            <input id="uploadImage" type="file" accept=".jpg, .jpeg, .png" 
                onChange={loadFile} style={{display:"none"}} />
            <Group>
                <text>Name: {currentUser.displayName?currentUser.displayName : currentUser.uid}</text>
                <text>Email: {currentUser.email}</text>
                <LongButton onClick={() => setMenuIsShow(true)}>Menu item</LongButton>
                <br/>
                <LongButton onClick={() => setPasswordIsShow(true)}>Reset Password</LongButton>
                <br/>
                <LongButton onClick={registerRestaurant}>Register Restaurant</LongButton>
            </Group>
            <PageShow></PageShow>
        </Container>
    )
}