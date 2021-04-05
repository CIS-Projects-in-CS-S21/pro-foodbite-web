import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import DailyInfo from '../components/Sales/DailyInfo'
import MonthlyReport from '../components/Sales/MonthlyReport'
import DailySalesReport from '../components/Sales/DailySalesReport'
import PopluarStatus from './Sales/PopularStatus'

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

    const dailyTempArray = [dailyTempData, dailyTempData2];

    return (
        <VerticalDiv>
            <DailyInfo>
            </DailyInfo>
            <div>
                <PopluarStatus/>
                <DailySalesReport theDataArray={dailyTempArray}></DailySalesReport>
                <MonthlyReport theDataArray={monthlyTempArray}>
                </MonthlyReport>
            </div>
        </VerticalDiv>
    )
}
