import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { chartColors } from './colors'
import {Pie, Line} from 'react-chartjs-2'
import {average} from '../../utils/Utils'
import { Header } from "./DailySalesReport"


const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
`

const ChartSize = styled.div`
    // width:500px;
    width: 50%;
`

const ChartButton = styled.button`
    background-color:white;
    border:none;
    :hover{
        background-color:rgba(125,125,125,0.5);
    }
`

const OptionButton = styled.button`
    border: none;
    border-right: 1px solid;
    background-color:white;
    :hover{
        background-color:rgba(125,125,125,0.5);
    }
`

export default function MonthlyReport({ theData }) {

    const [theChart, setChart] = useState();
    const [chartType, setType] = useState(1);

    // const [theData, setData] = useState(theDataArray[0]);
    const [theIndex, setIndex] = useState(0);


    const [leftClick, setLeft] = useState(true);
    const [rightClick, setRight] = useState(true);


    useEffect(() => {

        const option = {
            legend:{
                position:'right',
                onClick: (e) => e.stopPropagation()
            }
        }

        const data = {
            maintainAspectRatio: false,
            responsive: false,
            labels: [],
            datasets:[
                {
                data:[],
                backgroundColor: chartColors,
                hoverBackgroundColor: chartColors
            }],
        }

        data.datasets[0].data=[]; 
        let temp = null;
        data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", 'Dec']

        for(const property in theData.data){
            data.datasets[0].data.push(theData.data[property]);
        }
        switch(chartType){
            case 1:
                temp = <Pie id="monthlyChart" data={data} options={option}/>
                break;
            case 2:
                data.datasets[0].backgroundColor = 'null';
                data.datasets[0].hoverBackgroundColor = 'null';
                data.datasets[0].fill = false;
                temp = <Line id="monthlyChart" data={data} options={{legend:{display:false}}}/>
                break;
            case 3:
                data.datasets[0].data=[]; 
                data.labels = [];
                data.datasets[0].backgroundColor = 'null';
                data.datasets[0].hoverBackgroundColor = 'null';
                data.datasets[0].fill = false;
                let tempArray = Object.values(theData.data);
                let filterArray = tempArray.filter((value) => {
                    return value > 0;
                });
                data.labels.push('lowest sales');
                data.labels.push('average sales');
                data.labels.push('highest sales');
                data.datasets[0].data.push(Math.min(...filterArray));
                data.datasets[0].data.push(average(filterArray));
                data.datasets[0].data.push(Math.max(...filterArray));
                temp = <Line id="dailyLineChart" data={data} options={{legend:{display:false}}}></Line>
                break;
            default:
                break; 
        }
        setChart(temp);
    }, [theData,chartType]);


    // useEffect(() => {
    //     checkClickable();
    //     setData(theDataArray[theIndex]);
    // }, [theIndex])

    // function checkClickable(){
    //     if(theIndex === 0){
    //         setLeft(false);
    //     }else{
    //         setLeft(true);
    //     }
    //     if(theIndex >= theDataArray.length-1){
    //         setRight(false);
    //     }else{
    //         setRight(true);
    //     }
    // }

    
    return(
        <HorizontalDiv>
            <ChartSize>
                
                <HorizontalDiv>
                    <ChartButton onClick={()=>{setIndex(theIndex-1)}} disabled={!leftClick}>  </ChartButton>
                    <Header>Monthly Sales From This Year</Header>
                    <ChartButton onClick={()=>{setIndex(theIndex+1)}} disabled={!rightClick}>  </ChartButton>
                </HorizontalDiv>
                <HorizontalDiv style={{margin: "1% 0 .5% 0"}}>
                    <OptionButton onClick={()=>{setType(1)}}>Pie</OptionButton>
                    <OptionButton onClick={()=>{setType(2)}}>Line</OptionButton>
                    <OptionButton onClick={()=>{setType(3)}}>Boxplot</OptionButton>
                </HorizontalDiv>
                {theChart}
            </ChartSize>
        </HorizontalDiv>
    )    
}