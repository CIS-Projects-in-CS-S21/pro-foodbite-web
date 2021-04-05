import React from "react"
import styled from "styled-components"
import { convertTime24to12 } from "../../utils/Utils"

export default function PendingOrders( {orders, view} ) {

  const get_short_name = ( (order) => {
    // if name too long, "..."

    if(order.hasOwnProperty("name")){

      let name = order.name.toUpperCase();  

      if(name.length > 10) {
        name = name.substr(0, 9);
        name += "..."; 
      }

      return <div style={{fontSize: "1.3rem"}}>{name}</div>
    }
  }); 

  const get_items_count = ( (order) => {

    if(order.hasOwnProperty("timestamp")) return order.menuItems.length;

  });

  const get_timestamp = ( (order) => {
    
    if(order.hasOwnProperty("menuItems")) {
        
      let split = order.timestamp.split(",");

      return split[1].trim();
    }
    
  });

  const calc_amount = ( (order) => {

    if(order.hasOwnProperty("menuItems")){
      // sum the price of each object in menuItems array

      let amount = order.menuItems.reduce( (a, b) => ({price: a.price + b.price}));
      //console.log(amount);

      return amount.price.toFixed(2); 
    }
  });

  const get_status_color = ( (order) => {
    // if red needs action

    if(order.status === "NEW" || order.status === "CANCELED") return <Status />
    else return <Status primary/>

  });

  return (
    <Container>

      {
        orders.map( (order, index) => {
          return (
            <OrderContainer onClick={(e) => view(e, order)}>
              <OrderHeader>
                <div style={{marginRight: "4%"}}>{index+1}</div>
                {get_short_name(order)}
              </OrderHeader>
      
              <Info>{order.id}</Info>
      
              <ItemsCount>
                {get_items_count(order)} items
              </ItemsCount>
      
              <Info>
                ${calc_amount(order)}
              </Info>
      
              <Info>
                {get_timestamp(order)}
              </Info>

              {get_status_color(order)}
      
          </OrderContainer>
          )
        })
      }


    </Container>
  )
}

const Container = styled.div`
  //width: 70%;
  width: 85%; 
  margin: 0 auto;
  display: flex;
  flex-direction: row; 
  overflow-x: scroll; 
  //background-color: #e9f7ff;  
  background-color: #f0f3f5; 
`;


const OrderContainer = styled.div`
  
  border: 3.5px solid #181818;
  min-height: 200px;
  min-width: 200px;
  margin: 1.2% 2%; 

  &:hover {
    cursor: pointer;
    opacity: 80%;  
  }

  position: relative; 
  text-align: left;
  background-color: #FEFFCD; 
`;

const OrderHeader = styled.div`
  font-weight: 800; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin: 1% 2%; 
  font-size: 1.3rem;  
  font-weight: 800; 
  border-bottom: 1px solid; 
`; 

const Info = styled.div`
  padding: 10px;
  font-weight: 600;
`; 

const ItemsCount = styled.div`
  font-size: 1.0rem;  
  font-weight: 900; 
  padding: 10px; 
`; 

const Status = styled.div`
  bottom: 1px;
  right: 1px;
  position: absolute;
  border-bottom: ${props => props.primary ? "70px solid #5bdebb" : "70px solid #de795b"};
  border-left: 60px solid transparent;
`; 