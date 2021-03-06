import React from "react"
import { render, act, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { UserContextProvider } from "../context/UserContext.js";
import {  Router } from "react-router-dom"
import { createMemoryHistory } from "history"; 
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import SignInPage from "../pages/SignInPage"

describe("<SignIn/>", () => {
  it("renders without error", async () => {
    await act( async () => {
      render(
        <UserContextProvider>
          <SignIn></SignIn>
        </UserContextProvider>
      )
    });
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
    });
  });
});

window.alert = jest.fn();

// took forver to figure this out ...
describe("<SignIn /> onSubmit", () => {
  it("sign in with email and password method called on button click with correct args", async () => {
  
  const handle_submit = jest.fn( () => Promise.resolve(true)); // mock onSubmit (firebase call)
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

describe("<SignIn /> validation", () => {
  it("sign in validation should catch error required username and password fields", async () => {
  
    await act( async () => {
      render(
        <UserContextProvider>
          <SignIn />
        </UserContextProvider>
      )
    }); 

    // click submit without input values empty
    await act( async () =>  userEvent.click(screen.getByRole("button", { name: /sign in/i }))) 
    
    // both error messages should have content "Required"
    expect(screen.getByTestId("emailError").textContent).toBe("Required"); 
    expect(screen.getByTestId("passwordError").textContent).toBe("Required");

  });
});


describe("<SignIn /> sign-up", () => {
  it("no account? sign up here routes to route /sign-up", async () => {

    const history = createMemoryHistory();
    history.push = jest.fn(); // mock push function

    await act( async () => {
      render(
        <Router history={history}>
          <UserContextProvider>
            <SignInPage />
          </UserContextProvider>
        </Router>
      )
    }); 

    userEvent.click(screen.getByText("Sign Up Here"));
    expect(history.push).toHaveBeenCalledWith("/sign-up"); 
  });
});


// similar to SignIn test for onSubmit above 
describe("<SignUp /> onSubmit", () => {
  it("sign up with email and password method called on button click with correct args", async () => {
  
  const handle_submit = jest.fn( () => Promise.resolve(true)); 
  window.alert.mockClear();  

    await act( async () => {
      render(
        <UserContextProvider>
          <SignUp onSubmit={handle_submit} />
        </UserContextProvider>
      )
    }); 

    // write text inside inputs to pass validation, click submit button 
    userEvent.type(screen.getByLabelText(/email/i), "foodbite@grr.la");
    userEvent.type(screen.getByTestId("password"), "foodbite21");
    userEvent.type(screen.getByTestId("confirmPassword"), "foodbite21");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor( () => {
      expect(handle_submit).toHaveBeenCalledWith({
       email: "foodbite@grr.la",
       password: "foodbite21",
       confirmPassword: "foodbite21"
     }); 
    }); 

  });
});

describe("<SignUp /> password validation", () => {
  it("sign up validation should catch error required passwords fields don't match", async () => {
  
    await act( async () => {
      render(
        <UserContextProvider>
          <SignUp />
        </UserContextProvider>
      )
    }); 

    // don't match password and confirm password input texts 
    await act( async () =>  userEvent.type(screen.getByTestId("password"), "foodbite21")); 
    await act( async () =>  userEvent.type(screen.getByTestId("confirmPassword"), "foodbite22"));
    
    expect(screen.getByTestId("confirmPasswordError").textContent).toBe("Passwords must match");

  });
});

describe("<Signup /> cancel", () => {
  it("cancel button click routes to route /", async () => {

    const history = createMemoryHistory();
    history.push = jest.fn(); // mock push function

    await act( async () => {
      render(
        <Router history={history}>
          <UserContextProvider>
            <SignUp/>
          </UserContextProvider>
        </Router>
      )
    }); 

    await act( async () =>  userEvent.click(screen.getByRole("button", { name: /cancel/i }))) 
    expect(history.push).toHaveBeenCalledWith("/"); 
  });
});