import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import DailyInfo from '../components/Sales/DailyInfo'
import MonthlyReport from '../components/Sales/MonthlyReport'
import DailySalesReport from '../components/Sales/DailySalesReport'
import PopluarStatus from './Sales/PopularStatus'
import { mock_archived_orders, today_archived } from "../tempData"
import { get_today_sales, sort_this_week } from "../utils/Utils"
import { useUserContext } from "../context/UserContext"
import { sort_today } from "../utils/Utils"

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

    const { restaurant, userDb, get_doc } = useUserContext(); 
    const [today, set_today] = useState([]); 

    useEffect( () => {

        // get archived orders, parse to include those from today
        const get_today = async () => {

            await get_doc(`archivedOrders/${userDb.ownedRestaurants[0]}`)
            .then( doc => {
                if(doc.exists){
                    let orders = doc.data().orders; 
                    let archived = [];
        
                    for (const id in orders){
                        archived.push(orders[id]); 
                    }

                    let filtered = sort_today(archived); 

                    // filter out those canceled too?

                    set_today(filtered);
                }
            });
        }

        get_today(); 

        // ex. parse archived orders for day (for daily sales) (USE your util function to get orders from current week)

    }, [get_doc, userDb.ownedRestaurants]); 





    const monthlyTempData = {
        year:2020,
        data:{Jan:1000,
            Feb:800,
            Mar:500,
            Apr:950,
            May:2000,
            Jun:2500,
            Jul:2300,
            Aug:0,
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0}
    }

    const monthlyTempData2 = {
        year:2021,
        data:{Jan:3123,
            Feb:123,
            Mar:3213,
            Apr:432,
            May:3123,
            Jun:432,
            Jul:4325,
            Aug:2341,
            Sep:3213,
            Oct:1231,
            Nov:0,
            Dec:0}
        
    }

    const monthlyTempArray = [monthlyTempData, monthlyTempData2];

    const dailyTempData = {
        month:3,
        data:{
            1:100,
            2:400,
            3:400,
            5:344,
            6:340,
            7:0,
            8:123,
            9:412,
            10:541,
            11:123,
        }
    }

    const dailyTempData2 = {
        month:4,
        data:{
            1:100,
            2:321,
            3:543,
            5:123,
            6:340,
            7:124,
            8:123,
            9:321,
            10:432,
            11:412,
        }
    }

    const type = {
        DAILY_INFO: 1,
        POPULAR_ITEMS: 2,
        TYPE_3: 3,
        TYPE_4: 4
      };

    useEffect(() => {

        document.getElementById("type-1").style.color = "#e9eaeb";
    }, []);

    const dailyTempArray = [dailyTempData, dailyTempData2];
    const [active, set_active] = useState(1);

    const render_screen = () => {

        switch (active){

            case type.DAILY_INFO:
                return <DailyInfo data={today}></DailyInfo>

            case type.POPULAR_ITEMS:
                return <PopluarStatus data={today_archived}></PopluarStatus>

            case type.TYPE_3:
                return <DailySalesReport theDataArray={dailyTempArray}></DailySalesReport>

            case type.TYPE_4:
                return <MonthlyReport theDataArray={monthlyTempArray}></MonthlyReport>

            default:
                return <h1>Default</h1>
        }
    }

    const handle_navigate = (number) => {

        document.getElementById(`type-${active}`).removeAttribute("style"); 
        document.getElementById(`type-${number}`).style.color = "#e9eaeb";
        set_active(number); 
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
    // margin-top: 2%; 
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
