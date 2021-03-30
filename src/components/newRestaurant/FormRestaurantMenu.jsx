import { useState } from 'react'
import { Button, Modal, Table, Form, Row, Col } from 'react-bootstrap'
import { PencilFill, TrashFill } from 'react-bootstrap-icons'
import { checkPrice } from '../../utils/Utils'
import { restaurantFormStyles } from './RestaurantFormStyles'


const FormRestaurantMenu = ({ nextScreen, prevScreen, form, setForm }) => {
    const defaultMenuItem = {
        name: "",
        price: "",
        description: "",
        valid: true
    }
    const [menuItem, setMenuItem] = useState(defaultMenuItem);
    const [showPopup, setShowPopup] = useState(false);
    const [editingItem, setEditingItem] = useState({ index: -1, status: false });

    // handles displaying the modal
    const handleOpen = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);

    const handleSubmit = (e) => {
        if (e)
            e.preventDefault();

        // check for valid price
        if (menuItem.valid) {
            let tempMenuItems = [...form.menuItems];
            if (editingItem.status) {
                tempMenuItems[editingItem.index].name = menuItem.name;
                tempMenuItems[editingItem.index].price = menuItem.price;
                tempMenuItems[editingItem.index].description = menuItem.description;

                setEditingItem({ index: -1, status: false });
            } else
                tempMenuItems.push(menuItem);
            // update global form
            handleClose();

            setForm({ ...form, menuItems: tempMenuItems });
        }
    }

    const editItem = (item, index) => {
        setEditingItem({ index, status: true });
        const tempItem = {
            name: item.name,
            price: item.price,
            description: item.description,
            valid: true
        }
        setMenuItem(tempItem);
        handleOpen();
    }

    const deleteItem = index => {
        let tempMenuItems = [...form.menuItems];
        tempMenuItems.splice(index, 1);
        setForm({ ...form, menuItems: tempMenuItems });
    }

    const reset = () => {
        setMenuItem(defaultMenuItem);
        handleOpen();
    }

    const checkMenuItem = (e) => setMenuItem({ ...menuItem, valid: checkPrice(e.target.value), price: e.target.value });

    return (
        <div style={restaurantFormStyles.container}>
            <h1 style={restaurantFormStyles.h1}>What delicous food do you serve?</h1>
            <br />


            <Modal show={showPopup} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>New Menu Item</Modal.Title>
                </Modal.Header>
                <Form style={restaurantFormStyles.form} onSubmit={handleSubmit}>
                    <Modal.Body>
                        {menuItem.valid ? null : (
                            <Row>
                                <Col>
                                    <p style={restaurantFormStyles.errorMsg}>Invalid price. Must have 2 decimal places.</p>
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Col>
                                <Form.Label>Item name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cheeseburger"
                                    required
                                    defaultValue={menuItem.name}
                                    onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="5.26"
                                    step="0.01"
                                    min="0.01"
                                    required
                                    defaultValue={menuItem.price}
                                    onChange={checkMenuItem}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="the special sauce for your dish"

                                    defaultValue={menuItem.description}
                                    onChange={(e) => setMenuItem({ ...menuItem, description: e.target.value })}
                                />
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit"  >Done</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Table style={styles.table}>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {form.menuItems.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td>{item.name}</td>
                                <td style={styles.actionButtons}>
                                    <PencilFill
                                        style={styles.actionButton}
                                        size={20}
                                        onClick={() => editItem(item, key)}
                                    />
                                    <TrashFill
                                        size={20}
                                        onClick={() => deleteItem(key)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Button style={restaurantFormStyles.button} variant="secondary" onClick={reset}>Add menu item</Button>
            <br />

            <Button style={restaurantFormStyles.button} onClick={prevScreen} variant="secondary">Previous</Button>
            <Button style={restaurantFormStyles.button} onClick={nextScreen} variant="primary" >Continue</Button>
        </div >
    )
};





const styles = {
    table: {
        maxWidth: 800,
        margin: "0 auto",
        marginTop: 20
    },
    actionButtons: {
        cursor: "pointer"
    },
    actionButton: {
        marginRight: 20
    }
};

export default FormRestaurantMenu;