import React from "react"
import styled from "styled-components"
import { convertTime24to12 } from "../../utils/Utils"


export default function PendingOrders( {orders, view} ) {

 
  const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 

  const get_short_name = ( (order) => {
    // shorten to first-name last initial 
    // set MAX character limit

    // todo 
    if(order.hasOwnProperty("name")){

      if(order.name.length > 12) return <div style={{fontSize: "1rem"}}>{order.name}</div>
      return <div style={{fontSize: "1.3rem"}}>{order.name}</div>
    }

  }); 

  const get_items_count = ( (order) => {

    console.log(order);

    if(order.hasOwnProperty("menuItems")) return order.menuItems.length; 
    
  });

  const get_timestamp = ( (order) => {

    if(order.hasOwnProperty("menuItems")) return convertTime24to12(order.timestamp);
  })

  const calc_amount = ( (order) => {
    // todo
    return 8.24; 
  });

  const get_status_color = ( (order) => {
    // todo
    return <Status primary />
  });

  // just for layout 
  const temp = ( () => {

    return (
      
      <OrderContainer onClick={(e) => view(e, 123)}>
        <OrderHeader>
          <div style={{marginRight: "4%"}}>1.)</div>
          Rustin Cohle
        </OrderHeader>

        <Info>#123</Info>

        <ItemsCount>
          3 items
        </ItemsCount>

        <Info>
          $8.24
        </Info>

        <Info>
          02:16
        </Info>

        <Status primary />
    </OrderContainer>

    )
    
  });


  return (
    <Container>

      {/* {
        count.map( num => {
          return temp()
        })
      } */}

      {
        orders.map( (order, index) => {
          return (
            <OrderContainer onClick={(e) => view(e, order.id)}>
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

              {get_status_color()}
      
          </OrderContainer>
          )
        })
      }


    </Container>
  )
}

const Container = styled.div`
  //border: 1px solid black; 
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: row; 
  overflow-x: scroll; 
  //background-color: #e9f7ff;  
  background-color: #f0f3f5; 
`;


const OrderContainer = styled.div`

  border: 2px solid;
  min-height: 200px;
  min-width: 200px;
  margin: 1.5% 2%; 

  &:hover {
    cursor: pointer;
    opacity: 80%;  
  }

  position: relative; 
  text-align: left;
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
`; 

const ItemsCount = styled.div`
  font-size: 1.0rem;  
  font-weight: 800; 
  padding: 10px; 
`; 

const Status = styled.div`
  bottom: 0px;
  right: 0px;
  position: absolute;
  border-bottom: ${props => props.primary ? "70px solid #5bb55f" : "70px solid #fb2e0f"};
  border-left: 60px solid transparent;
`; 