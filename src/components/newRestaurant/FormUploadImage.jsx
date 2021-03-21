import { Fragment, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { restaurantFormStyles } from './RestaurantFormStyles'

/**
 * Creates a component that allows a user to choose an image
 * to be uploaded. The file size is limited to 500kb.
 * 
 * @returns A component with a upload field
 */
const FormUploadImage = ({ nextScreen, prevScreen, form, setForm, notNew }) => {

    const [showErrorMsg, setShowErrorMsg] = useState(false);

    // the max size is in kb
    const maxFileSize = 100;

    const handleChange = ele => {
        if (ele.target.files && ele.target.files[0]) {
            console.log(ele.target.files[0]);
            // make sure the file size is with in the limits
            if ((ele.target.files[0].size / 1000) > maxFileSize) {
                setShowErrorMsg(true);
            } else {
                if (showErrorMsg === true)
                    setShowErrorMsg(false);
                
                // in the rare instance refresh page after this screen, to prevent error on preview page
                // save image to session storage
                const reader = new FileReader(); 
                
                reader.addEventListener("load", () => {
                    sessionStorage.setItem("image", reader.result);
                });
                
                reader.readAsDataURL(ele.target.files[0]); 
                
                setForm({ ...form, image: ele.target.files[0] });
            }
        };
    }

    function getImg(){
        // already went through new restaurant menu wizard, want to edit your information
        // display current image
       

        if(notNew && typeof form.image == "string") return (
            <Fragment >
                <Row>
                    <Col>
                    < br />
                    <h4 style={styles.title}>Current Image:</h4>
                    </Col>
                </Row>            
                <img id="image-preview" alt="Preview of restaurant logo" style={styles.image} src={form.image}/>
            </Fragment>
        )
    }

    function getFile(){
        
        if(notNew && typeof form.image == "string"){
            // not required as already in form state 
            return (
                <Form.Group>
                    <Form.File
                        onChange={handleChange}
                        id="restaurant-image"
                        label="Restaurant image"
                        accept=".png, .jpg, .jpeg"
                    />
                </Form.Group>
            )
        }

        else {
            return (
                <Form.Group>
                    <Form.File
                        onChange={handleChange}
                        id="restaurant-image"
                        label="Restaurant image"
                        accept=".png, .jpg, .jpeg"
                        required
                    />
                </Form.Group>
            )
        }

    }

    

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>What picture should we use for <i>{form.name}</i>?</h1>
            <br />
            {showErrorMsg ? (
                <p style={restaurantFormStyles.errorMsg}>The max file size allowed is 500kb.</p>
            ) : null}

            <Form style={restaurantFormStyles.form} onSubmit={nextScreen}>
                {getFile()}
                
                {getImg()}
                <br />

                <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
                <Button style={restaurantFormStyles.button} variant="primary" type="submit" disabled={showErrorMsg}>Continue</Button>

            </Form>
        </div>
    )
};

const styles = {
    errorMsg: {
        color: "red"
    }
}

export default FormUploadImage;