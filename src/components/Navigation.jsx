import { React, Fragment, useContext, useState } from "react";
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Redirect } from 'react-router-dom';


const Navigation = () => {
  const [redirect, setRedirect] = useState(false);
  const { restaurant, sign_out } = useContext(UserContext);

  const handleSignOut = () => {
    sign_out()
      .then(() => {
        setRedirect(true);
      })
      .catch(err => {
        console.log('err signing out')
      });

  };

  return (
    <Nav className="ml-auto">
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <Fragment />
      )}

      {restaurant ? (
        <Fragment>
          <Link className="nav-link" to="/orders">Orders</Link>

          <NavDropdown alignRight title="Account" id="basic-nav-dropdown">
            <Link className="dropdown-item" onClick={handleSignOut} to="/">Settings</Link>
            <Link className="dropdown-item" onClick={handleSignOut} to="/">Restaruant Management</Link>

            <NavDropdown.Divider />
            <Link className="dropdown-item" onClick={handleSignOut} to="/">Sign Out</Link>

          </NavDropdown>
        </Fragment>
      ) : (
        <Link className="nav-link" to="/sign-in">Sign in</Link>
      )}
    </Nav>
  )
}

export default Navigation;