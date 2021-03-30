import { Button, Form } from 'react-bootstrap'
import { restaurantFormStyles } from './RestaurantFormStyles'

const FormRestaurantDescription = ({ nextScreen, prevScreen, form, setForm }) => {

    const handleChange = ele => {
        setForm({ ...form, description: ele.target.value });
    }

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>How would you describe <i>{form.name}</i>?</h1>
            <br />

            <Form style={restaurantFormStyles.form} onSubmit={nextScreen} >
                <Form.Group>
                    <Form.Label>This description is what you customers will see.</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        as="textarea"
                        rows={3}
                        required
                        value={form.description}
                        data-testid="description"
                    />
                </Form.Group>

                <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
                <Button style={restaurantFormStyles.button} variant="primary" type="submit" >Continue</Button>

            </Form>
        </div>
    )
};

const styles = {
    container: {
        padding: "1em",
        maxWidth: "1200px",
        textAlign: "center",
        margin: "0 auto",
        marginTop: "2em",
        color: "rgb(54, 54, 54)"
    }
}

export default FormRestaurantDescription;