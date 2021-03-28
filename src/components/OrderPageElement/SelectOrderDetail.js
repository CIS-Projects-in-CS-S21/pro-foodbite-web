import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const DetailLayout = styled.div`
    display:flex;
    
    flex-direction:column;

    justify-items:left;
`

const ActionButton = styled.button`
    background-color:rgb(200,200,200);
    border:none;

    :hover{
        background-color:rgb(150,150,150);
    }
`

const StateUpdate = styled.div`
    display:${props =>props.show? "flex": "none"};
    position:absolute;
    z-index:1000;
    flex-direction:column;
    border: 1px solid #e5e5e5;
    background-color:white;
    box-shadow: 0 5px 15px rgba(0,0,0, 0.5);
`


function OrderDetail({selectOrder}){
    useEffect(() => {
        returnOrderItem()
    }, [selectOrder]);

    const [items,setItems] = useState([]);
    const returnBasicOrderInfo = () =>{
        return "Order# " + selectOrder.orderNumber + " " + selectOrder.orderOwner ;
    }
    const returnOrderItem = () =>{
        setItems([]);
        const orderList = selectOrder.orderItem;
        for (let i = 0; i < orderList.length; i++) {
            const element = orderList[i];
            const newItem = <label key={i} style={{textAlign:'left'}}>#{element.itemNumber}.{element.itemName}x{element.itemAmount}</label>
            setItems(items => [...items, newItem]);
        }
    }
    if(selectOrder  == null){
        return null;
    }
 
    return(
        <div style={{display:'flex', flexDirection:'column', maxHeight:'50%',
            textAlign:'left', width:'50%', overflowY:'scroll'}}>
            <label >{returnBasicOrderInfo()}</label>
            {items}              
            <br/>
            <label>Order Price:{selectOrder.totalPrice}</label>
        </div>
    )
}

const StatusLi = styled.li`
    list-style:none;
`

function OrderStatus({selectOrder}){
    
    if(selectOrder == null){
        return null;
    }

    return(
        <div style={{display:'flex', flexDirection:'column', 
            width:"50%", textAlign:'left',
            }}>
            <br/>
            <StatusLi>Address: {selectOrder.address}</StatusLi>
            <StatusLi>Status:  {selectOrder.status}</StatusLi>
            <StatusLi>ETA:     {selectOrder.eta}</StatusLi>
            
        </div>
    )
}



function OrderAction({selectOrder, declineOrder, setInProgress, setDeliver, setArchived}){
    
    const [show, setShow] = useState(false)


    if(selectOrder.orderNumber == ""){
        return null;
    }



    return(
        <div style={{display:'flex', flexDirection:'row', width:'100%', textAlign:'left', backgroundColor:'rgb(200,200,200)'}}>
            <label style={{width:'50%',height:'100%'}}>
                ReceivedAt:{selectOrder.receivedAt}-{selectOrder.receivedDate}
            </label>
            <div style={{width:"50%"}}>
                <ActionButton style={{width:'50%', height:'100%'}} onClick={() => setShow(!show)}>
                    Update Status</ActionButton>
                <StateUpdate show={show} style={{width:'25%'}}>
                    <ActionButton onClick={()=>{
                            setArchived(selectOrder);
                            setShow(!show);
                        }
                    }>Archived</ActionButton>
                    <ActionButton onClick={()=>{
                        setInProgress(selectOrder);
                        setShow(!show);
                    }}>InProgress</ActionButton>
                    <ActionButton onClick={()=>{
                        setDeliver(selectOrder);
                        setShow(!show);
                    }}>Delivered</ActionButton>
                </StateUpdate>
                <ActionButton style={{width:'50%', height:'100%'}} onClick={() =>{
                    declineOrder(selectOrder.orderNumber);
                }}>Decline Order</ActionButton>
            </div>
        </div>
    )

}

export default function SelectOrderDetail({orderInfo,declineOrder, orderInProgress, orderDeliver, orderArchived}) {

    useEffect(() => {
        setOrder(orderInfo);
    }, [orderInfo])

    const [theOrder, setOrder] = useState();


    const emptyOrder = {
        orderNumber:"",
        address:"",
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

    if(theOrder == null){
        return null;
        // return( 
        //     <DetailLayout>
        //     <div style={{display:'flex', flexDirection:'row', maxHeight:'200px'}}>
        //         <OrderDetail
        //             selectOrder={emptyOrder}></OrderDetail>
        //         <OrderStatus 
        //              selectOrder={emptyOrder}></OrderStatus>
        //     </div>
        //     <OrderAction
        //         selectOrder={emptyOrder}></OrderAction>
        // </DetailLayout>
        // )
    }

    return (
        <DetailLayout>
            <div style={{display:'flex', flexDirection:'row', maxHeight:'200px'}}>
                <OrderDetail
                    selectOrder={theOrder}></OrderDetail>
                <OrderStatus 
                     selectOrder={theOrder}></OrderStatus>
            </div>
            <OrderAction setInProgress={orderInProgress} setDeliver={orderDeliver} setArchived={orderArchived}
                selectOrder={theOrder} declineOrder={declineOrder}></OrderAction>
        </DetailLayout>
    )
}


