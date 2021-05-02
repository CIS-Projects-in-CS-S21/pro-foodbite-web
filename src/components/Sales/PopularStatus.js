import React, {useState, useEffect} from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'

const VerticalDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center; 
`

const HorizontalDiv = styled.div`
    display:flex;
    justify-content:center;
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

        topItems();

    }, [data]); 

    const get_top_items = () => {

        if(popluarList.length === 0) return;

        let items = popluarList; 
        if(items.length >= 20) items = items.slice(0, 19); 

        return (
            <div>
                <Header>Top Items</Header>
                <ol>
                    {items.map( item => {
                        return <PopluarLi key={item}>{item}</PopluarLi>
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
            {/* <VerticalDiv>  
                <h4 style={{marginLeft:'30px'}}>Top Hours</h4>
                {popluarHour}
            </VerticalDiv> */}
        </HorizontalDiv>    
    )
}
