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

export default function PopluarStatus({ data }) {

    const [popluarList, setList] = useState([]);
    const [popluarHour, setHour] = useState([]);

    useEffect(() => {
        setList([]);
        setHour([]);
        top3PopluarItems();
    }, []); 


    function top3PopluarItems(){
        let temp = {};


        let itemNameArray = data.map((a => a.menuItems.map((b => b.name))));
        itemNameArray.forEach(a => a.forEach(b => temp[b] = temp[b] ? temp[b] + 1: 1));

        const items = [].concat.apply([], itemNameArray);
        let counts = {};

        for(let i = 0; i<items.length; ++i){
            const item = items[i];
            counts[item] = counts[item] ? counts[item] + 1 : 1; 
        }

        let i = 0;
        
        for (const [key, ] of Object.entries(counts)) {
            
            let temp = <PopluarLi>{key}</PopluarLi>
            setList(popluarList => [...popluarList, temp]);

            ++i;
            if(i === 3) break; 
          }

        // let keys = Object.keys(temp);
        // let values = Object.values(temp);
        // let sorted = Object.values(temp).sort();

        // for (let i = 0; i < Math.min(3, sorted.length); i++) {
        //     const element = sorted[sorted.length - (i + 1)]

        //     //console.log(sorted);
        //     //console.log(keys.splice(values.indexOf(element), 1)); 
        //     let temp = <PopluarLi>{keys.splice(values.indexOf(element), 1)}</PopluarLi>
        //     //console.log(temp);
        //     setList(popluarList => [...popluarList, temp]);
        // }
    }

    function getPopluarHour(){
        let temp = data.map((a => a.timestamp.split(":")[0]));
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
                {/* {popluarHour} */}
            </VerticalDiv>
        </HorizontalDiv>    
    )
}
