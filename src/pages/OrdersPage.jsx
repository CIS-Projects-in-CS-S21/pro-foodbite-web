import React, { useState } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"
import { useUserContext } from "../context/UserContext"
import { firestore } from "../firebase"

import { mock_pending_orders } from "../tempData"


const OrdersPage = () => {

    const { restaurant, userDb } = useUserContext(); 

    const [accepting_orders, set_accepting_orders] = useState(restaurant.available); 
    const [pending_orders, set_pending_orders] = useState(mock_pending_orders); // mock data for now 
    const [view_order_history, set_view_order_history] = useState(false); 
    const [selected_order, set_selected_order] = useState(null);

    
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
    
        console.log("clicked  view order"); 
        set_view_order_history(true); 
    }

    const view_selected_handler = (e, order) => {
        e.preventDefault();

        console.log("clicked on specific order:");
        set_view_order_history(order); 
    }
    
    return (
        <div>
        <OrdersHeader history={view_order_history_handler} accepting={accepting_orders_handler} status={accepting_orders} count={pending_orders.length}/>
        <PendingOrders orders={pending_orders} view={view_selected_handler}/>
        

        </div>
    )
}

export default OrdersPage;