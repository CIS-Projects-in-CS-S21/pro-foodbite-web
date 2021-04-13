import React, { useState, useEffect } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"
import { useUserContext } from "../context/UserContext"
import firebase, { firestore } from "../firebase"
import SelectOrderDetail from "../components/OrderPageElement/SelectOrderDetail"
import ViewHistory from "../components/OrderPageElement/ViewHistory"
//import { mock_pending_orders, mock_archived_orders } from "../tempData"
import styled from 'styled-components'

const TopPage = styled.div`
    display:${props => props.show ? 'flex': 'none'};
    z-index:1000;
    position:fixed;
    width:100%;
    height:100%;
    background-color:white;
    top:0px;
    top: 115px; 
`

const OrdersPage = () => {

    const { restaurant, userDb, get_doc, update_doc } = useUserContext(); 

    let init_accepting = false;

    if(restaurant === null) init_accepting = false;
    else init_accepting = restaurant.available; 

    const [accepting_orders, set_accepting_orders] = useState(init_accepting); 
    //const [orders, set_orders] = useState(mock_pending_orders); // pending orders, mock data for now 
    const [show, setShow] = useState(false);
    const [selectedOrder, setOrder] = useState(null);
    const [history, set_history] = useState([]); 

    const [orders, set_orders] = useState([]); // real-data


    useEffect(() => {
        // get realtime updates for pending orders

        const unsubscribe = firestore
            .collection("pendingOrders")
            .doc(userDb.ownedRestaurants[0])
            .collection("orders")
            .onSnapshot( (snapshot) => {

                let orders = []; 
                snapshot.forEach( doc => {

                    let time = new Date(0);
                    time.setUTCSeconds(firebase.firestore.Timestamp.now().seconds);

                    let order = doc.data(); 
                    console.log(order);
                    order["updated"] = time; 

                    //order["createdAt"] = time; // TEMP

                    orders.push(order); 
                });

                set_orders(orders);
            });

        return () => unsubscribe(); 
        
      }, [userDb.ownedRestaurants]);

    
    const accepting_orders_handler = async (e) => {
        e.preventDefault();
    
        // set available field to opposite boolean in restaurant document and state
        await firestore
                .doc(`restaurants/${userDb.ownedRestaurants[0]}`)
                .update({
                    available: !accepting_orders
                })
                .then( () => {
                    set_accepting_orders(!accepting_orders);
                })
                .catch(err => console.log(err)); 
    }

    const view_order_history_handler = async (e) => {
        e.preventDefault();
        
        await get_doc(`archivedOrders/${userDb.ownedRestaurants[0]}`)
                .then( doc => {
                    if(doc.exists){
                        let orderss = doc.data().orders; 
                        let temp = [];
            
                        for (const id in orderss){
                            temp.push(orderss[id]); 
                        }

                        let both = orders; 
                        both = both.concat(temp);
                        
                        set_history(both);
                        setShow(true);  
                    }
                    
                    else set_history([]); 
                });


        // TODO 
        // PARSE ARCHIVED TO GET ONLY TODAY'S DATE

        // MOCK
        // let temp = mock_pending_orders; 
        // temp = temp.concat(mock_archived_orders); 

        // set_history(temp); 
        // setShow(true);  
    }

    const view_selected_handler = (e, order) => {
        e.preventDefault();

        setShow(false);
        setOrder(order); 
    }


    function findOrder(theOrder){
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            if(element.id === theOrder.id){
                return i;
            }
        }
    }

    const declineOrder = async (theOrder) =>{
        // update status for the correct order
        // move the order to archived orders 

        theOrder.status = "CANCELED"; 
        await firestore.doc(`pendingOrders/${userDb.ownedRestaurants[0]}/orders/${theOrder.orderId}`).delete().then( () => console.log("deleted")); 

        let updated = {}
        updated[`orders.${theOrder.orderId}`] = theOrder; 
        await update_doc(`archivedOrders/${userDb.ownedRestaurants[0]}`, updated);

        setOrder(null);
    }

    const setOrderInProgress = async (theOrder) =>{
        // update status for the correct order

        theOrder.status = "IN PROGRESS"

        await update_doc(`pendingOrders/${userDb.ownedRestaurants[0]}/orders/${theOrder.orderId}`, theOrder);
    }

    const setOrderOnTheWay = async (theOrder) => {
        // update status for the correct oders

        theOrder.status = "ON THE WAY"

        await update_doc(`pendingOrders/${userDb.ownedRestaurants[0]}/orders/${theOrder.orderId}`, theOrder);
    };

    const setOrderDelivered = async (theOrder) =>{
        // send to archived orders document

        theOrder.status = "DELIVERED"; 
        await firestore.doc(`pendingOrders/${userDb.ownedRestaurants[0]}/orders/${theOrder.orderId}`).delete().then( () => console.log("deleted")); 

        let updated = {}
        updated[`orders.${theOrder.orderId}`] = theOrder; 
        await update_doc(`archivedOrders/${userDb.ownedRestaurants[0]}`, updated);

        setOrder(null);
    }



    const setOrderReady = async (theOrder) =>{
        // for now, wont be sent to archives (manually set delivered to do so)

        theOrder.status = "READY";
        await update_doc(`pendingOrders/${userDb.ownedRestaurants[0]}/orders/${theOrder.orderId}`, theOrder);
    }

    const get_count = () => {
        if(orders === null || orders === undefined) return 0; 
        else  return orders.length;
    };


    return (
        <div>
            <OrdersHeader history={view_order_history_handler} accepting={accepting_orders_handler} status={accepting_orders} count={get_count()}/>
             <PendingOrders orders={orders} view={view_selected_handler}/>
            
            <SelectOrderDetail orderInProgress={setOrderInProgress} orderDeliver={setOrderDelivered}
                    orderReady={setOrderReady} orderInfo={selectedOrder} declineOrder ={declineOrder} orderOnTheWay={setOrderOnTheWay}
            / >
                <TopPage show={show}>
            {
                show ? <ViewHistory orders={history} closeShow={()=>{setShow(!show)}}  /> : null
            }
                </TopPage>
        </div>
    )
}

export default OrdersPage;