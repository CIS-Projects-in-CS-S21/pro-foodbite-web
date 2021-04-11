import React from "react"
import styled from "styled-components"
import { useUserContext } from "../context/UserContext"
import { LongButton } from "../styles/FormElements"
import { useHistory } from "react-router-dom";
import { ReactComponent as PieChart } from "../assets/pie-chart.svg"
import { Card } from "react-bootstrap"
import RestaurantIcon from "../assets/restaurant.png"
import OrdersIcon from "../assets/order.png"
import CustomerIcon from "../assets/customer.png"
import { convertTime24to12 } from "../utils/Utils"



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
  }

  const get_today = () => {
    // display their current hours today

    const days = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]; 
    let today = new Date().getDay();
    today = days[today]; 

    const hours = restaurant.profile.hours[today]; 
    
    if(hours.open.length === 0) return <h2 style={{fontSize: "2.5rem"}}>CLOSED</h2>
    else return <h3 style={{fontSize: "2rem"}}>{convertTime24to12(restaurant.profile.hours[today].open)} - {convertTime24to12(restaurant.profile.hours[today].close)}</h3> 
  }

  const greeting = () => {

    if(!user){
      // not user
      return (
      <Container>
        <GreetingContainer>
            <GetStartedContainer>
              <h1 style={{color: "black" , marginTop: "2%", textTransform: "none"}}>Get detailed restaurant analytics  <br></br> through the Foodbite web portal</h1>

              <p style={{color: "black", margin: "2% 0"}}>
                View trends about your restaurant. 
              </p>

              <p>
                <LongButton primary style={{fontSize: "1.7rem", width: "50%", marginTop: "2%"}} onClick={() => history.push("/sign-up")}>
                  GET STARTED
                </LongButton>
              </p>

            </GetStartedContainer>

            <ImageContainer>
              <PieChart style={{width: "10em"}}></PieChart>
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

          <HowContainer>
            <Row>
              <Step style={{marginLeft: "3%"}}>1</Step>
              <Line></Line>
              <Step>2</Step>
              <Line></Line>
              <Step  style={{marginRight: "3%"}}>3</Step>
            </Row>

            <div style={{display: "flex", paddingBottom: "1.5em", marginTop: "1%"}}>
              <div style={{width: "33.3%", textAlign: "left", color: "black", marginLeft: "1%"}}>Register your <br></br> restaurant for Foodbite</div>
              <div style={{width: "33.3%", color: "black"}}>Start to receive orders</div>
              <div style={{width: "33.3%", textAlign: "right", color: "black", marginRight: "1%"}}>Get restaurant analytics</div>
            </div>

          </HowContainer>
        </Container>
      )
    }
    else if(restaurant){
      return (
        <Container>
          <div style={{marginTop: "2.5%"}}>
            <h3 style={{opacity: ".8"}}>WELCOME BACK</h3> <br></br> <h1>{restaurant.name}</h1>
            <div style={{marginTop: "2.5%"}}>
              <img src={restaurant.image} alt="restaurant" style={{width: "15rem"}}></img>
            </div>
          </div>

          <div stlye={{marginTop: "2.5%"}}>
            {/* <h3>{new Date().toLocaleDateString()}</h3> */}
            <h3 style={{opacity: ".8", marginTop: "2.5%"}}>HOURS TODAY{get_today()} </h3>
          </div>

        </Container>
      )
    }
    else{
      // user but haven't registered your restaurant

      return (
        <Container>
          <div style={{marginTop: "2.5%"}}>
            <h3 style={{opacity: ".8"}}>WELCOME BACK</h3> <br></br> <h1>{user.email}</h1>
            <LongButton style={{fontSize: "2em", marginTop: "2%", width: "50%"}} onClick={() => history.push("/new-restaurant")}>register restaurant now!</LongButton>
          </div>
        </Container>
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
  //border: 2px solid black;
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  align-items: center; 
  font-size: 1.4em;   
  margin-top: 4.5%; 

  //background: linear-gradient(to right, #004c52, #5bdebb);


`;

const GetStartedContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
`; 

const FeaturesContainer = styled.div`
  margin-top: 6%; 
 // background-color: #333a40;
  display: flex;
  border: 2px solid black;
`; 

const HowContainer = styled.div`
  margin-top: 2.5%; 
  //background-color: #333a40;
  display: flex;
  flex-direction: column; 
  width: 80%;
  margin: 4% auto;  
 // background-color: #5bc0de; 
`; 

const Row = styled.div`
  display: flex;
  justify-content: space-around; 
  align-items: center;
  color: #e9eaeb; 
  margin-top: 1.5%; 
  color: black; 
`; 

const Step = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px; 
  border: 1px solid black;  
  line-height: 40px; 
  display: inline-block; 
  font-weight: 700; 
  font-size: 1.2em;  
`; 

const Line = styled.div`
  background-color: black; 
  height: 2px;  
  flex: 1;
`; 

const ImageContainer = styled.div`
  margin: .5% 0; 
`;



const temp = styled.span`
  
`; 

const card_style = {
 // backgroundColor: "#333a40", 
  //color: "#e9eaeb", 
  color: "black", 
  width: "33.33%",
  //backgroundColor: "#5bc0de",
}

const card_style2 = {
  backgroundColor: "#333a40", 
  color: "#ffffff", 
  //width: "33.33%",
  border: "none"
}

const icon = {
  width: "5rem", 
  height: "5rem", 
  margin: "4% auto 0 auto"
}