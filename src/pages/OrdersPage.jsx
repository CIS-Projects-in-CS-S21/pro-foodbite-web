import React, { useState } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"

import { mock_pending_orders } from "../tempData"


const OrdersPage = () => {

    const [accepting_orders, set_accepting_orders] = useState(true); 
    const [pending_orders, set_pending_orders] = useState(mock_pending_orders); // mock data for now 


    //todo 
    const view_order_history_handler = (e) => {
        // clicked "View Order History" btn 
        e.preventDefault();
    
        console.log("clicked  view order"); 
    
    }
    
    //todo
    const accepting_orders_handler = (e) => {
        // clicked "Accepting Orders" btn 
        e.preventDefault();
    
        console.log("clicked accepting"); 
    
        // set available to opposite boolean in restaurant document 
        // set accepting orders state to same
    }

    //todo
    const view_selected_handler = (e, id) => {
        e.preventDefault();

        console.log("clicked on specific order:" + id);
    }
    
    
    // const renderCurrentScreen = () => {
    // }


    return (
        <div>
        <OrdersHeader history={view_order_history_handler} accepting={accepting_orders_handler} status={accepting_orders}/>
        <PendingOrders orders={pending_orders} view={view_selected_handler}/>
        {/* {renderCurrentScreen()} */}
        </div>
    )
}



export default OrdersPage;