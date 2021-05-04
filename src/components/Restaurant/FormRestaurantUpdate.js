import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getFileExtension } from "../../utils/Utils"
import { useUserContext } from "../../context/UserContext"
import firebase from "firebase"
import { Redirect } from 'react-router-dom';
import { Button, Spinner } from "react-bootstrap"
import { restaurantFormStyles } from "../newRestaurant/RestaurantFormStyles"

export default function FormRestaurantUpdate( { prevScreen, form, setForm } ) {

    const [redirect, setRedirect] = useState(false);
    const { user, userDb } = useUserContext();

    console.log(form);


    const submitRestaurantData = () => {
        setForm({ ...form, submitting: true });

        const restaurant = {
        
        id: userDb.ownedRestaurants[0],
        ownerId: user.uid,
        name: form.name,
        description: form.description,
        menu: form.menuItems,
        available: true,
        profile: {
            hours: form.hours
            }
        };

        if(typeof form.image === "string"){
            restaurant.image = form.image; // if form.name is string they did not upload a new photo

        firebase.firestore().doc(`restaurants/${userDb.ownedRestaurants[0]}`).set(restaurant)
            .then( () => {
            console.log("success");
            setForm({ ...form, submitting: false });
            setRedirect(true);
            }).catch(err => console.log(err)); 
        }
        
        else{

            console.log("new image added"); 
            const imageExt = getFileExtension(form.image.name);
            if (!imageExt) {
                console.log("invalid image extension");
                return;
            }

            let imagePath = `images/${uuidv4()}/image.${imageExt}`;
            const restaurantImageRef = firebase.storage().ref().child(imagePath);

            restaurantImageRef.put(form.image)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(imageUrl => {
                restaurant.image = imageUrl;
            })
            .then( () => {
                firebase.firestore().doc(`restaurants/${userDb.ownedRestaurants[0]}`).set(restaurant)
                    .then( () => {
                    console.log("success");
                    setForm({ ...form, submitting: false });
                    setRedirect(true);
                    }).catch(err => console.log(err)); 
            }); 
        }
        
  }

  return (
    <div style={restaurantFormStyles.container}>
      {redirect ? <Redirect to="/" /> : (
          <>
            <h1 style={restaurantFormStyles.h1}>Everything looks good!</h1>
            <br />

            <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
            <Button style={restaurantFormStyles.button} variant="success" onClick={submitRestaurantData} disabled={form.submitting}>
                {form.submitting ? (
                    <>
                        <span style={styles.submittingMsg}>Submitting...</span>
                        <Spinner animation="border" variant="light">
                            <span className="sr-only">Submitting data...</span>
                        </Spinner>
                    </>
                ) : (
                    <span>Submit</span>
                )}
            </Button>
          </>
      )}
    </div>
)
}

const styles = {
    submittingMsg: {
        paddingRight: 10
    }
} 