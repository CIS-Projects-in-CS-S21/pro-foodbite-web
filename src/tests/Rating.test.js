import React from 'react'
import ReactDOM from 'react-dom';
import {AverageRating} from '../components/Ratings/AverageRating'
import {render, fireEvent, screen, act, getByText, queryByText} from '@testing-library/react'
import {RatingCard} from '../components/Ratings/RatingCard'
import Rating from '../components/Rating'
import {SearchContent, SearchUser} from '../components/Ratings/Search'

describe('average rating', () => {
    let tempRating = [{
        user:"user2",
        rating:5,
        ratingContent:"this is rating number 2, place holder",
        timeStamp:"03/01/2021"
    },{
        user:"user5",
        rating:2,
        ratingContent:"rating number 5",
        timeStamp:"02/12/1998"
    }];

    it("No average rating", ()=>{
        let root = document.createElement("div");
        ReactDOM.render(<AverageRating ratingList={[]}/>, root);
        expect(getByText(root,'Average Rating Unavailable')).not.toBe(null);
    })

    it("show average rating", () =>{
        let root = document.createElement("div");
        ReactDOM.render(<AverageRating ratingList={tempRating}/> ,root);
        expect(getByText(root, 'Average Rating')).not.toBe(null);
    })
})


describe("with no rating", ()=>{
    it("should not found any rating", ()=>{
        let root = document.createElement("div");
        ReactDOM.render(<RatingCard userRating={[]}></RatingCard>, root)
        expect(getByText(root, "There is no Ratings")).not.toBe(null);
    }) 
})

describe("with rating", ()=>{
    let tempRating = [{
        user:"user2",
        rating:2,
        ratingContent:"this is rating number 2, place holder",
        timeStamp:"03/01/2021"
    },{
        user:"user5",
        rating:5,
        ratingContent:"rating number 5",
        timeStamp:"02/12/1998"
    }];

    let container;

    beforeEach(async ()=>{
        await act(async ()=>{
            render(<div>
                <RatingCard userRating={tempRating} />
            </div>, container);
        })
    })


    it("should find a rating", async ()=>{
        expect(screen.getByText("user2")).not.toBe(null);
        expect(screen.getByText("this is rating number 2, place holder")).not.toBe(null);
        
    })


    it("Choose Rating", async () =>{
        const button = screen.getByText("5");
        fireEvent.click(button);
        expect(screen.getByText("user5")).not.toBe(null);
        expect(screen.queryByText("user2")).toBe(null);
    })
})

describe("search function", () => {
        let tempRating = [{
            user:"user2",
            rating:2,
            ratingContent:"this is rating number 2, place holder",
            timeStamp:"03/01/2021"
        },{
            user:"user5",
            rating:5,
            ratingContent:"rating number 5",
            timeStamp:"02/12/1998"
        }];

        let container; 
        beforeEach( async () => {
            await act( async () => {
            render(
                <div>
                    <RatingCard userRating={tempRating} />
                </div>
            , container)
            }); 
        });

        it("should display user2 not user5 after button is clicked", ()=>{
            const contentInput = screen.getByPlaceholderText("content");
            const contentButton = screen.getByText("find content");
            expect(contentInput).not.toBe(null);
            expect(contentButton).not.toBe(null);
            expect(screen.queryByText("user5")).not.toBe(null);

            contentInput.value = "number 2";
            fireEvent.click(contentButton);
            expect(screen.queryByText("user5")).toBe(null);
            expect(screen.queryByText("user2")).not.toBe(null);
        })

        it("should search for user 5, user2 should not be displayed", ()=>{
            const userNameInput = screen.getByPlaceholderText("User Name");
            const userNameButton = screen.getByText("find user");
            expect(userNameInput).not.toBe(null);
            expect(userNameButton).not.toBe(null);
            expect(screen.queryByText("user5")).not.toBe(null);
    
            userNameInput.value = "user5";
            fireEvent.click(userNameButton);
            expect(screen.queryByText("user5")).not.toBe(null);
            expect(screen.queryByText("user2")).toBe(null);
        })
})

