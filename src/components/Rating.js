import { setIn } from 'formik'
import React, {useState, useEffect} from 'react'
import { ChatLeftText } from 'react-bootstrap-icons'
import styled from 'styled-components'
import {average} from '../utils/Utils'

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

const RatingButton = styled.button`
    background-color:white;
    border:none;
    


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
    const [ratingData, setData] = useState(userRating);
    const [ratingIndex, setIndex] = useState(0);

    const [selectRating, setSelect] = useState([]);
    
    const [selectTrue, setSelectTrue] = useState(false);

    const [chooseRating, setChooseRating] = useState(-1);
    const [sortBy, setSortBy] = useState(-1);

    const indexStep = 5;


    useEffect(()=>{
        console.log("here");
        getFromDifferentData();
    }, [ratingIndex, selectTrue, selectRating]);


    function resetListAndIndex(){
        setList([]);
        setIndex(0);
    }

    function getFromDifferentData(){
        if(selectTrue){
            getInfoFromData(selectRating);
            if(ratingIndex + indexStep >= selectRating.length-1){
                setIndex(selectRating.length);
            }
        }else{
            getInfoFromData(ratingData);
            if(ratingIndex + indexStep >= ratingData.length -1){
                setIndex(ratingData.length);
            }
        }
    }

    function getInfoFromData(displayData){
        for(let i = ratingIndex; i < Math.min(ratingIndex + indexStep,displayData.length); i++){
            const element =displayData[i];
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
        // setIndex(Math.min(ratingIndex + indexStep,displayData.length));
    }

    function showMoreFunction(){
        if(selectTrue){
            if(ratingIndex < selectRating.length){
                setIndex(Math.min(ratingIndex + indexStep, selectRating.length));
            }
        }
        else{
            if(ratingIndex < ratingData.length){
                setIndex(Math.min(ratingIndex + indexStep, ratingData.length));
            }
        }
    }

    function checkSelected(){
        if(!selectTrue)
            setSelectTrue(true);
    }

    function ratingSelect(num){
        // setSortBy(num);
        setSortBy();
        setChooseRating(num);
        resetListAndIndex();
        setSelect(ratingData.filter(a => a.rating === num));
        checkSelected();
    }

    async function sortByDate(){
        setSortBy("byDate");
        resetListAndIndex();
        let temp = [];
        if(selectTrue){
            temp = [...selectRating];
        }else{
            temp = [...ratingData];
        }
        temp.sort((a,b) => {
            let tempA = a.timeStamp.split("/");
            let reA = tempA[2] + tempA[0] + tempA[1];
            let tempB = b.timeStamp.split("/");
            let reB = tempB[2] + tempB[0] + tempB[1];
            return reA < reB ? 1 : -1;
        })
        setSelect(temp);
        checkSelected();
    }

    function sortFromBadToGood(){
        setSortBy("badToGood");
        resetListAndIndex();
        let temp = [...ratingData];
        setSelect(temp.sort((a,b) => a.rating > b.rating? 1: -1))
        checkSelected();
    }

    function sortFromGoodToBad(){
        setSortBy("goodToBad");
        resetListAndIndex();
        let temp = [...ratingData];
        setSelect(temp.sort((a,b) => a.rating < b.rating? 1: -1))
        checkSelected();
    }

    if(ratingList[0] == null){
        return(
            <div>
                <button style={{backgroundColor:'white', border:'none'}}
                onClick={()=>{
                    resetListAndIndex();
                    setSelectTrue(false);
                    setSortBy("all");
                    setChooseRating(-1);
                }}>All Ratings</button>
                <h2>There is no Ratings</h2>
            </div>
        )
    }
 

    return(
        <div>
            <HorizontalDiv>
                Rating:
                <RatingButton disabled={chooseRating == 1} onClick={() =>{
                    ratingSelect(1);
                }}>1</RatingButton>
                <RatingButton disabled={chooseRating == 2} onClick={()=>{
                    ratingSelect(2);
                }}>2</RatingButton>
                <RatingButton disabled={chooseRating == 3} onClick={() =>{
                    ratingSelect(3);
                }}>3</RatingButton>
                <RatingButton disabled={chooseRating == 4} onClick={() =>{
                    ratingSelect(4);
                }}>4</RatingButton>
                <RatingButton disabled={chooseRating == 5} onClick={() =>{
                    ratingSelect(5);
                }}>5</RatingButton>
                Order By:
                <RatingButton disabled={sortBy == "byDate"} onClick={sortByDate}>Date</RatingButton>
                <RatingButton style={{display:(chooseRating < 0? 'flex':'none')}} disabled={sortBy == "badToGood"} onClick={sortFromBadToGood}>1 to 5</RatingButton>
                <RatingButton style={{display:(chooseRating < 0? 'flex':'none')}} disabled={sortBy == "goodToBad"} onClick={sortFromGoodToBad}>5 to 1</RatingButton>

                <button style={{backgroundColor:'white', border:'none'}}
                    disabled={!selectTrue} onClick={()=>{
                        resetListAndIndex();
                        setSortBy("all");
                        setChooseRating(-1);
                        setSelectTrue(false);
                    }}>All Ratings</button>
            </HorizontalDiv>
            {ratingList}
            <button id="showMore" onClick={showMoreFunction}>Show More</button>
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
        timeStamp:"03/29/2019"
    },{
        user:"user2",
        rating:5,
        ratingContent:"this is rating number 2",
        timeStamp:"03/01/2021"
    },{
        user:"user3",
        rating:2,
        ratingContent:"this is rating number 3",
        timeStamp:"03/12/2021"
    },{
        user:"user4",
        rating:3,
        ratingContent:"this is rating number 4",
        timeStamp:"03/24/2021"
    },{
        user:"user5",
        rating:3,
        ratingContent:"this is rating number 5",
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
                <h4 style={{display:'flex', marginLeft:'100px', alignItems:'center'}}>Your Ratings</h4>
                <VerticalDiv>
                    <text >5:{ratingList.filter(a => a === 5).length}</text>
                    <text >4:{ratingList.filter(a => a === 4).length}</text>
                    <text >3:{ratingList.filter(a => a === 3).length}</text>
                    <text >2:{ratingList.filter(a => a === 2).length}</text>
                    <text >1:{ratingList.filter(a => a === 1).length}</text>
                    {/* <RatingButton onClick={()=>{ratingSelect(5)}}>5:{ratingList.filter(a => a === 5).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(4)}}>4:{ratingList.filter(a => a === 4).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(3)}}>3:{ratingList.filter(a => a === 3).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(2)}}>2:{ratingList.filter(a => a === 2).length}</RatingButton>
                    <RatingButton onClick={()=>{ratingSelect(1)}}>1:{ratingList.filter(a => a === 1).length}</RatingButton> */}
                    {/* <button style={{backgroundColor:'white', border:'none'}}disabled={allOrder} onClick={()=>{setAll(true); setList(temp_ratings)}}>All Ratings</button> */}
                </VerticalDiv>
            </HorizontalDiv>
            <RatingCard userRating = {theList}></RatingCard>
        </div>
    )
}
