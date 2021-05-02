import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RatingStar } from './RatingStar'
import { SearchContent, SearchUser } from './Search'

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
    p-align:left;
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
    background-color:transparent;
    border:none;

    :hover{
        background-color:rgba(125,125,125, 0.5);
    }
`

const MoreButton = styled.button`
    background-color:transparent;
    margin:10px;
    border:1px solid;
    border-radius:2px;
    padding-left:20px;
    padding-right:20px;
    :hover{
        background-color:rgba(125,125,125,0.5);
    }
`


export const RatingCard = ({ userRating }) => {

    const [ratingList, setList] = useState([]);
    const [ratingIndex, setIndex] = useState(0);

    const [selectRating, setSelect] = useState([]);

    const [selectTrue, setSelectTrue] = useState(false);

    const [chooseRating, setChooseRating] = useState(-1);
    const [sortBy, setSortBy] = useState(-1);

    const indexStep = 50;


    useEffect(() => {
        getFromDifferentData();
    }, [ratingIndex, selectTrue, selectRating, userRating]);


    function resetListAndIndex() {
        setList([]);
        setIndex(0);
    }

    function getFromDifferentData() {
        if (selectTrue) {
            getInfoFromData(selectRating);
            if (ratingIndex + indexStep >= selectRating.length - 1) {
                setIndex(selectRating.length);
            }
        } else {
            getInfoFromData(userRating);
            if (ratingIndex + indexStep >= userRating.length - 1) {
                setIndex(userRating.length);
            }
        }
    }

    function getInfoFromData(displayData) {
        const elements = [];
        for (let i = ratingIndex; i < Math.min(ratingIndex + indexStep, displayData.length); i++) {
            const element = displayData[i];
            let starList = [];
            for (let x = 0; x < element.rating; x++) {
                starList.push(<RatingStar key={x} fill="yellow" />)
            }
            let temp =
                <RatingLayout key={i}>
                    <VerticalDiv>
                        <RatingImg src="/assets/profile.png"></RatingImg>
                        <p>{element.timeStamp}</p>
                    </VerticalDiv>
                    <RatingInternal>
                        <NameAndStar>
                            <RatingName>{element.user}</RatingName>
                            {starList}
                        </NameAndStar>
                        <p>
                            {element.ratingContent}
                        </p>
                    </RatingInternal>
                </RatingLayout>
            elements.push(temp);

        }
        setList(ratingList => [...ratingList, elements]);
    }

    function showMoreFunction() {
        if (selectTrue) {
            if (ratingIndex < selectRating.length) {
                setIndex(Math.min(ratingIndex + indexStep, selectRating.length));
            }
        }
        else {
            if (ratingIndex < userRating.length) {
                setIndex(Math.min(ratingIndex + indexStep, userRating.length));
            }
        }
    }

    function checkSelected() {
        if (!selectTrue)
            setSelectTrue(true);
    }

    function ratingSelect(num) {
        setSortBy();
        setChooseRating(num);
        resetListAndIndex();
        setSelect(userRating.filter(a => a.rating === num));
        checkSelected();
    }

    function sortByDate() {
        setSortBy("byDate");
        resetListAndIndex();
        let temp = [];
        if (selectTrue) {
            temp = [...selectRating];
        } else {
            temp = [...userRating];
        }
        temp.sort((a, b) => {
            let tempA = a.timeStamp.split("/");
            let reA = tempA[2] + tempA[0] + tempA[1];
            let tempB = b.timeStamp.split("/");
            let reB = tempB[2] + tempB[0] + tempB[1];
            return reA < reB ? 1 : -1;
        })
        setSelect(temp);
        checkSelected();
    }

    function sortByContent() {
        setSortBy("contentLength")
        resetListAndIndex();
        let temp = [];
        if (selectTrue) {
            temp = [...selectRating];
        } else {
            temp = [...userRating];
        }
        setSelect(temp.sort((a, b) => a.ratingContent.length < b.ratingContent.length ? 1 : -1));
        checkSelected();
    }


    function sortFromBadToGood() {
        setSortBy("badToGood");
        resetListAndIndex();
        let temp = [];
        if (selectTrue) {
            temp = [...selectRating];
        } else {
            temp = [...userRating];
        }
        setSelect(temp.sort((a, b) => a.rating > b.rating ? 1 : -1))
        checkSelected();
    }

    function sortFromGoodToBad() {
        setSortBy("goodToBad");
        resetListAndIndex();
        let temp = [];
        if (selectTrue) {
            temp = [...selectRating];
        } else {
            temp = [...userRating];
        }
        setSelect(temp.sort((a, b) => a.rating < b.rating ? 1 : -1))
        checkSelected();
    }

    function findRatingWithContent(e) {
        e.stopPropagation()
        var el = document.getElementById("searchContent");
        if (el.value !== "") {
            setChooseRating(-1);
            setSortBy(-1);
            resetListAndIndex();
            let temp = [...userRating];
            setSelect(temp.filter(a => a.ratingContent.search(el.value) > -1));
            checkSelected();
        }
    }

    function findRatingWithUserName(e) {
        e.stopPropagation();
        var el = document.getElementById("searchUser");
        if (el.value !== "") {
            setChooseRating(-1);
            setSortBy(-1);
            resetListAndIndex();
            let temp = [...userRating];
            setSelect(temp.filter(a => a.user.search(el.value) > -1));
            checkSelected();
        }
    }


    return (
        <>
            {userRating.length === 0 ? (
                <div>
                    <button style={{ backgroundColor: 'white', border: 'none' }}
                        onClick={() => {
                            resetListAndIndex();
                            setSelectTrue(false);
                            setSortBy("all");
                            setChooseRating(-1);
                        }}>All Ratings</button>
                    <h2>There is no Ratings</h2>
                </div>
            ) : (

                <div>
                    <HorizontalDiv>
                        Rating:
                <RatingButton disabled={chooseRating === 1} onClick={() => {
                            ratingSelect(1);
                        }}>1</RatingButton>
                        <RatingButton disabled={chooseRating === 2} onClick={() => {
                            ratingSelect(2);
                        }}>2</RatingButton>
                        <RatingButton disabled={chooseRating === 3} onClick={() => {
                            ratingSelect(3);
                        }}>3</RatingButton>
                        <RatingButton disabled={chooseRating === 4} onClick={() => {
                            ratingSelect(4);
                        }}>4</RatingButton>
                        <RatingButton disabled={chooseRating === 5} onClick={() => {
                            ratingSelect(5);
                        }}>5</RatingButton>
                Order By:
                <RatingButton disabled={sortBy === "byDate"} onClick={sortByDate}>Date</RatingButton>
                        <RatingButton style={{ display: (chooseRating < 0 ? 'flex' : 'none') }} disabled={sortBy === "badToGood"} onClick={sortFromBadToGood}>1 to 5</RatingButton>
                        <RatingButton style={{ display: (chooseRating < 0 ? 'flex' : 'none') }} disabled={sortBy === "goodToBad"} onClick={sortFromGoodToBad}>5 to 1</RatingButton>
                        <RatingButton disabled={sortBy === "contentLength"} onClick={sortByContent}>content</RatingButton>
                        <button style={{ backgroundColor: 'white', border: 'none' }}
                            disabled={!selectTrue} onClick={() => {
                                resetListAndIndex();
                                setSortBy("all");
                                setChooseRating(-1);
                                setSelectTrue(false);
                            }}>All Ratings</button>
                Search For:
                <SearchContent findContent={findRatingWithContent} />
                        <SearchUser findContent={findRatingWithUserName} />
                    </HorizontalDiv>
                    {ratingList}
                    <MoreButton disabled={selectTrue ? ratingIndex >= selectRating.length : ratingIndex >= userRating.length} onClick={showMoreFunction}>Show More</MoreButton>
                </div>
            )}
        </>
    )
}
