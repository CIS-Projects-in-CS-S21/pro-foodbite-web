import React, { useState, useEffect } from "react"
import FormRestaurantPreview from "../components/newRestaurant/FormRestaurantPreview"
import FormRestaurantName from "../components/newRestaurant/FormRestaurantName"
import FormUploadImage from "../components/newRestaurant/FormUploadImage"
import FormRestaurantDescription from  "../components/newRestaurant/FormRestaurantDescription"
import FormRestaurantHours from "../components/newRestaurant/FormRestaurantHours"
import FormRestaurantMenu from "../components/newRestaurant/FormRestaurantMenu"
import FormRestaurantUpdate from "../components/Restaurant/FormRestaurantUpdate"
import { restaurantFormStyles } from "../components/newRestaurant/RestaurantFormStyles"
import { useUserContext } from "../context/UserContext"
import { firestore } from "../firebase"
import { defaultEmpty } from "../tempData"
import styled from "styled-components"
import "../App.css"


export default function RestaurantPage(){
  
  const screens = {
    WELCOME_BACK: 1,
    EDIT_NAME: 2,
    EDIT_IMAGE: 3,
    EDIT_DESC: 4,
    EDIT_HOURS: 5,
    EDIT_MENU: 6,
    PREVIEW: 7,
    SUBMIT: 8
  };

  const maxScreenAmount = 8;

  const { user, userDb, restaurant } = useUserContext();

  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    // wanring, page refresh 
    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  
  }, []);


  const alertUser = e => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect( () => {

    const get_doc= async () => {

      //let ref = await firestore.collection("restaurants").where("ownerId", "==", user.uid);
      let ref = firestore.doc(`restaurants/${userDb.ownedRestaurants[0]}`); 
      const snapshot = await ref.get();
  
      if (snapshot.empty) {
        setForm(defaultEmpty); 
      } 
      else {
       // let doc = snapshot.docs[0].data();
        let doc = snapshot.data(); 

        let temp = defaultEmpty;
        temp.name = doc.name;
        temp.image = doc.image;
        temp.description = doc.description;
        temp.hours = doc.profile.hours; 
        temp.menuItems = doc.menu; 
        temp.screen = 1;
        temp.submitting = false;
        temp.success = false; 

        setForm(temp); 
        setLoading(false); 

       document.getElementById(temp.screen).style.color = "#e9eaeb";
      }
    }

    //get_doc(); 

    let doc = restaurant;

    let temp = defaultEmpty;
    temp.name = doc.name;
    temp.image = doc.image;
    temp.description = doc.description;
    temp.hours = doc.profile.hours; 
    temp.menuItems = doc.menu; 
    temp.screen = 1;
    temp.submitting = false;
    temp.success = false; 

    setForm(temp); 
    setLoading(false); 

  }, [user.uid, userDb.ownedRestaurants, restaurant]);


  const nextScreen = (e) => {
    if (e) e.preventDefault();
    if (form.screen + 1 > maxScreenAmount) return; 

    const ele = document.getElementById('test');
    fade(ele, 700, () => setForm({ ...form, screen: form.screen + 1 }));

    
    if(form.screen + 1 !== 8){
      console.log(form.screen);
      let temp = document.getElementById(form.screen);
      temp.removeAttribute("style");
      
      document.getElementById(form.screen+1).style.color = "#e9eaeb";
    }
  };

  const prevScreen = () => {
    if (form.screen - 1 < 1) return; 

    const ele = document.getElementById('test');
    fade(ele, 700, () => setForm({ ...form, screen: form.screen - 1 }));

    
    let temp = document.getElementById(form.screen);
    temp.removeAttribute("style");
    
    document.getElementById(form.screen-1).style.color = "#e9eaeb";
  };

  function fade(ele, time, callback) {
    // a simple sliding animation
    ele.style.opacity = 0;
    // ele.style.left = "-200vw";
    ele.style.visibility = "hidden";
    setTimeout(() => {
        ele.style.opacity = 1;
        ele.style.visibility = "visible";

        callback();
    }, time)
  }

  const handle_navigate = (number) => {

    let temp = document.getElementById(form.screen);
    temp.removeAttribute("style");
    
    temp = document.getElementById(number);
    document.getElementById(number).style.color = "#e9eaeb";

    setForm({ ...form, screen: number }); 
  }

  function renderCurrentScreen() {

    switch (form.screen) {
        case screens.WELCOME_BACK:
          return (
          <FormRestaurantPreview 
            nextScreen={nextScreen}
            form={form}
            notNew={true}
          />
          );
        case screens.EDIT_NAME:
          return (
              <FormRestaurantName
                nextScreen={nextScreen}
                prevScreen={prevScreen}
                form={form}
                setForm={setForm}
              />
          );
        case screens.EDIT_IMAGE:
          return (        
            <FormUploadImage
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              form={form}
              setForm={setForm}
              notNew={true}
            />
        );
        case screens.EDIT_DESC:
          return (
            <FormRestaurantDescription
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              form={form}
              setForm={setForm}
            />
        ); 
        case screens.EDIT_HOURS:
          return (
            <FormRestaurantHours
                nextScreen={nextScreen}
                prevScreen={prevScreen}
                form={form}
                setForm={setForm}
            />
        );
        case screens.EDIT_MENU:
          return (
            <FormRestaurantMenu
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              form={form}
              setForm={setForm}
            />
        );
        case screens.PREVIEW:
          return (
            <FormRestaurantPreview
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              form={form}
              setForm={setForm}
              notNew={false}
            />
        );
        case screens.SUBMIT:
          return (
            <FormRestaurantUpdate
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              form={form}
              setForm={setForm}
            />
        );
        default:
          return (
            <h1 onClick={prevScreen}>Unknown screen</h1>
          );
    }
}

function getNavigation(){

 if(form.screen !== 8){
    return (
      <Container>
        <Field onClick={() => handle_navigate(screens.WELCOME_BACK)} id="1">OVERVIEW</Field>
        <Field onClick={() => handle_navigate(screens.EDIT_NAME)} id="2">NAME</Field>
        <Field onClick={() => handle_navigate(screens.EDIT_IMAGE)} id="3">IMAGE</Field>
        <Field onClick={() => handle_navigate(screens.EDIT_DESC)} id="4">DESCRIPTION</Field>
        <Field onClick={() => handle_navigate(screens.EDIT_HOURS)} id="5">HOURS</Field>
        <Field onClick={() => handle_navigate(screens.EDIT_MENU)} id="6">MENU</Field>
        <Field onClick={() => handle_navigate(screens.PREVIEW)} id="7">PREVIEW</Field>
     </Container>
    )
 }
}

function isLoading(){
  if(loading) return <div>Fetching Restaurant</div>
  else {
    return (
      <div>

        {getNavigation()}
        {renderCurrentScreen()}

      </div>
      
    )
  }  
    
}

return (
  <div id="test" style={restaurantFormStyles.animate}>
    {isLoading()}
  </div>
)
};

const Container = styled.div`
  //border: 1px solid black; 
  position: absolute;
  margin-left: 1%; 
  margin-top: 2em;
  //background-color: #f0f3f5; 
  background-color: #333a40; 
  padding: 2px; 
`; 

const Field = styled.div`
  padding: 10px; 
  font-size: 1.5rem; 

  color: #868e95;
  
  &:hover{
    cursor: pointer; 
    color: #e9eaeb; 
  }

`;