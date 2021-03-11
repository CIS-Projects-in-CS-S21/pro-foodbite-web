import { React, Fragment } from "react";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Navigation = (loggedIn) => {
  return (
    <Nav >
      {loggedIn ? (
        <Fragment>
          <Link className="nav-link" to="/orders">Orders</Link>
          <Link className="nav-link" to="/account">Account</Link>
        </Fragment>
      ) : (
        <Link className="nav-link" to="/sign-in">Sign in</Link>
      )}
    </Nav>
  )
}

export default Navigation;