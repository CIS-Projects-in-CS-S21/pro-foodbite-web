import React from "react"
import { render, act, screen, getByText, prettyDOM,  } from '@testing-library/react'
import { UserContextProvider } from "../context/UserContext.js"
import userEvent from "@testing-library/user-event"
import { mock_pending_orders, mock_archived_orders } from "../tempData"
import OrdersHeader from "../components/Orders/OrdersHeader"
import PendingOrders from "../components/Orders/PendingOrders"
import ViewHistory from "../components/OrderPageElement/ViewHistory"
import SelectOrderDetail from "../components/OrderPageElement/SelectOrderDetail"

describe("<OrdersHeader/>", () => {

  let container; 

  const accepting = jest.fn();
  const history = jest.fn();

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <OrdersHeader  accepting={accepting} history={history} count={8} status={true}/>
        </UserContextProvider>
      , container)
    }); 
  });

  it("renders without error", () => {
    expect.anything(); 
  });


  it("accepting orders button clicked calls correct function", () => {

    userEvent.click(screen.getByText("accepting orders"));
    expect(accepting).toHaveBeenCalledTimes(1); 
  });

  it("view history button clicked calls correct function", () => {

    userEvent.click(screen.getByText("View Order History"));
    expect(history).toHaveBeenCalledTimes(1); 
  });

}); 


describe("<PendingOrders/>", () => {

  const view_selected_handler = jest.fn();
  let container; 

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <PendingOrders orders={mock_pending_orders} view={view_selected_handler} />
        </UserContextProvider>
      , container)
    }); 
  });


  it("renders without error", () => {
    expect.anything(); 
  });

  it("displays correct shortned name", () => {

    let name_short = screen.getByText("JOHN CASS..."); 
    expect(name_short).toBeInTheDocument();
  });

  // it("click specific orders, handler is called with correct oder", () => {

  //   let order = mock_pending_orders[0]; 

  //   userEvent.click(screen.getByText("RUSTIN CO..."), );
  //   expect(view_selected_handler).toHaveBeenCalledWith(order); 
  // });

    it("view selected handler called on click", () => {

    userEvent.click(screen.getByText("RUSTIN CO..."));
    expect(view_selected_handler).toHaveBeenCalledTimes(1);
  });

}); 

describe("<ViewHistory/>", () => {

  let container; 

  let pending = [
    {
      name: "John Doe",
      status: "NEW",
      menuItems: [
        {
          name: "burger",
          price: 5.5,
          options: "no mustard"
        }
      ]
    }
  ]

  let archived = [
    {
      name: "Jane Doe",
      status: "DELIVERED",
      menuItems: [
        {
          name: "Chicken",
          price: 6.5,
          options: "no sauce"
        }
      ]
    }
  ]

  let orders = pending.concat(archived);

  let closeShow = jest.fn(); 

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <ViewHistory  orders={orders}  closeShow={closeShow} />
        </UserContextProvider>
      , container)
    }); 
  });


  it("renders without error", () => {
    expect.anything(); 
  });

  it("close button is present", async () => {

    const btn = screen.getByTestId("close-btn");
    userEvent.click(btn);
    expect(btn).toBeInTheDocument(); 
  });

  it("both collection types displayed on default", () => {

    let status = screen.getByText("NEW"); 
    expect(status).toBeInTheDocument();

    status = screen.getByText("DELIVERED"); 
    expect(status).toBeInTheDocument();
  });

});  

describe("<SelectOrderDetail/>", () => {

  let container; 

  let pending = [
    {
      name: "John Doe",
      status: "NEW",
      menuItems: [
        {
          name: "burger",
          price: 5.5,
          options: "no mustard"
        }
      ]
    }
  ]

  let archived = [
    {
      name: "Jane Doe",
      status: "DELIVERED",
      menuItems: [
        {
          name: "Chicken",
          price: 6.5,
          options: "no sauce"
        }
      ]
    }
  ]

  let orders = pending.concat(archived);

  let handler = jest.fn(); 

  beforeEach( async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <SelectOrderDetail  
          orders={orders} 
          orderInProgress={handler} 
          orderInfo={pending[0]} 
          declineOrder={handler} 
          orderOnTheWay={handler}
          />
        </UserContextProvider>
      , container)
    }); 
  });


  it("renders without error", () => {
    expect.anything(); 
  });

  it("set order in progress called on button click", async () => {

    userEvent.click(screen.getByTestId("update-status"));
    userEvent.click(screen.getByTestId("in-progress"));
    expect(handler).toHaveBeenCalledTimes(1); 
  });

  it("set order to delivered called on button click", async () => {

    userEvent.click(screen.getByText("DECLINE ORDER"));
    expect(handler).toHaveBeenCalledTimes(1); 
  });

  it("set order on the way called on button click", async () => {

    userEvent.click(screen.getByTestId("update-status"));
    userEvent.click(screen.getByText("ON THE WAY"));
    expect(handler).toHaveBeenCalledTimes(1); 
  });

}); 