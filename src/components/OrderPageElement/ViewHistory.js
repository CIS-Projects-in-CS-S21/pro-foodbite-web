import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const HistoryItem = styled.button`
    border:none;
    background-color:white;
    border-bottom:1px solid;

    :hover{
        background-color:rgb(200,200,200);
    }
`

const HistoryDetail = styled.div`
    z-index:1000;
    display:${props =>props.show? "flex": "none"};
    position:fixed;
    width:100%;
    height:100%;
    align-content:center;
    background-color:white;
    flex-direction:column;
`

export default function ViewHistory({orders, closeShow}) {

   
    const tempOrderFormat2 = {
        orderNumber: 2,
        orderOwner: "Test Test2",
        receivedAt : "3:00pm",
        receivedDate : "3/25/2021",
        totalPrice: "$10.00",
        status:"Pending",
        eta:"3:30pm",
        orderItem : [{
            itemNumber: 3,
            itemName :"burger",
            itemAmount: 4,
        }, {
            itemNumber: 10,
            itemName:"Fries",
            itemAmount: 2,
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 5
        }]
    };

    const emptyOrder = {
        orderNumber:"",
        address: "",
        orderOwner:"",
        receivedAt :"",
        receivedDate : "",
        totolPrice: "",
        status:"",
        eta:"",
        orderItem : [{
            itemNumber: "",
            itemName :"",
            itemAmount: "",
        }]
    }

    const [show, setShow] = useState(false);
    const [orderDetail, setDetail] = useState();
    const [selectOrder, setOrder] = useState(emptyOrder);
    const [items, setItems] = useState([]);

    useEffect(() => {
        menuLister(selectOrder.orderItem)
    }, [selectOrder])


    function itemCounter(order){
        let temp = 0;
        for (let i = 0; i < order.length; i++) {
            const element = order[i];
            temp += element.itemAmount;
        }
        return temp;
    }

    function menuLister(menuItems){
        setItems([]);
        for (let i = 0; i < menuItems.length; i++) {
            const element = menuItems[i];
            const newItem = <li key={i} style={{textAlign:'center', listStyle:'none'}}
                >#{element.itemNumber}.{element.itemName}x{element.itemAmount}</li>
            setItems(items => [...items, newItem]);
        }
    }

    useEffect(() => {
        setDetail([]);
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            let temp = <HistoryItem key={"order"+i} onClick={()=>{
                setShow(!show);
                setOrder(element);
            }}
            >OrderNumber:{element.orderNumber} | OrderOwner:{element.orderOwner} | Number Of Item:
             {itemCounter(element.orderItem)} | Total Price:
             {element.totalPrice} | ReceivedAt:{element.receivedAt} | TimeArchived:123:123Pm
                </HistoryItem>
            setDetail(orderDetail => [...orderDetail, temp]);
        }
    }, [orders])


    return (
        <div style={{display:'flex', flexDirection:'column', alignContent:'center', width:'100%'}}>
            <h3>Order History</h3>
            {orderDetail}
            <HistoryDetail show={show}>
                    <h4 style={{borderBottom:"1px solid", width:"100%"}}>Order#{selectOrder.orderNumber}) {selectOrder.orderOwner}</h4>
                    Price: {selectOrder.totalPrice}<br/>
                    Address: {selectOrder.address}<br/>
                    Received At: {selectOrder.receivedAt}<br/>
                    ETA: {selectOrder.eta}<br/><br/>
                    <h4 style={{borderBottom:"1px solid"}}>Order Items:</h4>
                    {items}
                <button onClick={()=>{
                    setShow(!show);
                }}>close</button>
            </HistoryDetail>
            <button onClick={closeShow}>close</button>
        </div>
    )
}
