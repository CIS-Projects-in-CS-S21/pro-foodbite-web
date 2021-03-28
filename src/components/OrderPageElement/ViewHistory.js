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
    background-color:red;
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

    function testFunction(order){
        let temp = 0;
        for (let i = 0; i < order.length; i++) {
            const element = order[i];
            temp += element.itemAmount;
        }
        return temp;
    }

    useEffect(() => {
        setDetail([]);
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            let temp = <HistoryItem onClick={()=>{
                setShow(!show);
                setOrder(element);
            }}
            >OrderNumber:{element.orderNumber} Number Of Item:
             {testFunction(element.orderItem)} Total Price:
             {element.totalPrice} ReceivedAt:{element.receivedAt} TimeArchived:123:123Pm
                </HistoryItem>
            setDetail(orderDetail => [...orderDetail, temp]);
        }
    }, [orders])


    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <h4>Order History</h4>
            {orderDetail}
            <HistoryDetail show={show}>
                    <label style={{borderBottom:"1px solid", width:"100%"}}>{selectOrder.orderNumber}) {selectOrder.orderOwner}</label>
                    Price: {selectOrder.totalPrice}<br/>
                    Received At: {selectOrder.receivedAt}<br/>
                    ETA: {selectOrder.eta}
                <button onClick={()=>{
                    setShow(!show);
                }}>test</button>
            </HistoryDetail>
            <button onClick={closeShow}>close</button>
        </div>
    )
}
