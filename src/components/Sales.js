import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import DailyInfo from '../components/Sales/DailyInfo'
import MonthlyReport from '../components/Sales/MonthlyReport'
import DailySalesReport from '../components/Sales/DailySalesReport'
import PopluarStatus from './Sales/PopularStatus'
import { mock_archived_orders, today_archived, mock_daily_sales, mock_monthly_sales } from "../tempData"
import { useUserContext } from "../context/UserContext"
import { sort_today, get_sales_this_month, get_sales_this_year } from "../utils/Utils"
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
    const [month, set_month] = useState([]); 
    const [year, set_year] = useState([]); 


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
                    filtered = get_sales_this_month(archived_orders); 
                    set_month(filtered);

                    // get monthly sales for current year
                    filtered = get_sales_this_year(archived_orders);
                    set_year(filtered);
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
                    set_actual(month);
                    set_month(mock_daily_sales()[1]);
                    break;
                case 4:
                    set_actual(year);
                    set_year(mock_monthly_sales());
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
                    set_month(actual);
                    break;
                case 4:
                    set_year(actual); 
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
                return <DailySalesReport theData={month}></DailySalesReport>

            case type.TYPE_4:
                return <MonthlyReport theData={year}></MonthlyReport>

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
                <Field id="type-1" onClick={() => handle_navigate(type.DAILY_INFO)}>Today</Field>
                <Field id="type-3" onClick={() => handle_navigate(type.TYPE_3)}>Daily</Field>
                <Field id="type-4" onClick={() => handle_navigate(type.TYPE_4)}>Monthly</Field>
                <Field id="type-2" onClick={() => handle_navigate(type.POPULAR_ITEMS)}>Items</Field>
            </Navigation>


            <Mock>
                MOCK
                <input class="toggle-mock-input" type="checkbox" id="toggle" onChange={(e) => handle_use_mock_data(e)}/>
                <label class="toggle-mock-label" for="toggle"></label>
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
    padding: 10px; 
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
    font-size: 1.8rem;

    color: #868e95;

    &:hover{
    cursor: pointer; 
    color: #e9eaeb; 
    } 
`;

const Mock = styled.div`
    font-family: "Amatic SC", cursive;
    font-size: 1.4rem;
    font-weight: 600;  
    display: flex;
    justify-content: flex-end; 
    align-items: center; 
    width: 50%;
    margin: 1% auto 0 auto; 
`; 