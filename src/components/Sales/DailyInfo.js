import React from 'react'
import styled from 'styled-components'

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

const DailyCard = styled.div`
    margin:10px;
    background-color:#e8f4f8;
    width:200px;
    text-align:left;
    padding:10px;
`

const DailyCardTitle = styled.h5`

`

const DailyCardBody = styled.h6`

`

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


export default function DailyInfo() {
    return(
        <VerticalDiv>
            <HorizontalDiv>
                <DailyCard>
                    <DailyCardTitle>
                        Today's Orders:
                    </DailyCardTitle>
                    <DailyCardBody>
                        {dailyTempData.pickUp.length + dailyTempData.delivery.length}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Pick-up Orders:
                    </DailyCardTitle>
                    <DailyCardBody>
                        {dailyTempData.pickUp.length}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Delivery Orders:
                    </DailyCardTitle>
                    <DailyCardBody>
                        {dailyTempData.delivery.length}
                    </DailyCardBody>
                </DailyCard>
            </HorizontalDiv>
            <HorizontalDiv>
                <DailyCard>
                    <DailyCardTitle>
                        Today's Sales:
                    </DailyCardTitle>
                    <DailyCardBody>
                        ${calcTotalPrice(dailyTempData.pickUp) + calcTotalPrice(dailyTempData.delivery)}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Pick-Up Sales:
                    </DailyCardTitle>
                    <DailyCardBody>
                        ${calcTotalPrice(dailyTempData.pickUp)}
                    </DailyCardBody>
                </DailyCard>
                <DailyCard>
                    <DailyCardTitle>
                        Delivery Sales:
                    </DailyCardTitle>
                    <DailyCardBody>
                        ${calcTotalPrice(dailyTempData.delivery)}
                    </DailyCardBody>
                </DailyCard>
            </HorizontalDiv>
        </VerticalDiv>
    )
}
