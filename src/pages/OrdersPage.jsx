import React, { useState, useEffect } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"
import { useUserContext } from "../context/UserContext"
import { firestore } from "../firebase"
//import OrderPreview from "../components/OrderPageElement/OrderPreview"
import SelectOrderDetail from "../components/OrderPageElement/SelectOrderDetail"
import ViewHistory from "../components/OrderPageElement/ViewHistory"

import { mock_pending_orders } from "../tempData"
import styled from 'styled-components'

const TopPage = styled.div`
    display:${props => props.show ? 'flex': 'none'};
    z-index:1000;
    position:fixed;
    width:100%;
    height:100%;
    background-color:white;
    top:0px;
    top: 100px; 
`

const OrdersPage = () => {

    const { restaurant, userDb, get_doc_snapshot, get_doc, update_doc } = useUserContext(); 

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

        const unsubscribe = get_doc_snapshot(`pendingOrders/${userDb.ownedRestaurants[0]}`, (result) => {
            const doc = result.data();

            let temp = []; 

            for(let key in doc){
                if(doc.hasOwnProperty(key))
                    if(key.includes("order#"))
                        temp.push(doc[key]); 
            }

            //set_orders(doc.orders); 
            set_orders(temp); 
        }); 

        return () => unsubscribe(); 
        
      }, [userDb.ownedRestaurants, get_doc_snapshot]);

    useEffect(() => {
        // warning, page refresh 
        window.addEventListener("beforeunload", alertUser);

        return () => {
        window.removeEventListener("beforeunload", alertUser);
        };
    
    }, []);

    const alertUser = e => {
        e.preventDefault();
        e.returnValue = "";
    };

    
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
        // clicked "View Order History" btn 
        e.preventDefault();
        
        await get_doc(`pendingOrders/${userDb.ownedRestaurants[0]}`)
                .then( doc => {
                    if(doc.exists) set_history(doc.data());
                    else set_history([]); 
                });
        
        setShow(true);  
    }

    const view_selected_handler = (e, order) => {
        e.preventDefault();

        console.log("clicked on specific order:");
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

    const declineOrder = (theOrder) =>{
        // todo delete the order from database (set status to canceled move to archived)

        console.log("decline order#" + theOrder);

        // remove from orders state
        let temp = orders.filter( order => order.id !== theOrder.id);
        set_orders(temp);
        setOrder(null);
    }

    const setOrderInProgress = async (theOrder) =>{
        // todo update database
        
        //update orders state
        let temp = theOrder;
        temp.status = "In progress";

        let index = findOrder(theOrder); 

        let updated = {
           
        }

        // { ownedRestaurants: firebase.firestore.FieldValue.arrayUnion(restaurantId) }

        await update_doc(`pendingOrders/${userDb.ownedRestaurants[0]}`, updated);

        // orders.splice(findOrder(theOrder), 1);
        // set_orders(items =>[temp, ...orders]);
    }

    const setOrderDelivered = (theOrder) =>{
        // send to archived orders document

        let temp = theOrder;
        temp.status = "Delivered";
        orders.splice(findOrder(theOrder), 1);
        set_orders(items =>[temp, ...orders]);
    }

    const setOrderArchived = (theOrder) =>{
        // remove from orders state?

        let temp = theOrder;
        temp.status = "Archived";
        orders.splice(findOrder(theOrder), 1);
        set_orders(items =>[temp, ...orders]);
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
                    orderArchived={setOrderArchived} orderInfo={selectedOrder} declineOrder ={declineOrder}
            / >
                <TopPage show={show}>
            {
                show ? <ViewHistory orders={orders} history={history} closeShow={()=>{setShow(!show)}}  /> : null
            }
                </TopPage>
        </div>
    )
}

export default OrdersPage;