import React, { useState, useEffect} from "react";
import {Group, LongButton, Container, Input} from "../styles/FormElements"
import styled from "styled-components"
import { auth} from "../firebase.js" 
import PasswordEditForm from "./settingElement/editPassword"
import MenuEditForm from "./settingElement/editMenu"
import { useHistory } from "react-router";
import firebase from "firebase"

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
    margin-top:100px;
    top:0px;
    
`;

const ChangeName = ({show, closeShow, currentUser}) => {
    
    function chanegProfileName(){
        var first = document.getElementById("firstName");
        var last = document.getElementById("lastName");
        var firstName = first.value
        var lastName = last.value
        
        if(lastName.replaceAll(" ", "") + firstName.replaceAll(" ", "") === ""){
            var fullName = null;
        }else{
            var fullName = firstName + " " + lastName;
        }
        var userName = document.getElementById("userName");
        if(fullName == null){
            if(!window.confirm("Are you sure to become nameless?")){
                return;
            }
        }
        currentUser.updateProfile({
            displayName:fullName,
        }).then(function(){
            var displayName = currentUser.displayName;
        },function(error){
            console.log("name change failed", error);
        })
        userName.textContent = "Name: " + (fullName !=null ? fullName:"nameless");
        closeShow();
    }

    if(!show){
        return null;
    }
    return(
            <Container>
                <Group>
                    <div style={{display:"flex"}}>
                        <Input id = "firstName" type="string" placeholder="first name"
                        style={{marginTop:20, width:"50%"}}/>
                        <Input id = "lastName" type="string" placeholder="last name" 
                        style={{marginTop:20, width:"50%"}}/>
                    </div>
                    <br/>
                    <LongButton onClick={closeShow}>Cancel</LongButton>
                    <br/>
                    <LongButton onClick={chanegProfileName}>Submit</LongButton>
                </Group>
            </Container>
    )
}

export default function Setting() {
    

    useEffect(() =>{
        var imageName = currentUser.photoURL.match(/profile-img\..*\?/)[0].replace("?", "");
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child("users/profileImage/" + currentUser.uid + "/"
        + imageName);
        imageRef.getDownloadURL().then((URL) =>{
            setImageUrl(URL);
        }).catch((error) =>{
            console.log("error happen during downloading " + error);
        })
    },[])


    const [imageUrl, setImageUrl] = useState("");
    const history = useHistory();
    const [theMenu, setTheMenu] = useState([]);
    const [menuIsShow, setMenuIsShow] = useState(false);
    const [passwordIsShow, setPasswordIsShow] = useState(false);
    const [nameIsShow, setNameIsShow] = useState(false);
    const currentUser = auth.currentUser;

    const photoClick = () =>{   
        var el = document.getElementById("uploadImage");
        el.click();
    }

    

    const loadFile = (event) =>{
        var imgData = event.target.files[0];
        var output = document.getElementById("userPhoto");
        if(window.confirm("Change profile image?")){

            var storageRef = firebase.storage().ref();
            var imageRef = storageRef.child("users/profileImage/" + currentUser.uid + "/profile-img" + "." 
                + imgData.name.split(".")[imgData.name.split(".").length - 1]);
            imageRef.put(imgData).then((snapshot) =>{
                console.log("uploaded a file")
            });
            imageRef.getDownloadURL().then((url) =>{
                output.src = url;
                currentUser.updateProfile({
                    photoURL:url,
                }).then(function(){
                    var photoURL = currentUser.photoURL;
                }, function(error){
                    console.log("update error " + error);
                });
            }).catch((error) =>{
                console.log("download error " + error);
            })
        }
    }
    
    const registerRestaurant= () =>{
        history.push("/new");
    }

    const getDataFromChild = (theData) =>{
        setTheMenu(theData);
        
        //save the new menu information to db
    }

    

    function PageShow(){
        if(menuIsShow || passwordIsShow || nameIsShow){
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
                        <ChangeName show={nameIsShow}
                            closeShow={()=> setNameIsShow(false)}
                            currentUser ={currentUser}>
                        </ChangeName>
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
                    src={imageUrl? imageUrl: "/assets/profile.png"}/>
            </UserPhotoButton>
            <input id="uploadImage" type="file" accept=".jpg, .jpeg, .png" 
                onChange={loadFile} style={{display:"none"}} />
            <Group>
                <text id="userName">Name: {currentUser.displayName?currentUser.displayName : "nameless"}</text>
                <text>Email: {currentUser.email}</text>
                <text>Restaurant Name: Place Holder</text>
                <text>Address: 123 Place Holder street</text>
                <text>Hour:{<br/>}
                    Monday:{<br/>}
                    Tuesday:{<br/>}
                    Wednesday:{<br/>}
                    Thrusday:{<br/>}
                    Friday:{<br/>}
                    Saturday:{<br/>}
                    Sunday:{<br/>}
                </text>
                <LongButton onClick={() => setNameIsShow(true)}>Change Name</LongButton>
                <br/>
                <LongButton onClick={() => setPasswordIsShow(true)}>Reset Password</LongButton>
                <br/>
                <LongButton onClick={() => setMenuIsShow(true)}>Menu item</LongButton>
                <br/>
                <LongButton onClick={registerRestaurant}>Register Restaurant</LongButton>
            </Group>
            <PageShow></PageShow>
        </Container>
    )
}