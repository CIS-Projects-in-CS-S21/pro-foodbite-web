import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Account from "./pages/AccountPage"
import OrdersPage from "./pages/OrdersPage"


export default function Routes({ auth }) {

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/sign-in" component={SignInPage}></Route>
        <Route path="/sign-up" component={SignUpPage}></Route>
        <Route path="/account" component={Account}></Route>
        <Route path="/orders" component={OrdersPage}></Route>

      </Switch>
    </Router>
  )
}