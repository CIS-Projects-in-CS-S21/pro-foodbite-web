import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import DailyInfo from '../components/Sales/DailyInfo'
import MonthlyReport from '../components/Sales/MonthlyReport'
import DailySalesReport from '../components/Sales/DailySalesReport'
import PopluarStatus from './Sales/PopularStatus'
import { mock_archived_orders, today_archived } from "../tempData"
import { get_today_sales, sort_this_week } from "../utils/Utils"
import { useUserContext } from "../context/UserContext"
import { sort_today, get_sales_month } from "../utils/Utils"
import "./analytics/analytics.css"

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

export default function Sales() {

    const type = {
        DAILY_INFO: 1,
        POPULAR_ITEMS: 2,
        TYPE_3: 3,
        TYPE_4: 4
      };


    const { restaurant, userDb, get_doc } = useUserContext(); 
    
    // const [loading, set_loading] = useState(false);
    const [active, set_active] = useState(1);
    const [mock, set_mock] = useState(false);
    const [actual, set_actual] = useState([]);

    const [archived, set_archived] = useState([]); 
    const [today, set_today] = useState([]); 
    const [monthly, set_monthly] = useState([]); 

    

    useEffect(() => {
        document.getElementById("type-1").style.color = "#e9eaeb";
    }, []);

    useEffect( () => {

        // get archived orders, parse ... 
        const get_today = async () => {

            await get_doc(`archivedOrders/${userDb.ownedRestaurants[0]}`)
            .then( doc => {
                if(doc.exists){
                    let orders = doc.data().orders; 
                    let archived_orders = [];
        
                    for (const id in orders){
                        archived_orders.push(orders[id]); 
                    }

                    set_archived(archived_orders); 

                    // todays archived orders
                    let filtered = sort_today(archived_orders); 

                    // filter out those canceled too?
                    set_today(filtered);

                    // get daily sales for current month
                    filtered = get_sales_month(archived_orders); 


                }
            });
        }

        get_today(); 

        // ex. parse archived orders for day (for daily sales) (USE your util function to get orders from current week)

    }, [get_doc, userDb.ownedRestaurants]); 


    const handle_use_mock_data = (e) => {
        //  use mock data for ACTIVE, for demoing purposes

        if(mock === false){
            switch(active){
                case 1:
                    set_actual(today); 
                    set_today(today_archived);
                    break; 
                case 2:
                    set_actual(archived);
                    set_archived(mock_archived_orders); 
                    break;
                case 3:
                    set_actual(monthly);
                    set_monthly([]);
                    break;
                case 4:
                    // set_actual(monthly);
                    // set_monthly([]);
                    break; 
                default:
                    break; 
            }
        }
        else{
            switch(active){
                case 1:
                    set_today(actual);
                    break; 
                case 2:
                    set_archived(actual);
                    break;
                case 3:
                    set_monthly(actual);
                    break;
                case 4:
                    
                    // TODO
                    break; 
                default:
                    break; 
            }
        }

        set_mock(!mock);
    }

    const render_screen = () => {

        switch (active){

            case type.DAILY_INFO:
                return <DailyInfo data={today}></DailyInfo>

            case type.POPULAR_ITEMS:
                return <PopluarStatus data={archived}></PopluarStatus>

            case type.TYPE_3:
                return <DailySalesReport theDataArray={""}></DailySalesReport>

            case type.TYPE_4:
                return <MonthlyReport theDataArray={""}></MonthlyReport>

            default:
                return <h1>Default</h1>
        }
    }

    const handle_navigate = (number) => {

        document.getElementById(`type-${active}`).removeAttribute("style"); 
        document.getElementById(`type-${number}`).style.color = "#e9eaeb";
        document.getElementById("toggle").checked = false;
        set_active(number); 
        set_mock(false);
      }

    return (
        <Fragment>

            <Header>{restaurant.name}'S SALES</Header>
            <Navigation>
                <Field id="type-1" onClick={() => handle_navigate(type.DAILY_INFO)}>Sales Today</Field>
                <Field id="type-2" onClick={() => handle_navigate(type.POPULAR_ITEMS)}>Popular Items</Field>
                <Field id="type-3" onClick={() => handle_navigate(type.TYPE_3)}>Something</Field>
                <Field id="type-4" onClick={() => handle_navigate(type.TYPE_4)}>Something</Field>
            </Navigation>



            <Mock>
                MOCK DATA
                <input class="toggle-mock-input" type="checkbox" id="toggle" onChange={(e) => handle_use_mock_data(e)}/>
                <label class="toggle-mock-label" for="toggle"/>
            </Mock>

            {render_screen()}

                {/* <VerticalDiv>
                    <DailyInfo data={mock_archived_orders}></DailyInfo>
                    <div>
                        <PopluarStatus data={today_archived}></PopluarStatus>
                        <DailySalesReport theDataArray={dailyTempArray}></DailySalesReport>
                        <MonthlyReport theDataArray={monthlyTempArray}>
                        </MonthlyReport>
                    </div>
                </VerticalDiv> */}
        </Fragment>
    )
}

const Navigation = styled.div`
    position: absolute; 
    background-color: #333a40; 
    padding: 4px; 
    left: 4%; 
`; 

const Header = styled.div`
    font-family: "Amatic SC", cursive;
    font-size: 3.5rem; 
    border-bottom: 2px solid #f0f3f5; 
    width: 50%;
    margin: 0 auto;
`; 

const Field = styled.div`
    padding: 10px; 
    font-size: 1.5rem; 

    color: #868e95;

    &:hover{
    cursor: pointer; 
    color: #e9eaeb; 
    }
`;

const Mock = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    width: 50%;
    margin: 1% auto;
`; 

// const MockInput = styled.input`
//     visibility: hidden;
//     height: 0;
//     width: 0

// `; 

// const MockLabel = styled.label`
//     cursor: pointer;
//     width: 100px;
//     height: 50px; 
//     border-radius: 100px; 
//     background-color: #333a40;    
//     display: block;
// 	position: relative;

//     &:after{
//         content: "";
//         position: absolute;
//         top: 5px;
//         left: 5px;
//         width: 40px;
//         height: 40px;
//         border-radius: 90px;
//         background-color: #e9eaeb;

//         transition: 0.3s; 
//     }




// `; 
