import OrdersHeader from "../components/Orders/OrdersHeader"


const view_order_history_handler = (e) => {
    // clicked "View Order History" btn 
    e.preventDefault();
}


const renderCurrentScreen = () => {
}

const OrdersPage = () => {
    return (
        <div>
        <OrdersHeader button={view_order_history_handler}/>
        {/* {renderCurrentScreen()} */}
        </div>
    )
}



export default OrdersPage;