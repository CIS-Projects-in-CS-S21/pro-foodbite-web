import { Fragment, useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { convertTime24to12 } from '../../utils/Utils'
import { restaurantFormStyles } from './RestaurantFormStyles'

const FormRestaurantPreview = ({ nextScreen, prevScreen, form, notNew }) => {

    useEffect(() => {

        if(!notNew){
            // newRestaurant
            if (form.image) {
                if(typeof form.image !== "string"){
                const reader = new FileReader();

                reader.onload = e => {
                    const imageEle = document.getElementById("image-preview");
                    imageEle.src = e.target.result;
                };

                reader.readAsDataURL(form.image);
            }
            }
        }
    }, [form.image, notNew]);

    const hoursElement = Object.getOwnPropertyNames(form.hours).map((day, index) => {
        return makeHoursElement(day, index);
    });

    function makeHoursElement(day, index) {
        const hours = form.hours;

        if (hours[day].open.length > 0 && hours[day].close.length > 0)
            return (
                <Row key={index}>
                    <Col>
                        <p>{day}</p>
                    </Col>
                    <Col>
                        <span>{convertTime24to12(hours[day].open)} to {convertTime24to12(hours[day].close)}</span>
                    </Col>
                </Row>
            );
        else
            return (
                <Row key={index}>
                    <Col>
                        <p>{day}</p>
                    </Col>
                    <Col>
                        <span>closed</span>
                    </Col>
                </Row>
            );
    }

    function getHeader(){
        if(notNew) return "Your current information.";
        else return "Let's review the information you provided."
    }

    function getImage(){
        if(notNew || typeof form.image == "string") return <img id="image-preview" alt="Preview of restaurant logo" style={styles.image} src={form.image} data-testid="image"/>
        else return <img id="image-preview" alt="Preview of restaurant logo" style={styles.image} />
    }

    function getButtons(){
        if(notNew) return<Button style={restaurantFormStyles.button} onClick={nextScreen} variant="primary">Edit my information</Button>
        else{
            return(
                <Fragment>
                    <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
                    <Button style={restaurantFormStyles.button} variant="primary" onClick={nextScreen} >Continue</Button>
                </Fragment>
            )
        }
    }




    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>{getHeader()}</h1>
            <br />
            <br />

            <div style={styles.container}>
                <Row>
                    <Col>
                        <h4 style={styles.title}>Name: </h4>
                        <p style={styles.name} data-testid="name">{form.name}</p>
                    </Col>
                </Row>
                <br />


                <Row>
                    <Col>
                        <h4 style={styles.title}>Description:</h4>
                        <p style={styles.name} data-testid="description">{form.description}</p>
                    </Col>
                </Row>
                <br />


                <Row>
                    <Col>
                        <h4 style={styles.title}>Image:</h4>

                    </Col>
                </Row>

                {getImage()}

                <br />

                {/* Hours section */}
                <Row>
                    <Col>
                        <h4 style={styles.title}>Hours:</h4>
                    </Col>
                </Row>

                {hoursElement}

                <br />

                {/* Menu Section */}
                <Row>
                    <Col>
                        <h4 style={styles.title}>Menu:</h4>
                        <p style={styles.name}>{form.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form.menuItems.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.name}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
                {getButtons()}
        </div>
    )
};

const styles = {
    container: {
        maxWidth: 600,
        margin: "0 auto",
    },
    title: {
        textAlign: "left",
        fontSize: 18
    },
    image: {
        maxWidth: "100%",
        margin: "2em 0"
    }
}

export default FormRestaurantPreview;