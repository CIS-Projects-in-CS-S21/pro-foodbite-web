import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import Account from "./pages/AccountPage"
import OrdersPage from "./pages/OrdersPage"
import { useUserContext } from "./context/UserContext"
import AnalyticsPage from "./pages/AnalyticsPage";
import ErrorPage from "./pages/ErrorPage";
import NewRestaurantPage from "./pages/NewRestaurantPage";
import RestaurantPage from "./pages/RestaurantPage";
import { shouldForceRestaurantSignup } from './utils/Utils';
import RatingPage from "./pages/RatingPage";
import SalesPage from "./pages/SalesPage";


export default function Routes() {

  const { user, userDb } = useUserContext();

  return (
    <Router>
      <Header></Header>
      <Switch>

        <Route exact path="/" component={HomePage}></Route>
        <Route
          path="/sign-in"
          render={() => {
            return user ? <Redirect to="/" /> : <SignInPage />
          }}>
        </Route>
        <Route
          path="/sign-up"
          render={() => {
            return user ? <Redirect to="/" /> : <SignUpPage />
          }}>
        </Route>
        <Route
          path="/account"
          render={() => {
            return user ? shouldForceRestaurantSignup(userDb) ? <Redirect to="/new-restaurant" /> : <Account /> : <Redirect to="sign-in" />
          }}>
        </Route>
        <Route
          path="/orders"
          render={() => {
            return user ? shouldForceRestaurantSignup(userDb) ? <Redirect to="/new-restaurant" /> : <OrdersPage /> : <Redirect to="sign-in" />
          }}>
        </Route>
        <Route
          path="/analytics"
          render={() => {
            return user ? shouldForceRestaurantSignup(userDb) ? <Redirect to="/new-restaurant" /> : <AnalyticsPage /> : <Redirect to="sign-in" />
          }}>
        </Route>
        <Route
          path="/restaurant"
          render={() => {
            return user ? shouldForceRestaurantSignup(userDb) ? <Redirect to="/new-restaurant" /> : <RestaurantPage /> : <Redirect to="sign-in" />
          }}>
        </Route>
        <Route
          path="/new-restaurant"
          render={() => {
            return user ? <NewRestaurantPage /> : <Redirect to="sign-in" />
          }}>
        </Route>
        <Route
          path="/my-ratings"
          render={() =>{
            return user ? <RatingPage /> : <Redirect to ="sign-in" />
          }}>
        </Route>
        <Route
          path="/sales"
          render={() =>{
            return user ? <SalesPage/> : <Redirect to ="sign-in"/>
          }}>
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )
}