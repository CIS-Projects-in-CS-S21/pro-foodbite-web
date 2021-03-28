import { useState } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap'
import { restaurantFormStyles } from './RestaurantFormStyles'
import { checkTimeRange } from '../../utils/Utils'

const FormRestaurantHours = ({ nextScreen, prevScreen, form, setForm }) => {
    const [validTimes, setValidTimes] = useState(true);

    const handleTimeChange = (ele, type, day) => {
        let tempState = { ...form };

        tempState.hours[day][type] = ele.target.value;
        tempState.hours[day].valid = checkTimeRange(tempState.hours[day].open, tempState.hours[day].close);
        // check to see if error message needs to be displayed
        setValidTimes(tempState.hours[day].valid);
        setForm(tempState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // make sure all time values are within range
        for (let day in form.hours) {
            if (!checkTimeRange(day.open, day.close)) {
                setValidTimes(false);
                return;
            }
        }
        if (validTimes)
            nextScreen();
    };

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>What's the business hours for <i>{form.name}</i>?</h1>
            <br />

            {validTimes ? null : (
                <p style={restaurantFormStyles.errorMsg}>invalid time range(s)</p>
            )}


            <Form style={restaurantFormStyles.form} onSubmit={handleSubmit}>
                <div style={restaurantFormStyles.timeContainer}>
                    <Row>
                        <Col>Monday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "monday")}
                                    defaultValue={form.hours.monday.open}
                                    data-testid="monday-open"
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "monday")}
                                    defaultValue={form.hours.monday.close}
                                    data-testid="monday-close"
                                />

                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Tuesday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "tuesday")}
                                    defaultValue={form.hours.tuesday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "tuesday")}
                                    defaultValue={form.hours.tuesday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Wednesday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "wednesday")}
                                    defaultValue={form.hours.wednesday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "wednesday")}
                                    defaultValue={form.hours.wednesday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Thursday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "thursday")}
                                    defaultValue={form.hours.thursday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "thursday")}
                                    defaultValue={form.hours.thursday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Friday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "friday")}
                                    defaultValue={form.hours.friday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "friday")}
                                    defaultValue={form.hours.friday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Saturday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "saturday")}
                                    defaultValue={form.hours.saturday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "saturday")}
                                    defaultValue={form.hours.saturday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                    <br />

                    <Row>
                        <Col>Sunday</Col>
                        <Col>
                            <div style={restaurantFormStyles.time}>
                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "open", "sunday")}
                                    defaultValue={form.hours.sunday.open}
                                />

                                <p style={restaurantFormStyles.timeP}>to</p>

                                <Form.Control
                                    type="time"
                                    onChange={ele => handleTimeChange(ele, "close", "sunday")}
                                    defaultValue={form.hours.sunday.close}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
                <Button style={restaurantFormStyles.button} variant="primary" type="submit" disabled={!validTimes} >Continue</Button>

            </Form>
        </div>
    )
};

export default FormRestaurantHours;