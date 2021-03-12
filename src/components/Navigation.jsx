import { React, Fragment, useContext } from "react";
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Navigation = () => {
  const { auth } = useContext(UserContext);

  return (
    <Nav >
      {auth ? (
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