import { React } from "react"
import { Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import Navigation from './Navigation';


/**
 * 
 * Component for creating the navigation bar and links
 * @component
 * 
 * @param {*} user - The user object that is returned from Firebase
 *  
 */

const Header = (auth) => {
  // Just a testing flag to view different navigation states
  // Will remove once the app is connected to firebase auth
  const loggedIn = false;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/foodbite-logo-2.svg"
            width="180"
            alt="Foodbite logo"
          />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

        <Navigation loggedIn={loggedIn} />

      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;