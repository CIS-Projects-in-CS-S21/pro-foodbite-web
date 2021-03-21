import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext"
import { v4 as uuidv4 } from 'uuid'
import { getFileExtension } from '../../utils/Utils'
import { restaurantFormStyles } from './RestaurantFormStyles'

const FormRestaurantSubmit = ({ prevScreen, form, setForm }) => {
    const [redirect, setRedirect] = useState(false);
    const { user, assignRestaurantToUser } = useUserContext();

    const submitRestaurantData = () => {
        setForm({ ...form, submitting: true });

        // get the user id
        // make the connection with the user and restaurant
        // send to firestore

        const restaurant = {
            ownerId: user.uid,
            name: form.name,
            description: form.description,
            menu: form.menuItems,
            available: false,
            profile: {
                hours: form.hours
            }
        };

        // upload restaurant image to storage
        const imageExt = getFileExtension(form.image.name);
        if (!imageExt) {
            console.log("invalid image extension");
            return;
        }

        const imagePath = `images/${uuidv4()}/image.${imageExt}`;
        const restaurantImageRef = firebase.storage().ref().child(imagePath);


        restaurantImageRef.put(form.image)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(imageUrl => {
                restaurant.image = imageUrl;

                // submit the new restaurant into the db
                const newRestaurantRef = firebase
                    .firestore()
                    .collection("restaurants")
                    .doc();

                restaurant.id = newRestaurantRef.id;
            })
            .then(() => {
                // submit the new restaurant into the db
                const newRestaurantRef = firebase
                    .firestore()
                    .collection("restaurants")
                    .doc();

                restaurant.id = newRestaurantRef.id;
                return newRestaurantRef.set(restaurant);
            })
            .then(() => {
                console.log('restaurant data submitted');

                // assign the new restaurant to the user
                return assignRestaurantToUser(restaurant.id);
            })
            .then(() => {
                console.log("user document updated successfully");
                setForm({ ...form, submitting: false });
                setRedirect(true);
            })
            .catch(err => {
                console.log(err);
            });
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
};

const styles = {
    submittingMsg: {
        paddingRight: 10
    }
}
export default FormRestaurantSubmit;