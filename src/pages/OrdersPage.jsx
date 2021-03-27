import React, { useState } from "react"
import OrdersHeader from "../components/Orders/OrdersHeader"


const OrdersPage = () => {

    const [accepting_orders, set_accepting_orders] = useState(true); 


    const view_order_history_handler = (e) => {
        // clicked "View Order History" btn 
        e.preventDefault();
    
        console.log("clicked  view order"); 
    
    }
    
    const accepting_orders_handler = (e) => {
        // clicked "Accepting Orders" btn 
        e.preventDefault();
    
        console.log("clicked accepting"); 
    
        // set available to opposite boolean in restaurant document 
        // set accepting orders state to same
    }
    
    
    const renderCurrentScreen = () => {
    }


    return (
        <div>
        <OrdersHeader history={view_order_history_handler} accepting={accepting_orders_handler} status={accepting_orders}/>
        {/* {renderCurrentScreen()} */}
        </div>
    )
}



export default OrdersPage;