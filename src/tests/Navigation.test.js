import React from "react"
import { render, act, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { UserContext } from "../context/UserContext.js";
import {  Router } from "react-router-dom"
import { createMemoryHistory } from "history";
import Navigation from "../components/Navigation"

describe("<Navigation/>", () => {

  const history = createMemoryHistory();
  history.push = jest.fn(); 

  describe("when not authenticated", () => {

    beforeEach( async () => {
      await act( async () => {
        render(
          <Router history={history}>
            <UserContext.Provider value={{user: false}}>
              <Navigation/>
            </UserContext.Provider>
          </Router>
        )
      }); 
    });

    it("Link to /sign-in present", () => {
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it("sign in link routes to sign-in route", () => {
      userEvent.click(screen.getByText(/sign in/i)); 
      expect(history.push).toHaveBeenCalledWith("/sign-in"); 
    });

  });

  describe("when authenticated", () => {

    beforeEach( async () => {
      await act( async () => {
        render(
          <Router history={history}>
            <UserContext.Provider value={{user: true}}>
              <Navigation/>
            </UserContext.Provider>
          </Router>
        )
      }); 
    });

    it("Link to /orders present", () => {
      expect(screen.getByText(/orders/i)).toBeInTheDocument();
    });

    it("orders link routes to orders route", () => {
      userEvent.click(screen.getByText(/orders/i)); 
      expect(history.push).toHaveBeenCalledWith("/orders"); 
    });

    it("Link to /analytics present", () => {
      expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    });

    it("analytics link routes to analytics route", () => { 
      userEvent.click(screen.getByText(/analytics/i)); 
      expect(history.push).toHaveBeenCalledWith("/analytics"); 
    })

    it("Account tab present", () => {
      expect(screen.getByText(/account/i)).toBeInTheDocument();
    });

    // todo test hover dropdown, click sign-out, button works, mock that func. ... 
  });

});