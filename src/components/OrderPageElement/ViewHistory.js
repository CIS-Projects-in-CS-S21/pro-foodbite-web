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

    const [current, set_curret] = useState(orders); 

    useEffect(() => {
        menuLister(selectOrder.menuItems)
    }, [selectOrder])

    function menuLister(menuItems){
        
        if(typeof menuItems === "undefined") return; 

        setItems([]);
        for (let i = 0; i < menuItems.length; i++) {
            const element = menuItems[i];
            const newItem = <li key={i} style={{textAlign:'center', listStyle:'none', fontWeight: "700"}}
                >{element.name}(${parseFloat(element.price).toFixed(2)})</li>
            setItems(items => [...items, newItem]);
        }
    }

    const get_date = (timestamp) => {
        if(timestamp === undefined) return ""; 

        let time = new Date(0);
        time.setUTCSeconds(timestamp);
        
        return time.toLocaleDateString();
    }

    const get_full_date = (timestamp) => {
        if(timestamp === undefined) return ""; 

        let time = new Date(0);
        time.setUTCSeconds(timestamp);
        
        return time.toLocaleString();
    }

    useEffect(() => {
        setDetail([]);


        
        for (let i = 0; i < current.length; i++) {
            const element = current[i];
            
            if(element.name === undefined) console.log(element);

            let temp = <HistoryItem key={"order"+i} onClick={()=>{
                setShow(!show);
                setOrder(element);
            }}
            >Order Id: {element.orderId}  | Name: {element.name.toUpperCase()} | Number Of Items:
             {itemCounter(element)} | Total Price: $
             {calc_amount(element)} | Date: {get_date(element.createdAt)} | Status:<Status>{element.status}</Status>
                </HistoryItem>
            setDetail(orderDetail => [...orderDetail, temp]);
        }
    }, [current, show])


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

    const handle_orders = (event) => {

        let option = event.target.value;
        let filtered = []; 

        if(option === "PENDING"){
            filtered = orders.filter( order => order.status === "NEW" || order.status === "IN PROGRESS");
            set_curret(filtered); 
        }
        else if(option === "ARCHIVED"){
            filtered = orders.filter( order => order.status === "CANCELED" || order.status === "DELIVERED");
            set_curret(filtered); 
        }
        else{
            // ALL 
            set_curret(orders);
        }
    }


    return (
        <div style={{display:'flex', flexDirection:'column', alignContent:'center', width:'85%', margin: "2% auto", backgroundColor: "#f0f3f5"}}>
            <HeaderContainer>
                <div></div>
                <Header>Today's Order History: {get_count()}</Header>
                <div style={{display: "flex"}}>

                    <Select onChange={(e) => handle_orders(e)}>
                        <Option>ALL</Option>
                        <Option>PENDING</Option>
                        <Option>ARCHIVED</Option>
                    </Select>

                </div>
            </HeaderContainer>

            <Selection>
             {orderDetail}
            </Selection>

            <HistoryDetail show={show}>
                    <h4 style={{borderBottom:"1px solid", width:"100%", marginBottom: "1%"}}>Order#{selectOrder.id}) {selectOrder.name}</h4>
                    Price: ${calc_amount(selectOrder)}<br/>
                    Address: {selectOrder.address}<br/>
                    Received:  {get_full_date(selectOrder.createdAt)}<br/>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>Status: <span style={{fontWeight: "bold", marginLeft: "1%"}}>{selectOrder.status}</span></div> <br/>
                    <h4 style={{borderBottom:"1px solid", marginTop: "2%"}}>Order Items:</h4>
                    {items}
                    <div style={{marginBottom: "5%"}}></div>
                <ViewHistoryButton onClick={()=>{
                    setShow(!show);
                }} data-testid="close-btn">close</ViewHistoryButton>
            </HistoryDetail>
            <ViewHistoryButton onClick={closeShow}>close</ViewHistoryButton>
        </div>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center;
`; 

const Header = styled.h3`
    font-family: "Amatic SC", cursive;
    font-size: 3.8rem; 
    margin-left: 12%; 
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

const Select = styled.select`
  background-color: #da4e2e; 
  font-family: "Amatic SC", cursive;
  font-size: 2.0rem; 
  color: #fff; 
  padding: 10px; 
  font-size: 1.9rem; 
  width: 200px;
  margin-right: 1.2%; 

  &:hover{
    opacity: .8;
  }

  &:focus{
    outline: none; 
  }


`;

const Option = styled.option`
  background-color: #f0f3f5; 
  color: black;  
`; 
