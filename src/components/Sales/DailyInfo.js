import React from 'react'
import styled from 'styled-components'
import { get_today_sales, get_type_sales, get_type_orders } from "../../utils/Utils"

const VerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width: 60%; 
    margin: 0 auto 1% auto;
`

const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
`

const DailyCard = styled.div`
    margin: 10px;
    background-color:#e8f4f8;
    width: 220px;
    padding: 22px;
    display: flex;
    flex-direction: row; 
    align-items: center; 
`

const DailyCardTitle = styled.h5`
`

const DailyCardBody = styled.h6`
    font-size: 1.4rem; 
`

const Header = styled.div`
    font-family: "Amatic SC", cursive;
    font-size: 2.4rem; 
    font-weight: 800;
    margin-bottom: 1.5%; 
`;

const dailyTempData = {
    pickUp:[{orderPrice:100}, {orderPrice:50}, {orderPrice:200},{orderPrice:50}],
    delivery:[{orderPrice:50}, {orderPrice:25},{orderPrice:75},{orderPrice:250},
    {orderPrice:100}, {orderPrice:100}],
}

function calcTotalPrice(orders){
    let temp = 0;
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        temp += element.orderPrice;
    }
    return temp;
}


export default function DailyInfo( { data } ) {

    console.log(data);

    return(
        <VerticalDiv>
            <Header>
                Sales from Today's Archived Orders
            </Header>
            <HorizontalDiv>
                <DailyCard>
                    <DailyCardTitle>
                        Today's Orders:
                    </DailyCardTitle>
                    <DailyCardBody data-testid="orders-length">
                        {data.length}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Pick-up Orders:
                    </DailyCardTitle>
                    <DailyCardBody  data-testid="completed-length">
                        {get_type_orders(data, "PICKED-UP")}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Delivery Orders:
                    </DailyCardTitle>
                    <DailyCardBody data-testid="delivered-length">
                        {get_type_orders(data, "DELIVERED")}
                    </DailyCardBody>
                </DailyCard>
            </HorizontalDiv>
            <HorizontalDiv>
                <DailyCard>
                    <DailyCardTitle>
                        Today's Sales:
                    </DailyCardTitle>
                    <DailyCardBody data-testid="today-sales">
                        ${get_today_sales(data)}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Pick-Up Sales:
                    </DailyCardTitle>
                    <DailyCardBody data-testid="picked-up-sales">
                        ${get_type_sales(data, "PICKED-UP")}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Delivery Sales:
                    </DailyCardTitle>
                    <DailyCardBody data-testid="delivery-sales">
                        ${get_type_sales(data, "DELIVERED")}
                    </DailyCardBody>
                </DailyCard>
            </HorizontalDiv>
        </VerticalDiv>
    )
}
