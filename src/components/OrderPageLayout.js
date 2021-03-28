import React, {useState} from 'react'
import styled from 'styled-components';
import OrderPreview from './OrderPageElement/OrderPreview'
import SelectOrderDetail from './OrderPageElement/SelectOrderDetail'
import ViewHistory from './OrderPageElement/ViewHistory';

const TopPage = styled.div`
    display:${props => props.show ? 'flex': 'none'};
    z-index:1000;
    position:fixed;
    width:100%;
    height:100%;
    background-color:white;
    top:0px;
`

export default function OrderPageLayout() {

    const tempOrderFormat2 = {
        orderNumber: 2,
        orderOwner: "Test Test2",
        address: "4123 holder street",
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

    const tempOrderFormat = {
        orderNumber: 5,
        orderOwner: "Test Test",
        address: "123 place holder street",
        receivedAt : "9:00pm",
        receivedDate : "3/25/2021",
        totalPrice: "$15.00",
        status:"Pending",
        eta:"6:30pm",
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
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 2
        }]
    };

    const [theOrders, refreshOrders] = useState([tempOrderFormat, tempOrderFormat2]);
    // const theOrders = [tempOrderFormat, tempOrderFormat2]
    const [selectedOrder, setOrder] = useState();
    const [show,setShow] = useState(false);

    function findOrder(theOrder){
        for (let i = 0; i < theOrders.length; i++) {
            const element = theOrders[i];
            if(element.orderNumber === theOrder.orderNumber){
                return i;
            }
        }
    }

    const selectPreview = (theOrder) =>{
        setOrder(theOrder);
    }

    const declineOrder = (theOrder) =>{
        //delete the order from database
        console.log("decline order#" + theOrder);
    }

    const setOrderInProgress = (theOrder) =>{
        //update database
        let temp = theOrder;
        temp.status = "In progress";
        theOrders.splice(findOrder(theOrder), 1);
        refreshOrders(items =>[temp, ...theOrders]);

    }

    const setOrderDelivered = (theOrder) =>{
        let temp = theOrder;
        temp.status = "Deliverd";
        theOrders.splice(findOrder(theOrder), 1);
        refreshOrders(items =>[temp, ...theOrders]);

    }

    const setOrderArchived = (theOrder) =>{
        let temp = theOrder;
        temp.status = "Archived";
        theOrders.splice(findOrder(theOrder), 1);
        refreshOrders(items =>[temp, ...theOrders]);
    }

    return (
        <div>
            <OrderPreview orders={theOrders}
                selectOrder={selectPreview}>
            </OrderPreview>
            <SelectOrderDetail orderInProgress={setOrderInProgress} orderDeliver={setOrderDelivered}
                orderArchived={setOrderArchived} orderInfo={selectedOrder} declineOrder = {declineOrder}
                >
            </SelectOrderDetail>

            <button onClick ={() =>{
                setShow(!show);
            }}>View History</button>

            <TopPage show={show}>
                <ViewHistory orders = {theOrders} closeShow={()=>{
                    setShow(!show);
                }}>

                </ViewHistory>
            </TopPage>
        </div>
    )
}
