import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating'
import { Spinner } from 'react-bootstrap'
import { DB_URL } from '../utils/Constants'
import axios from 'axios'
import { useUserContext } from '../context/UserContext'


export default function RatingPage() {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { restaurant } = useUserContext();
    // get the restaurants ratings
    useEffect(() => {
        axios.get(`${DB_URL}/ratings/restaurant/${restaurant.id}`, { timeout: 10000 })
            .then(response => {
                const tempRatings = [];

                response.data.map(obj => {
                    tempRatings.push({
                        user: obj.username,
                        rating: obj.rating,
                        ratingContent: obj.message,
                        timeStamp: obj.timestamp
                    });
                });
                setRatings(tempRatings);
            })
            .catch(err => {
                console.log("unable to fetch ratings", err);
            })
            .then(() => {
                // done loading
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <>
                    <Spinner style={{ margin: 40, marginBottom: 10 }} animation="border" variant="primary" />
                    <p style={{ textAlign: "center" }}>Loading ratings</p>
                </>
            ) : (
                <Rating restaurantRatings={ratings}></Rating>
            )}

        </div>
    )
}
