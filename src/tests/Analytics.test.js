import React from "react"
import { render, act, screen } from '@testing-library/react'
import { UserContextProvider } from "../context/UserContext.js"
import userEvent from "@testing-library/user-event"
import DailyInfo  from "../components/Sales/DailyInfo"
import PopularStatus  from "../components/Sales/PopularStatus"

describe("<DailyInfo/>", () => {

  // mock archived orders for today
  const archived = [
    {
      status: "DELIVERED",
      menuItems: [
        {
          price: 6.50,
        },
        {
          price: 5.70
        },
      ]
    },
    {
      status: "CANCELED",
      menuItems: [
        {
          price: 2.10,
        }
      ]
    },
    {
      status: "DELIVERED",
      menuItems: [
        {
          price: 6.50,
        },
        {
          price: 3.20,
        },
        {
          price: 5.70
        },
      ]
    },
    {
      status: "COMPLETED",
      menuItems: [
        {
          price: 6.50,
        },
        {
          price: 3.20,
        },
        {
          price: 2.70
        },
      ]
    }
  ]

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <DailyInfo data={archived}></DailyInfo>
        </UserContextProvider>
      )
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });

  it("displays correct number today's orders", () => {

    const orders = screen.getByTestId("orders-length");
    expect(parseFloat(orders.textContent)).toBe(archived.length); 
  });

  it("displays correct number picked-up orders", () => {

    const orders = screen.getByTestId("completed-length");
    expect(parseFloat(orders.textContent)).toBe(1); 
  });

  it("displays correct number delivered orders", () => {

    const orders = screen.getByTestId("delivered-length");
    expect(parseFloat(orders.textContent)).toBe(2); 
  });

  it("displays correct amount for today's sales", () => {

    const orders = screen.getByTestId("today-sales");
    expect(orders.textContent).toBe("$40.00"); 
  });

  it("displays correct amount for pick-up sales", () => {

    const orders = screen.getByTestId("picked-up-sales");
    expect(orders.textContent).toBe("$12.40"); 
  });

  it("displays correct amount for delivery sales", () => {

    const orders = screen.getByTestId("delivery-sales");
    expect(orders.textContent).toBe("$27.60"); 
  });
}); 

