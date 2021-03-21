import React, { useState } from "react"
import FormRestaurantPreview from "../components/newRestaurant/FormRestaurantPreview"
import FormRestaurantName from "../components/newRestaurant/FormRestaurantName"
import FormUploadImage from "../components/newRestaurant/FormUploadImage"
import FormRestaurantDescription from  "../components/newRestaurant/FormRestaurantDescription"
import FormRestaurantHours from "../components/newRestaurant/FormRestaurantHours"
import FormRestaurantMenu from "../components/newRestaurant/FormRestaurantMenu"
import FormRestaurantUpdate from "../components/Restaurant/FormRestaurantUpdate"
import { restaurantFormStyles } from "../components/newRestaurant/RestaurantFormStyles"
import { useUserContext } from "../context/UserContext"
import firebase from "../firebase"

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

  // TEMP! my big kahuna burger 
  // let ref = firebase.firestore().collection("restaurants").doc("8JFQb5PyRUKUZduY72MK");  
  // let init; 

  // ref.get().then((doc) => {
  //   if(doc.exists){
  //     init = doc.data(); 
  //   }
  //   else{
  //     console.log("no doc");
  //   }
  // }).catch(err => console.log(err)); 


  // temp 
  const doc = {
    name: "Big Kahuna Burger",
    image: "https://firebasestorage.googleapis.com/v0/b/foodbite-10690.appspot.com/o/images%2F196cf729-62f6-41da-a1d1-3573dd11da45%2Fimage.jpg?alt=media&token=37e8bc25-100f-4252-8776-00b2c5ee74d1",
    description: "Mmm, this is a tasty burger!",
    menuItems: [
      {
        description: "its a tasty burger",
        name: "big kahuna burger",
        price: "5.50"
      },
      {
        description: "nothing special",
        name: "fried",
        price: "2.50"
      }
    ],
    hours: {
        monday: {
            open: "22:00",
            close: "11:00"
        },
        tuesday: {
            open: "",
            close: ""
        },
        wednesday: {
            open: "",
            close: ""
        },
        thursday: {
            open: "",
            close: ""
        },
        friday: {
            open: "",
            close: ""
        },
        saturday: {
            open: "23:00",
            close: "10:00"
        },
        sunday: {
            open: "",
            close: ""
        },
    },
    screen: 1,
    submitting: false,
    success: false
};

  // todo, if form empty use default (just in case)

  const [form, setForm] = useState(doc);
  //console.log(form); 
  //console.log(form);

  const maxScreenAmount = 8;

  const nextScreen = (e) => {
    if (e) e.preventDefault();
    if (form.screen + 1 > maxScreenAmount) return; 

    const ele = document.getElementById('test');
    fade(ele, 700, () => setForm({ ...form, screen: form.screen + 1 }));
  };

  const prevScreen = () => {
    if (form.screen - 1 < 1) return; 

    const ele = document.getElementById('test');
    fade(ele, 700, () => setForm({ ...form, screen: form.screen - 1 }));
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

return (
  <div id="test" style={restaurantFormStyles.animate}>
    {renderCurrentScreen()}
  </div>
)

};