import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {average} from '../utils/Utils'
import {RatingCard} from './Ratings/RatingCard'
import {RatingStar} from './Ratings/RatingStar'
import {AverageRating} from './Ratings/AverageRating'

const VerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const HorizontalDiv = styled.div`
    font-size:20px;
    font-weight:bold;
    display:flex;
    justify-content:center;
`

export default function Rating({restaurantRatings}) {
    // if(restaurantRatings == null){
    //     return(
    //         <div>
    //             <h3>
    //                 Don't have any ratings right now
    //             </h3>
    //         </div>
    //     )
    // }
    
    const temp_ratings = [{
        user:"user1",
        rating:4,
        ratingContent:"place holder text place holder text place holder text place holder text\
        text place holder text place holder text place holder text text place holder text place holder text place holder text\
        text place holder text place holder text place holder text text place holder text place holder text place holder text\
        text place holder text place holder text place holder text text place holder text place holder text place holder text\
        text place holder text place holder text place holder text text place holder text place holder text place holder text\
        text place holder text place holder text place holder text text place holder text place holder text place holder text\
        this is rating number 1",
        timeStamp:"03/29/2019"
    },{
        user:"user2",
        rating:5,
        ratingContent:"this is rating number 2, place holder",
        timeStamp:"03/01/2021"
    },{
        user:"user3",
        rating:2,
        ratingContent:"this is rating number 3, number 3",
        timeStamp:"03/12/2021"
    },{
        user:"user4",
        rating:3,
        ratingContent:"this is rating number 4 by user4",
        timeStamp:"03/24/2021"
    },{
        user:"user5",
        rating:3,
        ratingContent:"this is rating number 5, some text to make this rating longer",
        timeStamp:"01/31/2021"
    },{
        user:"user6",
        rating:3,
        ratingContent:"this is rating number 6",
        timeStamp:"02/18/2021"
    },{
        user:"user7",
        rating:4,
        ratingContent:"this is rating number 7",
        timeStamp:"09/24/2021"
    },{
        user:"user8",
        rating:5,
        ratingContent:"this is rating number 8",
        timeStamp:"10/12/2021"
    },{
        user:"user9",
        rating:3,
        ratingContent:"this is rating number 9",
        timeStamp:"06/25/2021"
    },{
        user:"user10",
        rating:2,
        ratingContent:"this is rating number 10",
        timeStamp:"06/27/2021"
    },{
        user:"user11",
        rating:4,
        ratingContent:"this is rating number 11",
        timeStamp:"01/31/2021"
    },{
        user:"user12",
        rating:5,
        ratingContent:"this is rating number 12",
        timeStamp:"12/30/2021"
    },{
        user:"user13",
        rating:2,
        ratingContent:"this is rating number 13",
        timeStamp:"07/23/2021"
    },{
        user:"user14",
        rating:5,
        ratingContent:"this is rating number 14",
        timeStamp:"08/24/2021"
    },{
        user:"user15",
        rating:3,
        ratingContent:"this is rating number 15",
        timeStamp:"01/12/2021"
    },{
        user:"user16",
        rating:4,
        ratingContent:"this is rating number 16",
        timeStamp:"03/03/2021"
    },{
        user:"user17",
        rating:3,
        ratingContent:"this is rating number 17",
        timeStamp:"04/04/2021"
    },{
        user:"user18",
        rating:2,
        ratingContent:"this is rating number 18",
        timeStamp:"05/05/2021"
    },{
        user:"user19",
        rating:3,
        ratingContent:"this is rating number 19",
        timeStamp:"04/12/2021"
    },{
        user:"user20",
        rating:3,
        ratingContent:"this is rating number 20",
        timeStamp:"03/31/2011"
    }];

    const [theList, setList] = useState(temp_ratings);
    const ratingList = temp_ratings.map((a=> a.rating));

    return (
        <div>
            <HorizontalDiv>
                <VerticalDiv>
                    <div>
                        <h4>Average Rating</h4> 
                        <AverageRating ratingList={ratingList}></AverageRating>
                    </div>
                </VerticalDiv>
                <h4 style={{display:'flex', marginLeft:'100px', marginRight:"10px", alignItems:'center'}}>Total {<br></br>} Ratings</h4>
                <VerticalDiv>
                    <text >5:{ratingList.filter(a => a === 5).length}</text>
                    <text >4:{ratingList.filter(a => a === 4).length}</text>
                    <text >3:{ratingList.filter(a => a === 3).length}</text>
                    <text >2:{ratingList.filter(a => a === 2).length}</text>
                    <text >1:{ratingList.filter(a => a === 1).length}</text>
                </VerticalDiv>
            </HorizontalDiv>
            <RatingCard userRating = {theList}></RatingCard>
        </div>
    )
}
