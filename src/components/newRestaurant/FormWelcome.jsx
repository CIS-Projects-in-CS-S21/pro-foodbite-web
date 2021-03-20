import { Button } from 'react-bootstrap'
import { restaurantFormStyles } from './RestaurantFormStyles'

const FormWelcome = ({ nextScreen }) => {

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>Welcome! We need to know more about your restaurant before you can continue.</h1>
            <br />

            <Button style={restaurantFormStyles.button} onClick={nextScreen} variant="primary">Let's Get Started!</Button>
        </div>
    )
};

export default FormWelcome;