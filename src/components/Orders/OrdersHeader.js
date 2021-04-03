import React from "react"
import styled from "styled-components"; 
import { ReactComponent as CheckMark } from "../../assets/check.svg"
import { ReactComponent as CloseMark } from "../../assets/close.svg"
import { useUserContext } from "../../context/UserContext"


export default function OrdersHeader( { history, accepting, status, count } ) {


  const get_status = ( () => {
    // accepting orders either green w/ check 
    // or red w/ close
  
    if(status){
      return (
        <StatusButton primary onClick={accepting}>
          accepting orders 
          <CheckMark style={{width: "40px", marginLeft: "15px"}} />
        </StatusButton>
      )
    }

    else{
      return (
        <StatusButton onClick={accepting}>
          accepting orders
        <CloseMark style={{width: "40px", marginLeft: "15px"}} />
        </StatusButton>
      )
    }
  
  });

  const get_count = ( () => {
    // current pending orders count
    if(count !== undefined || count !== null) return count; 
  });

  return (
    <Container>

      <OrdersCount>
        Orders: 
        <Count>
          {get_count()}
        </Count>
      </OrdersCount>

      {get_status()}

      <ViewHistoryButton onClick={history}>
        View Order History
      </ViewHistoryButton>
      
    </Container>
  )
}

const Container = styled.div`
  font-family: "Amatic SC", cursive;   
  font-size: 2.8rem; 
  font-weight: 700; 
 // border: 1px solid black; 
  display: flex; 
  justify-content: space-between;
  align-items: center; 
 // width: 70%; 
  margin: 1.5% auto .8% auto; 
  background-color: #f0f3f5; 
  width: 85%; 
`;

const OrdersCount = styled.div`
  display: flex; 
  align-items: center;
  //font-size: 2.4rem; 
  //color: #f9b767;   
  margin-left: 1%;
`;

const Count = styled.div`
  font-size: 3.5rem;  
  padding-left: 10px; 
  color: #343c44; 
`;

const StatusButton = styled.button`
  //font-size: 2.4rem; 
  display: inline-block;
  padding: 3px 6px;
  border: medium none;
  background-color: #f0f3f5; 
  background-color: #ffffff;   
  color: ${props => props.primary ? "#5bb55f" : "#fb2e0f"};

  &:hover {
    opacity: 70%; 
  }
`;

const ViewHistoryButton = styled.button`
  //font-size: 2.4rem; 
  font-weight: 800; 
  padding: 3px 6px;
  border: medium none;
  background-color: #ffffff;   
  margin-right: 1%; 

  &:hover {
    opacity: 70%; 
  }
`;