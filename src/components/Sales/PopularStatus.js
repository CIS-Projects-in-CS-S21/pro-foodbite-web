import {mock_pending_orders} from '../../tempData'
import React, {useState, useEffect} from 'react'
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

const PopluarLi = styled.li`
    font-size:24px;
`

export default function PopluarStatus({theData}) {

    const [popluarList, setList] = useState([]);
    const [popluarHour, setHour] = useState([]);

    useEffect(() => {
        setList([]);
        setHour([]);
        top3PopluarItems();
        getPopluarHour();
    }, [])


    function top3PopluarItems(){
        let temp = {};
        mock_pending_orders.map((a => a.menuItems));
        let itemNameArray = mock_pending_orders.map((a => a.menuItems.map((b => b.name))));
        itemNameArray.forEach(a => a.forEach(b => temp[b] = temp[b] ? temp[b] + 1: 1));

        let keys = Object.keys(temp);
        let values = Object.values(temp);
        let sorted = Object.values(temp).sort();
        for (let i = 0; i < Math.min(3, sorted.length); i++) {
            const element = sorted[sorted.length - (i + 1)]
            let temp = <PopluarLi>{keys.splice(values.indexOf(element), 1)}</PopluarLi>
            setList(popluarList => [...popluarList, temp]);
        }
    }

    function getPopluarHour(){
        let temp = mock_pending_orders.map((a => a.timestamp.split(":")[0]));
        let reval = {};
        temp.map((a => reval[a] = reval[a] ? reval[a] + 1 : 1));

        let keys = Object.keys(reval);
        let values = Object.values(reval);
        let sorted = Object.values(reval).sort();
        
        for (let i = 0; i < Math.min(3, sorted.length); i++) {
            const element = sorted[sorted.length - (i + 1)]
            let temp = <PopluarLi>{keys.splice(values.indexOf(element), 1)}</PopluarLi>
            setHour(popluarHour => [...popluarHour, temp]);
        }
    }


    return (
        <HorizontalDiv>
            <VerticalDiv>
                <h4>Top 3 Items</h4>
                {popluarList}
            </VerticalDiv>
            <VerticalDiv>  
                <h4 style={{marginLeft:'30px'}}>Top Hours</h4>
                {popluarHour}
            </VerticalDiv>
        </HorizontalDiv>    
    )
}
