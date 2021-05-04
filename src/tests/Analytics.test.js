import React from "react"
import { render, act, screen } from '@testing-library/react'
import { UserContextProvider } from "../context/UserContext.js"
import { mock_archived_orders, today_archived } from "../tempData"
import userEvent from "@testing-library/user-event"
import DailyInfo  from "../components/Sales/DailyInfo"
import PopularStatus  from "../components/Sales/PopularStatus"
import DailySalesReport from "../components/Sales/DailySalesReport"
import MonthlyReport from "../components/Sales/MonthlyReport"


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


describe("<PopularStatus/>", () => {

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <PopularStatus data={today_archived}></PopularStatus>
        </UserContextProvider>
      )
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });

  it("displays correct top three items", () => {

     expect(screen.getByText("Big Kahuna Burger")).toBeInTheDocument();
     expect(screen.getByText("Chicken Sandwhich")).toBeInTheDocument();
     expect(screen.getByText("tea")).toBeInTheDocument();
  });

});

describe("<DailySalesReport/>", () => {

  const dailyTempData2 = {
    month:4,
    data:{
        1:100,
        2:321,
        3:543,
        5:123,
        6:340,
        7:124,
        8:123,
        9:321,
        10:432,
        11:412,
    }
}

  const arr = [dailyTempData2];

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <DailySalesReport theDataArray={arr}></DailySalesReport>
        </UserContextProvider>
      )
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });

  // will fail
  it("status button displays boxplot chart", async () => {

    await act( async () =>  userEvent.click(screen.getByRole("button", { name: /status/i })));
    expect(screen.getByText("average sales")).toBeInTheDocument();
  });


});

describe("<MonthlyReport/>", () => {

  const monthlyTempData = {
    year:2020,
    data:{Jan:1000,
        Feb:800,
        Mar:500,
        Apr:950,
        May:2000,
        Jun:2500,
        Jul:2300,
        Aug:0,
        Sep:0,
        Oct:0,
        Nov:0,
        Dec:0}
}

  const arr = [monthlyTempData];

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <MonthlyReport theDataArray={arr}></MonthlyReport>
        </UserContextProvider>
      )
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });

  // will fail 
  it("line button displays line graph", async () => {

    await act( async () =>  userEvent.click(screen.getByRole("button", { name: /line/i })));
    expect(screen.getByText("May")).toBeInTheDocument();
  });


  // will fail 
  it("status button displays box plot", async () => {

    await act( async () =>  userEvent.click(screen.getByRole("button", { name: /status/i })));
    expect(screen.getByText("May")).toBeInTheDocument();
  });

});