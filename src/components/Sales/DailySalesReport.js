import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Line} from 'react-chartjs-2'
import {average} from '../../utils/Utils'



const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
`


const ChartSize = styled.div`
    width:500px;
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

export default function DailySalesReport({ theDataArray }) {

    // TODO, WEEK NOT MONTH? 

    const [theData, setData] = useState(theDataArray[0]);
    const [theIndex, setIndex] = useState(0);

    const [leftClick, setLeft] = useState(false);
    const [rightClick, setRight] = useState(false);

    const [theChart, setChart] = useState();
    const [chartType, setType] = useState(1);

    useEffect(() => {
        data.labels=[];
        
        data.datasets[0].data=[];

        let temp = null;
        switch(chartType){
            case 1:
                if(theData.month % 2 === 0){
                    //even month
                    if(theData.month < 8){
                        if(theData.month === 2){
                            for (let i = 1; i <= 28; i++) {
                                data.labels.push(i);                
                            }
                        }else{
                            for (let i = 1; i <= 30; i++) {
                                data.labels.push(i);                        
                            }
                        }
                    }else{
                        for (let i = 1; i <= 31; i++) {
                            data.labels.push(i);                    
                        }
                    }
                }else{
                    //odd month
                    if(theData.month < 8){
                        for (let i = 1; i <= 31; i++) {
                            data.labels.push(i);
                        }
                    }else{
                        for (let i = 1; i <= 30; i++) {
                            data.labels.push(i);
                        }
                    }
                }
                for(let property in theData.data){
                    data.datasets[0].data.push(theData.data[property]);
                }
                temp = <Line id="dailyLineChart" data={data} options={option}></Line>
                break;
            case 2:
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
                temp = <Line id="dailyLineChart" data={data} options={option}></Line>
                break;
            default:
                break;
        }
        setChart(temp);
    }, [theData, chartType])

    useEffect(() => {
        checkClickable();
        setData(theDataArray[theIndex]);
    }, [theIndex])
    
    if(theDataArray === null){
        return null;
    }

    const data = {
        labels: [],
        datasets:[{
            label:theData.month,
            fill:false,
            data:[],

        }],
        
    };

    const option = {
        legend:{
            display:false
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero: true,
                }
            }]
        }
    }

    function checkClickable(){
        if(theIndex === 0){
            setLeft(false);
        }else{
            setLeft(true);
        }
        if(theIndex >= theDataArray.length-1){
            setRight(false);
        }else{
            setRight(true);
        }
    }

    return(
        <ChartSize>
            <HorizontalDiv>
                <ChartButton onClick={()=>{setIndex(theIndex-1)}} disabled={!leftClick}>←</ChartButton>
                <h5>Daily Sales of Month {theData.month}</h5>
                <ChartButton onClick={()=>{setIndex(theIndex+1)}} disabled={!rightClick}>→</ChartButton>
            </HorizontalDiv>
            <HorizontalDiv>
                    <OptionButton onClick={()=>{setType(1)}}  data-testid="sales-btn">Sales</OptionButton>
                    <OptionButton onClick={()=>{setType(2)}} data-testid="status-btn">Status</OptionButton>
            </HorizontalDiv>
            {theChart}
        </ChartSize>
    )
}
