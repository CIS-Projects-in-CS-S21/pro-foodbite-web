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

  const { user, userDb } = useUserContext();
  console.log(userDb); 

  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true); 

  useEffect( () => {

    const get_doc= async () => {
      
     // let ref = await firestore.collection("restaurants").where("ownerId", "==", user.uid);
      let ref = await firestore.doc(`restaurants/${userDb.ownedRestaurants[0]}`); 
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
      }
    }

    get_doc(); 

  }, [user.uid, userDb.ownedRestaurants]);

 
  // todo, if form empty use empty default (ex. sign-up but don't complete the newRest. wizard)


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

function isLoading(){
  if(loading) return <div>Fetching Restaurant</div>
  else return renderCurrentScreen(); 
}

return (
  <div id="test" style={restaurantFormStyles.animate}>
    {isLoading()}
  </div>
)
};