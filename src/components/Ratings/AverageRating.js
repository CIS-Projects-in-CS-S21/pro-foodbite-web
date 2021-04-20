import React, {useState, useEffect} from 'react'
import {RatingStar} from './RatingStar'
import {average} from '../../utils/Utils'

export const AverageRating = ({ratingList}) =>{

    useEffect(() => {
        setAverage([]);
        getAverage();
    }, [ratingList])

    const [averageRating, setAverage] = useState([]);

    function getAverage(){
        for (let i = 0; i < Math.round(average(ratingList)); i++) {
            let temp = <RatingStar fill="yellow"/>
            setAverage(averageRating => [...averageRating, temp]);
        }
    }
    return(
        <div>
            {averageRating}
            <br/><br/>
        </div>
    )
}