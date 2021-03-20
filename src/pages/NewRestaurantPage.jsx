/**
 *  Creates the setup guide that users
 *  will see when they create a new account.
 *  The guide will collect all of the required
 *  information we need and then insert it into
 *  the database.
 * 
 * @returns A multipage setup guide for new restaurants
 */

import { useState } from 'react'
import FormWelcome from '../components/newRestaurant/FormWelcome';
import FormRestaurantName from '../components/newRestaurant/FormRestaurantName';
import FormUploadImage from '../components/newRestaurant/FormUploadImage';
import FormRestaurantDescription from '../components/newRestaurant/FormRestaurantDescription';
import FormRestaurantHours from '../components/newRestaurant/FormRestaurantHours';
import FormRestaurantMenu from '../components/newRestaurant/FormRestaurantMenu';
import FormRestaurantPreview from '../components/newRestaurant/FormRestaurantPreview';
import FormRestaurantSubmit from '../components/newRestaurant/FormRestaurantSubmit';
import { restaurantFormStyles } from "../components/newRestaurant/RestaurantFormStyles"

const NewRestaurantPage = () => {
    /*
        Screen
        1 -> Welcome
        2 -> Insert restaurant name
        3 -> Upload image
        4 -> Insert description
        5 -> Insert hours of operation
        6 -> Create menu
        7 -> Preview
        8 -> Submit to database
    */
    const screens = {
        WELCOME: 1,
        INSERT_NAME: 2,
        UPLOAD_IMAGE: 3,
        INSERT_DESC: 4,
        INSERT_HOURS: 5,
        CREATE_MENU: 6,
        PREVIEW: 7,
        SUBMIT: 8
    };
    const restaurantDefaultState = {
        name: "",
        image: "",
        description: "",
        menu: [],
        hours: {
            monday: {
                open: "",
                close: ""
            },
            tuesday: {
                open: "",
                close: ""
            },
            wednesday: {
                open: "",
                close: ""
            },
            thursday: {
                open: "",
                close: ""
            },
            friday: {
                open: "",
                close: ""
            },
            saturday: {
                open: "",
                close: ""
            },
            sunday: {
                open: "",
                close: ""
            },
        },
        menuItems: [],
        screen: 1,
        submitting: false,
        success: false
    };
    const [form, setForm] = useState(restaurantDefaultState);

    const maxScreenAmount = 8;

    const nextScreen = (e) => {
        if (e)
            e.preventDefault();

        if (form.screen + 1 > maxScreenAmount) {
            console.log('nope');
            return;
        }

        const ele = document.getElementById('test');
        fade(ele, 700, () => setForm({ ...form, screen: form.screen + 1 }));
    };

    const prevScreen = () => {
        if (form.screen - 1 < 1) {
            console.log('no go', form.screen);
            return;
        }

        const ele = document.getElementById('test');
        fade(ele, 700, () => setForm({ ...form, screen: form.screen - 1 }));
    };

    const resetForm = () => {
        setForm(restaurantDefaultState);
    };

    function slideLeft(ele, time, callback) {
        // a simple sliding animation
        ele.style.opacity = 0;
        ele.style.left = "-200vw";
        ele.style.visibility = "hidden";
        setTimeout(() => {
            ele.style.opacity = 1;
            ele.style.left = "0";
            ele.style.visibility = "visible";

            callback();
        }, time)
    }

    function slideRight(ele, time, callback) {
        // a simple sliding animation
        ele.style.opacity = 0;
        ele.style.right = "-200vw";

        ele.style.visibility = "hidden";
        setTimeout(() => {
            ele.style.right = "0";
            ele.style.opacity = 1;
            ele.style.visibility = "visible";

            callback();
        }, time)
    }

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
            case screens.WELCOME:
                return (
                    <FormWelcome nextScreen={nextScreen} />
                );
            case screens.INSERT_NAME:
                return (
                    <FormRestaurantName
                        nextScreen={nextScreen}
                        prevScreen={prevScreen}
                        form={form}
                        setForm={setForm}
                    />
                );
            case screens.UPLOAD_IMAGE:
                return (
                    <FormUploadImage
                        nextScreen={nextScreen}
                        prevScreen={prevScreen}
                        form={form}
                        setForm={setForm}
                    />
                );
            case screens.INSERT_DESC:
                return (
                    <FormRestaurantDescription
                        nextScreen={nextScreen}
                        prevScreen={prevScreen}
                        form={form}
                        setForm={setForm}
                    />
                );
            case screens.INSERT_HOURS:
                return (
                    <FormRestaurantHours
                        nextScreen={nextScreen}
                        prevScreen={prevScreen}
                        form={form}
                        setForm={setForm}
                    />
                );
            case screens.CREATE_MENU:
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
                    />
                );
            case screens.SUBMIT:
                return (
                    <FormRestaurantSubmit
                        nextScreen={nextScreen}
                        prevScreen={prevScreen}
                        form={form}
                        setForm={setForm}
                        resetForm={resetForm}
                    />
                );
            default:
                return (
                    <h1 onClick={prevScreen}>Unknown screen</h1>
                );
        }
    }

    return (
        <div id="test" style={restaurantFormStyles.animate}>
            {renderCurrentScreen()}
        </div>
    )
};

export default NewRestaurantPage;