import { Button, Form } from 'react-bootstrap'
import { restaurantFormStyles } from './RestaurantFormStyles'

const FormRestaurantName = ({ nextScreen, prevScreen, form, setForm }) => {

    const handleChange = ele => setForm({ ...form, name: ele.target.value });

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>What's the name of your restaurant?</h1>
            <br />

            <Form style={restaurantFormStyles.form} onSubmit={nextScreen} >
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        type="text"
                        value={form.name}
                        placeholder={"Awesome restaurant name"}
                        required
                    />
                </Form.Group>

                <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
                <Button style={restaurantFormStyles.button} variant="primary" type="submit" >Continue</Button>

            </Form>
        </div>
    )
};

export default FormRestaurantName;