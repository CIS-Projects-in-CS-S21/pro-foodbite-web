import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { calc_amount } from "../../utils/Utils"

const DetailLayout = styled.div`
    display:flex;
    flex-direction:column;
    justify-items:left;
    width: 70%;
    margin: 0 auto;
    background-color: #f0f3f5; 
    margin-top: 2%; 
    font-weight: 700; 
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

const Value = styled.span`
    font-weight: 600;
    margin-left: 1%; 
`;


function OrderDetail({selectOrder}){ 

    console.log(selectOrder); 

    useEffect(() => {
        returnOrderItem()
    }, [selectOrder]);

    const [items,setItems] = useState([]);
    const returnBasicOrderInfo = () =>{

        // todo check not undefined

        return "Order# " + selectOrder.id + " " + selectOrder.name ;
    }
    const returnOrderItem = () =>{
        setItems([]);
        //const orderList = selectOrder.orderItem;
        const orderList = selectOrder.menuItems; 
        for (let i = 0; i < orderList.length; i++) {
            const element = orderList[i];
            const newItem = <label key={i} style={{textAlign:'left', fontWeight:"900"}}>#{element.itemNumber}.{element.name.toUpperCase()}x{element.price}</label>
            setItems(items => [...items, newItem]);
        }
    }
    if(selectOrder  == null){
        return null;
    }
 
    return(
        <div style={{display:'flex', flexDirection:'column', maxHeight:'50%',
            textAlign:'left', width:'50%', overflowY:'scroll'}}>
            <label style={{margin:".5% 0 1.8% 0"}}>{returnBasicOrderInfo()}</label>
            {items}              
            <br/>
            <label>Order Price:<Value>{calc_amount(selectOrder)}</Value></label>
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
            <StatusLi>Address: <Value>{selectOrder.address}</Value></StatusLi>
            <StatusLi>Status:  <Value>{selectOrder.status}</Value></StatusLi>
            <StatusLi>ETA:     <Value>{selectOrder.eta}</Value></StatusLi>
            
        </div>
    )
}


function OrderAction({selectOrder, declineOrder, setInProgress, setDeliver, setArchived}){
    
    const [show, setShow] = useState(false)


    if(selectOrder.orderNumber === ""){
        return null;
    }



    return(
        <div style={{display:'flex', flexDirection:'row', width:'100%', textAlign:'left', backgroundColor:'rgb(200,200,200)'}}>
            <label style={{width:'50%',height:'100%'}}>
                Received At:<Value>{selectOrder.timestamp}</Value> - <Value>{selectOrder.receivedDate}</Value>
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
                    }}>In Progress</ActionButton>
                    <ActionButton onClick={()=>{
                        setDeliver(selectOrder);
                        setShow(!show);
                    }}>Delivered</ActionButton>
                </StateUpdate>
                <ActionButton style={{width:'50%', height:'100%'}} onClick={() =>{
                    declineOrder(selectOrder);
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


