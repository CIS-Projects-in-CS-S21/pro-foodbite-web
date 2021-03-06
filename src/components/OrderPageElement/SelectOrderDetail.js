import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { calc_amount } from "../../utils/Utils"

const DetailLayout = styled.div`
    display:flex;
    flex-direction:column;
    justify-items:left;
    width: 70%;
    margin: 0 auto;
    margin-top: 2%; 
    font-weight: 700; 
    width: 85%; 

    border-top: 2px solid #f0f3f5; 
`

const ActionButton = styled.button`
    background-color:rgb(200,200,200);
    border:none;
    padding: 5px;
    border: 1px solid transparent; 
   
    :hover{
        border: 1px solid black; 
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

    font-size: ${props => props.primary ? "1.1rem" : ""};
`;


function OrderDetail({selectOrder}){ 

    useEffect(() => {
        returnOrderItem()
    }, [selectOrder,]);

    const [items,setItems] = useState([]);
    const returnBasicOrderInfo = () =>{

        // return "Order# " + selectOrder.id + " " + selectOrder.name ;
        return "Order: " + selectOrder.orderId;
    }

    const get_options = () => {

        if(selectOrder.hasOwnProperty("options")){
            return selectOrder.options; 
        }

        return "none"; 
    }


    const returnOrderItem = () =>{
        setItems([]);
        //const orderList = selectOrder.orderItem;
        const orderList = selectOrder.menuItems; 
        for (let i = 0; i < orderList.length; i++) {
            const element = orderList[i];
            // const newItem = <label key={i} style={{textAlign:'left', fontWeight:"900"}}>#{element.itemNumber}.{element.name.toUpperCase()} (${element.price})</label>

            // TODO, amount? over displaying price?

            
            const newItem = 
                <div>
                    <div key={i} style={{textAlign:'left', fontWeight: 900, marginLeft: "1%"}}>{element.name.toUpperCase()} (${element.price})</div>
                    <Options>{get_options()}</Options>
                </div>


            //const newItem = <label key={i} style={{textAlign:'left', fontWeight: 900, marginLeft: "1%"}}>{element.name.toUpperCase()} (${element.price.toFixed(2)})</label>
            setItems(items => [...items, newItem]);
        }
    }
    if(selectOrder  == null){
        return null;
    }
 
    return(
        <div style={{display:'flex', flexDirection:'column', maxHeight:'50%', 
            textAlign:'left', width:'50%', overflowY:'scroll'}}>
            <label style={{margin:".5% 0 1.8% 1%"}}>{returnBasicOrderInfo()}</label>
            {items}              
            <br/>
            <label style={{marginLeft: "1%"}}>Order Price: $<Value>{selectOrder.total.toFixed(2)}</Value></label>
        </div>
    )
}

const StatusLi = styled.li`
    list-style:none;
    font-size: 1.1rem; 
    margin-left: 1%; 
`

const Options = styled.div`
    color: #de795b; 
    margin-bottom: 2%; 
    margin-left: 1.5%; 
`; 

function OrderStatus({selectOrder}){
    
    if(selectOrder == null){
        return null;
    }

    return(
        <div style={{display:'flex', flexDirection:'column', 
            width:"50%", textAlign:'left',
            }}>
            <br/>
            <StatusLi key={selectOrder.name}>Name: <Value>{selectOrder.name}</Value></StatusLi>
            <StatusLi key={selectOrder.address}>Address: <Value>{selectOrder.address}</Value></StatusLi>
            <br/>
            <br/>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "1.5%"}}>
                <StatusLi>Status:  </StatusLi>
                <Value primary style={{borderBottom: "1px solid black"}}>{selectOrder.status}</Value>
            </div>
            {/* <StatusLi>ETA:     <Value>{selectOrder.eta}</Value></StatusLi> */}
            
        </div>
    )
}


function OrderAction({selectOrder, declineOrder, setInProgress, setDeliver, setReady, setOneTheWay, setPickedUp}){
    
    const [show, setShow] = useState(false)


    if(selectOrder.orderNumber === ""){
        return null;
    }

    const get_full_date = (timestamp) => {
        if(timestamp === undefined) return ""; 

        let time = new Date(0);
        time.setUTCSeconds(timestamp);
        
        return `0${time.getHours()}:${time.getMinutes()}`; 
    }

    return(
        <div style={{display:'flex', flexDirection:'row', width:'100%', textAlign:'left', backgroundColor:'rgb(200,200,200)'}}>
            <label style={{width:'50%',height:'100%', marginLeft: "1%", marginTop: "1%"}}>
                Received At:<Value>{get_full_date(selectOrder.createdAt)}</Value>
            </label>
            <div style={{width:"50%"}}>
                <ActionButton data-testid="update-status" style={{width:'50%', height:'100%', backgroundColor: "#5bdebb", fontWeight: 500, borderLeft: "1px solid #5a5a5a"}} onClick={() => setShow(!show)}>
                    UPDATE STATUS</ActionButton>
                <StateUpdate show={show} style={{width:'21.3%'}}>
                    <ActionButton onClick={()=>{
                        setInProgress(selectOrder);
                        setShow(!show);
                    }}data-testid="in-progress">IN PROGRESS</ActionButton>
                    <ActionButton onClick={()=>{
                        setOneTheWay(selectOrder);
                        setShow(!show);
                    }}>ON THE WAY</ActionButton>
                    <ActionButton onClick={()=>{
                        setDeliver(selectOrder);
                        setShow(!show);
                    }}>DELIVERED</ActionButton>
                    <ActionButton onClick={()=>{
                        setReady(selectOrder);
                        setShow(!show);
                    }}>READY FOR PICKUP</ActionButton>
                    <ActionButton onClick={()=>{
                        setPickedUp(selectOrder)
                        setShow(!show);
                    }}>PICKED-UP</ActionButton>
                </StateUpdate>
                <ActionButton style={{width:'50%', height:'100%', backgroundColor: "#de795b", fontWeight: 500, borderLeft: "1px solid #5a5a5a"}} onClick={() =>{
                    declineOrder(selectOrder);
                }}>DECLINE ORDER</ActionButton>
            </div>
        </div>
    )

}

export default function SelectOrderDetail({orderInfo, declineOrder, orderInProgress, orderDeliver, orderReady, orderOnTheWay, orderPickedUp}) {

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
            <div style={{display:'flex', flexDirection:'row', maxHeight:'200px', marginTop: "1.5%"}}>
                <OrderDetail
                    selectOrder={theOrder}></OrderDetail>
                <OrderStatus 
                     selectOrder={theOrder}></OrderStatus>
            </div>
            <OrderAction setInProgress={orderInProgress} setDeliver={orderDeliver} setReady={orderReady}
                selectOrder={theOrder} declineOrder={declineOrder} setOneTheWay={orderOnTheWay} setPickedUp={orderPickedUp}></OrderAction>
        </DetailLayout>
    )
}


