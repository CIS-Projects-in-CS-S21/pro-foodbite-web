import React, {useState, useEffect} from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { convertTime24to12 } from "../../utils/Utils"

const VerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center; 
`

const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column; 
`

const PopluarLi = styled.li`
    font-size: 1.8rem; 
    text-align: left; 
`

const Header = styled.div`
    font-family: "Amatic SC", cursive;
    font-size: 2.4rem; 
    font-weight: 800;
    margin-bottom: 1.5%; 
`;

export default function PopluarStatus({ data }) {

    const [popluarList, setList] = useState([]);
    const [popluarHour, setHour] = useState([]);

    useEffect(() => {
        setList([]);
        setHour([]);

        function topItems(){
            const MAX = 10; 
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
                
                // let temp = <PopluarLi>{key}</PopluarLi>
                let temp = key.toUpperCase();
                setList(popluarList => [...popluarList, temp]);
    
                ++i;
                if(i === MAX) break; 
              }

        }

        function popularHours(){

            let hoursArray = data.map( order => {
                const time = parseFloat(order.createdAt) * 1000; 
                const date = new Date(time);

                return date.getHours(); 
            });

            let counts = {};
            hoursArray.forEach(b => counts[b] = counts[b] ? counts[b] + 1: 1);   

            let keys_sorted = Object.keys(counts).sort( (a,b) => counts[a]-counts[b]).reverse();
            console.log(keys_sorted);

            let i = 0;

            keys_sorted.forEach(key => {
                
                let temp = key.toUpperCase();
                setHour(popluarHour => [...popluarHour, temp]);

                ++i;
                if(i === 12) return; 
            });
        }

        topItems();
        popularHours();

    }, [data]); 

    const get_top_items = () => {

        if(popluarList.length === 0) return;

        let items = popluarList; 
        if(items.length >= 20) items = items.slice(0, 19); 

        return (
            <div>
                <Header>Top Items - All Time</Header>
                <ol>
                    {items.map( item => {
                        return <PopluarLi key={item}>{item}</PopluarLi>
                    })}
                </ol>
            </div>
        );
    }

    const get_top_hours = () => {

        if(popluarHour.length === 0) return; 

        let hours = popluarHour; 

        return (
            <div>
                <Header>Busiest Hours - All Time</Header>
                <ol>
                    {hours.map( hour => {

                        if(hour.length === 1 || hour === "12") hour = `${hour} AM`
                        else hour = convertTime24to12(hour); 

                        return <PopluarLi key={hour}>{hour}</PopluarLi>
                    })}
                </ol>
            </div>
        );
    }


    
    // function getPopluarHour(){

    //     let temp = data.map((a => a.timestamp.split(":")[0]));
    //     let reval = {};
    //     temp.map((a => reval[a] = reval[a] ? reval[a] + 1 : 1));

    //     let keys = Object.keys(reval);
    //     let values = Object.values(reval);
    //     let sorted = Object.values(reval).sort();
        
    //     for (let i = 0; i < Math.min(3, sorted.length); i++) {
    //         const element = sorted[sorted.length - (i + 1)]
    //         let temp = <PopluarLi>{keys.splice(values.indexOf(element), 1)}</PopluarLi>
    //         console.log(temp);
    //         setHour(popluarHour => [...popluarHour, temp]);
    //     }
    // }



    return (
        <HorizontalDiv>
            <VerticalDiv>
                {get_top_items()}
            </VerticalDiv>
            <VerticalDiv>
                {get_top_hours()}   
            </VerticalDiv> 
        </HorizontalDiv>    
    )
}