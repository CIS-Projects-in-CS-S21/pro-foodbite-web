import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Account from "./pages/AccountPage"
import OrdersPage from "./pages/OrdersPage"
import { useUserContext } from "./context/UserContext"


export default function Routes() {

  const { user } = useUserContext(); 

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/sign-in" component={SignInPage}></Route>
        <Route path="/sign-up" component={SignUpPage}></Route>
        <Route
          path="/account"
          render = {() => {
            return user ? <Account></Account> : <Redirect to="sign-in"/> 
          }}>
        </Route>
        <Route
          path="/orders"
          render = {() => {
            return user ? <OrdersPage></OrdersPage> : <Redirect to="sign-in"/> 
          }}>
        </Route>
      </Switch>
    </Router>
  )
}