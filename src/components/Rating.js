import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {average} from '../utils/Utils'

const VerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
`


const RatingLayout = styled.div`
    display:flex;
    
    width:100%;
    border-radius:5px;
    justify-content:center;

`

const RatingInternal = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    text-align:left;
    border-bottom:1px dashed;
`

const RatingImg = styled.img`
    width:100px;
    height:100px;
    border-radius:50px;
`

const RatingName = styled.h2`
    padding:0px;
    margin:0px;
    width:100%;
`

const NameAndStar = styled.div`
    display:flex;
`

const RatingButton = styled.div`
    background-color:white;
    border:none;
    font-size:20px;
    font-weight:bold;
    :hover{
        background-color:rgba(125,125,125, 0.5);
    }
`

const RatingStar = ({fill}) => {
    return(
        <svg 
            width="45" 
            height="45" 
            viewBox="0 0 24 24" 
            fill={fill}
            stroke="#393939" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    )
}

const RatingCard = ({userRating}) => {
    const [ratingList, setList] = useState([]);

    useEffect(() => {
        setList([]);
        getInfoFromData();
    }, [userRating]);

    function getInfoFromData(){
        for (let i = 0; i < userRating.length; i++) {
            const element = userRating[i];
            let starList = [];
            for (let x = 0; x < element.rating; x++) {
                starList.push(<RatingStar fill="yellow"/>)
            }
            let temp = 
            <RatingLayout>
                <VerticalDiv>
                    <RatingImg src="/assets/profile.png"></RatingImg>
                    <text>{element.timeStamp}</text>
                </VerticalDiv>
                <RatingInternal>
                    <NameAndStar>
                        <RatingName>{element.user}</RatingName>
                        {starList}
                    </NameAndStar>
                    <text>
                        {element.ratingContent}
                    </text>
                </RatingInternal>
            </RatingLayout>
            setList(ratingList => [...ratingList, temp]);
    
        }

    }

    if(ratingList[0] == null){
        return(
            <h2>There is no Ratings</h2>
        )
    }


    return(
        <div>
            {ratingList}
        </div>
        
    )
}

const AverageRating = ({ratingList}) =>{

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
        timeStamp:"03/29/2021"
    },{
        user:"user2",
        rating:5,
        ratingContent:"this is rating number 2",
        timeStamp:"03/30/2021"
    },{
        user:"user3",
        rating:2,
        ratingContent:"this is rating number 3",
        timeStamp:"03/30/2021"
    },{
        user:"user4",
        rating:3,
        ratingContent:"this is rating number 4",
        timeStamp:"03/31/2021"
    }];

    const [theList, setList] = useState(temp_ratings);
    const ratingList = temp_ratings.map((a=> a.rating));
    const [allOrder, setAll] = useState(true);



    function ratingSelect(num){
        setAll(false);
        setList(temp_ratings.filter(a => a.rating === num));
    }

    return (
        <div>
            <HorizontalDiv>
                <VerticalDiv>
                    <div>
                        <h4>Average Rating</h4> 
                        <AverageRating ratingList={ratingList}></AverageRating>
                    </div>
                </VerticalDiv>
                <h4 style={{display:'flex', marginLeft:'100px', alignItems:'center'}}>Ratings</h4>
                <VerticalDiv>
                    <RatingButton onClick={()=>{ratingSelect(5)}}>5:{ratingList.filter(a => a === 5).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(4)}}>4:{ratingList.filter(a => a === 4).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(3)}}>3:{ratingList.filter(a => a === 3).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(2)}}>2:{ratingList.filter(a => a === 2).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(1)}}>1:{ratingList.filter(a => a === 1).length}</RatingButton>
                    <button style={{backgroundColor:'white', border:'none'}}disabled={allOrder} onClick={()=>{setAll(true); setList(temp_ratings)}}>All Ratings</button>
                </VerticalDiv>
            </HorizontalDiv>
            <RatingCard userRating = {theList}></RatingCard>
        </div>
    )
}
