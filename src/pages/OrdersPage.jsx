import React, { useState, useEffect } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"
import { useUserContext } from "../context/UserContext"
import { firestore } from "../firebase"
import OrderPreview from "../components/OrderPageElement/OrderPreview"
import SelectOrderDetail from "../components/OrderPageElement/SelectOrderDetail"
import ViewHistory from "../components/OrderPageElement/ViewHistory"

import { mock_pending_orders } from "../tempData"


const OrdersPage = () => {

    const { restaurant, userDb } = useUserContext(); 

    const [accepting_orders, set_accepting_orders] = useState(restaurant.available); 
    const [orders, set_orders] = useState(mock_pending_orders); // pending orders, mock data for now 
    const [view_order_history, set_view_order_history] = useState(false); 
    const [show, setShow] = useState(false);
    const [selectedOrder, setOrder] = useState(null);

    useEffect(() => {
        // wanring, page refresh 
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

    const view_order_history_handler = (e) => {
        // clicked "View Order History" btn 
        e.preventDefault();
    
        console.log("clicked view order history"); 
        setShow(true);  
    }

    const view_selected_handler = (e, order) => {
        e.preventDefault();

        console.log("clicked on specific order:");
        setOrder(order); 
    }

    // const selectPreview = (theOrder) =>{
    //     setOrder(theOrder);
    // }

    const declineOrder = (theOrder) =>{
        //delete the order from database

        console.log("decline order#" + theOrder);
    }

    const setOrderInProgress = (theOrder) =>{
        //update database
        // let temp = theOrder;
        // temp.status = "In progress";
        // theOrders.splice(findOrder(theOrder), 1);
        // refreshOrders(items =>[temp, ...theOrders]);

    }

    const setOrderDelivered = (theOrder) =>{
        // let temp = theOrder;
        // temp.status = "Deliverd";
        // pending_orders.splice(findOrder(theOrder), 1);
        // set_pending_orders(items =>[temp, ...pending_orders]);
    }

    const setOrderArchived = (theOrder) =>{
        // let temp = theOrder;
        // temp.status = "Archived";
        // theOrders.splice(findOrder(theOrder), 1);
        // refreshOrders(items =>[temp, ...theOrders]);
    }

    const get_count = () => {
        if(orders !== null) return orders.length;
        else return 0; 
    };


    return (
        <div>
        <OrdersHeader history={view_order_history_handler} accepting={accepting_orders_handler} status={accepting_orders} count={get_count}/>
        <PendingOrders orders={orders} view={view_selected_handler}/>
        
        <SelectOrderDetail orderInProgress={setOrderInProgress} orderDeliver={setOrderDelivered}
                orderArchived={setOrderArchived} orderInfo={selectedOrder} declineOrder ={declineOrder}
        / >

        </div>
    )
}

export default OrdersPage;