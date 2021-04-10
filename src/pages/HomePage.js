import React from "react"
import styled from "styled-components"
import { useUserContext } from "../context/UserContext"
import { LongButton } from "../styles/FormElements"
import { useHistory } from "react-router-dom";
import PieChart from "../assets/pie-chart.png"
import { Card } from "react-bootstrap"
import RestaurantIcon from "../assets/restaurant.png"
import OrdersIcon from "../assets/order.png"
import CustomerIcon from "../assets/customer.png"

export default function SignInPage() {

  const { user, userDb, restaurant } = useUserContext();
  const history = useHistory();

  const test = () => {
    // test auth context 
    if (user) return <temp style={{ fontWeight: 700, fontSize: "1.2em" }}>TRUE</temp>
    else return <temp style={{ fontWeight: 800 }}>FALSE</temp>
  }

  const demo2 = () => {
    //console.log(userDb);

    if(userDb === null) return <temp style={{ fontWeight: 800 }}>FALSE</temp>
    if(userDb.hasOwnProperty("ownedRestaurants") === false) return <temp style={{ fontWeight: 800 }}>FALSE</temp>
    else return <temp  style={{ fontWeight: 700, fontSize: "1.2em" }}>TRUE</temp>
    // if(userDb.hasOwnPropery("ownedRestaurants"))
    // else return <temp  style={{ fontWeight: 700, fontSize: "1.2em" }}>TRUE</temp>
  }

  const greeting = () => {

    if(!restaurant){
      // user and has restaurant
      return (
      <Container>
        <GreetingContainer>
            <GetStartedContainer>
              <h1 style={{color: "#e9eaeb" , marginTop: "2%"}}>Get detailed restaurant analytics  <br></br> with the Foodbite Web Portal</h1>

              <p style={{color: "#e9eaeb", margin: "2% 0"}}>
                FOODBITE FOODBITE FOODBITE FOODBITE FILLER FOODBITE FILLER FOODBITE FOOD BITE FILLER
              </p>

              <p>
                <LongButton primary style={{fontSize: "1.7rem", width: "50%", marginTop: "2%"}} onClick={() => history.push("/sign-up")}>
                  GET STARTED
                </LongButton>
              </p>

            </GetStartedContainer>

            <ImageContainer>
              <img  src={PieChart} alt="pie chart" style={{height: "12rem"}}></img>
            </ImageContainer>
          </GreetingContainer>

          <FeaturesContainer>
            
            <Card style={card_style}>
              <Card.Img variant="top" src={RestaurantIcon} style={icon}></Card.Img>
              <Card.Body>
                <Card.Title>Manage Restaurant</Card.Title>
                <Card.Text>
                  Effortlessly update your restaurant information and add/remove/update menu items. 
                </Card.Text>
              </Card.Body>
            </Card>
    
            <Card style={card_style}>
              <Card.Img variant="top" src={OrdersIcon} style={icon}></Card.Img>
              <Card.Body>
                <Card.Title>Real-time Orders</Card.Title>
                <Card.Text>
                  Receive orders from customers and update their progress in real-time. 
                </Card.Text>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={card_style}>
              <Card.Img variant="top" style={icon} src={CustomerIcon}></Card.Img>
              <Card.Body>
                <Card.Title>Customer Feedback</Card.Title>
                <Card.Text>
                  View ratings and reviews from valid customers.  
                </Card.Text>
              </Card.Body>
            </Card>

          </FeaturesContainer>
        </Container>
      )
    }
    else{
      return (
        <div>
          TODO, you are already logged in
        </div>
      )
    }
  }

  //console.log(user);
  //console.log(userDb); 
  //sessionStorage.clear();

  return (
    <div>
      {greeting()}
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction column;
  margin: 0 auto; 
  width: 70%; 
`; 

const GreetingContainer = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  align-items: center; 
  font-size: 1.4em; 
  background-color: #333a40;
  margin-top: 1.8%; 
`;

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
`; 

const FeaturesContainer = styled.div`
  margin-top: 2.5%; 
  background-color: #333a40;
  display: flex;
  
`; 

const ImageContainer = styled.div`
  margin: .5% 0; 
`;



const Information = styled.div`

`;

const temp = styled.span`
  
`; 

const card_style = {
  backgroundColor: "#333a40", 
  color: "#e9eaeb", 
  width: "33%"
}

const icon = {
  width: "5rem", 
  height: "5rem", 
  margin: "4% auto 0 auto"
}