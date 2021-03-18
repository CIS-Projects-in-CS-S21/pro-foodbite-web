import React from "react"
import { render, act, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import { UserContextProvider } from "../context/UserContext.js";


describe("<SignIn/>", () => {
  it("renders without error", async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <SignIn></SignIn>
        </UserContextProvider>
      )
    })
  });
});

describe("<SignUp/>", () => {
  it("renders without error", async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <SignUp></SignUp>
        </UserContextProvider>
      )
    })
  });
});

window.alert = jest.fn();

// took forver to figure this out ...
describe("onSubmit <SignIn />", () => {
  it("sign in with email and password method called on button click with correct args", async () => {
  
  const handle_submit = jest.fn( () => Promise.resolve(true)); // mock onSubmit (firebase call)
  //const handle_submit = ms => new Promise(r => setTimeout(r, ms))
  window.alert.mockClear();  

    await act( async () => {
      render(
        <UserContextProvider>
          <SignIn onSubmit={handle_submit} />
        </UserContextProvider>
      )
    }); 

    // write text inside inputs to pass validation, click submit button 
    userEvent.type(screen.getByLabelText(/email/i), "foodbite@grr.la");
    userEvent.type(screen.getByLabelText(/password/i), "foodbite21");
    userEvent.click(screen.getByRole("button", { name: /sign in/i })); 

    await waitFor( () => {
    // expect(handle_submit).toHaveBeenCalledTimes(1);
     expect(handle_submit).toHaveBeenCalledWith({
       email: "foodbite@grr.la",
       password: "foodbite21"
     })
    }); 

  });
});



// redirect to home after succesful authentication

// test for sign-in validation (expect ...text ... ("required").toBeVisible())

// bunch more ... 