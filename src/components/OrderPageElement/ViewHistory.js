import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { calc_amount } from "../../utils/Utils"

const HistoryItem = styled.button`
    border:none;
    background-color:white;
    border-bottom:1px solid;
    font-size: 1.2rem; 
    padding: 10px; 
    display: flex;
    flex-direction: row; 
    width: 100%; 
    justify-content: center; 
     

    :hover{
        background-color:rgb(200,200,200);
    }
`

const HistoryDetail = styled.div`
    z-index:1000;
    display:${props =>props.show? "flex": "none"};
    position:fixed;
    width:85%;
    height:100%;
    align-content:center;
    background-color:white;
    flex-direction:column;  
    font-size: 1.2rem;  
`

export default function ViewHistory( {orders, history, closeShow } ) {


    const tempOrderFormat2 = {
        orderNumber: 2,
        orderOwner: "Test Test2",
        receivedAt : "3:00pm",
        receivedDate : "3/25/2021",
        totalPrice: "$10.00",
        status:"Pending",
        eta:"3:30pm",
        orderItem : [{
            itemNumber: 3,
            itemName :"burger",
            itemAmount: 4,
        }, {
            itemNumber: 10,
            itemName:"Fries",
            itemAmount: 2,
        },{
            itemNumber:15,
            itemName:"Cheese steak",
            itemAmount: 5
        }]
    };

    const emptyOrder = {
        orderNumber:"",
        address: "",
        orderOwner:"",
        receivedAt :"",
        receivedDate : "",
        totolPrice: "",
        status:"",
        eta:"",
        menuItem : [{
            itemNumber: "",
            itemName :"",
            itemAmount: "",
        }]
    }


    const [show, setShow] = useState(false);
    const [orderDetail, setDetail] = useState();
    const [selectOrder, setOrder] = useState(emptyOrder);
    const [items, setItems] = useState([]);
    const [sort, set_sort] = useState(""); 

    useEffect(() => {
        menuLister(selectOrder.menuItems)
    }, [selectOrder])

    function menuLister(menuItems){
        
        if(typeof menuItems === "undefined") return; 

        setItems([]);
        for (let i = 0; i < menuItems.length; i++) {
            const element = menuItems[i];
            const newItem = <li key={i} style={{textAlign:'center', listStyle:'none', fontWeight: "700"}}
                >#{element.itemNumber}.{element.name}(${element.price.toFixed(2)})</li>
            setItems(items => [...items, newItem]);
        }
    }

    const get_time = (timestamp) => {
        if(timestamp === undefined) return ""; 

        let split = timestamp.split(",");

        return split[1].trim();
    }

    useEffect(() => {
        setDetail([]);
        for (let i = 0; i < orders.length; i++) {
            const element = orders[i];
            let temp = <HistoryItem key={"order"+i} onClick={()=>{
                setShow(!show);
                setOrder(element);
            }}
            >Order Id: {element.id}  | Name: {element.name.toUpperCase()} | Number Of Items:
             {itemCounter(element)} | Total Price: $
             {calc_amount(element)} | Received At: {get_time(element.timestamp)} | Status:<Status>{element.status}</Status>
                </HistoryItem>
            setDetail(orderDetail => [...orderDetail, temp]);
        }
    }, [orders, show])


    function itemCounter(order){
        
        if(order.hasOwnProperty("menuItems")) return order.menuItems.length; 

        // let temp = 0;
        // for (let i = 0; i < order.length; i++) {
        //     const element = order[i];
        //     temp += element.itemAmount;
        // }
        // return temp;
    }

    const get_count = () => {

        if(orders !== null || orders !== undefined) return orders.length;
        else return 0; 
    }



    return (
        <div style={{display:'flex', flexDirection:'column', alignContent:'center', width:'85%', margin: "2% auto", backgroundColor: "#f0f3f5"}}>
            <Header>Today's Order History: {get_count()}</Header>
            <Selection>
             {orderDetail}
            </Selection>

            <HistoryDetail show={show}>
                    <h4 style={{borderBottom:"1px solid", width:"100%", marginBottom: "1%"}}>Order#{selectOrder.id}) {selectOrder.name}</h4>
                    Price: ${calc_amount(selectOrder)}<br/>
                    Address: {selectOrder.address}<br/>
                    Received At:  {get_time(selectOrder.timestamp)}<br/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>Status: <span style={{fontWeight: "bold", marginLeft: "1%"}}>{selectOrder.status}</span></div> <br/>
                    {/* ETA: {selectOrder.eta}<br/><br/> */}
                    <h4 style={{borderBottom:"1px solid", marginTop: "2%"}}>Order Items:</h4>
                    {items}
                    <div style={{marginBottom: "5%"}}></div>
                <ViewHistoryButton onClick={()=>{
                    setShow(!show);
                }}>close</ViewHistoryButton>
            </HistoryDetail>
            <ViewHistoryButton onClick={closeShow}>close</ViewHistoryButton>
        </div>
    )
}

const Header = styled.h3`
    font-family: "Amatic SC", cursive;
    font-size: 3.4rem; 
`;

const ViewHistoryButton = styled.button`
    font-family: "Amatic SC", cursive;   
    font-size: 2.4rem; 
    font-weight: 800; 
    padding: 3px 6px;
    border: medium none;
    background-color: #C0C2C4; 
    margin-top: 2%;  

    &:hover {
    opacity: 70%; 
    }

    background-color: #5bc0de; 
`;

const Selection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Status = styled.div`
    font-weight: bold; 
    margin-left: .2%;  
`;
