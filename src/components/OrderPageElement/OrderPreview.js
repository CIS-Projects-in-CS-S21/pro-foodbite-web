import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
    display:flex;
    overflow-x:scroll;
`

const OrderCard = styled.button`
    display:flex;
    flex-direction:column;
    text-align:left;
    border: 1px solid;
    min-width:80px;
    width:20%;
    aspect-ratio:0.75;
    margin:10px;
    background:none;
    :hover{
        background-color:rgb(200,200,200);
    }
    :focus{
        background-color:rgba(175,175,175);
    }

`

const CardDetail = ({theOrder}) =>{
    
    useEffect(() => {
        itemCounter();
    }, [theOrder])

    const itemList = theOrder.orderItem;

    const [itemCount, setItemCount] = useState(0);

    function itemCounter(){
        var temp = 0;
        for (let i = 0; i < itemList.length; i++) {
            const element = itemList[i];
            temp += element.itemAmount;
        }
        setItemCount(temp)
    }
    // const [items, setItems] = useState([]);

    // const itemDetail = () =>{
    //     setItems([]);
    //     for (let i = 0; i < itemList.length; i++) {
    //         const element = itemList[i];
    //         let temp = <label>#{element.itemNumber} {element.itemName}:{element.itemAmount}</label>;
    //         console.log("this is item name " + element.itemName);
    //         setItems(items => [...items, temp]);
    //     }
    // }

    return(
        <div style={{ height:"100%", width:'100%', 
             display:'flex', flexDirection:'column'}}>
            <label style={{borderBottom:"1px solid", width:"100%"}}>{theOrder.orderNumber}) {theOrder.orderOwner}</label>
            {/* {items} */}
            <label># of Item: {itemCount}</label>
            <label>Price: {theOrder.totalPrice}</label>
            <label>Received At: {theOrder.receivedAt}</label>
            <label>ETA: {theOrder.eta}</label>
            <label>Status: {theOrder.status}</label>
        </div>
    )
}

export default function OrderPreview({orders, selectOrder}) {

    useEffect(() => {
        setPreviews([]);
        displayAllPreview();
    }, [orders])

    const [orderPreviews, setPreviews] = useState([]);

    

    function displayAllPreview(){
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            const temp = <OrderCard onClick={() =>{
                selectOrder(element);
            }}>
                <CardDetail theOrder={element} ></CardDetail>
            </OrderCard>
            setPreviews(orderPreviews => [...orderPreviews, temp]);
        }
    }

    return (
        <CardContainer>
            {orderPreviews}
        </CardContainer>
    )
}
