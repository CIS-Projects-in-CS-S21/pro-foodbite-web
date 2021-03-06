import { React } from "react"
import { Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import Navigation from './Navigation';


/**
 * 
 * @summary Creates the top navigation bar and navigation links
 *          for the multiple routes that are used
 */

const Header = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" >
      <Navbar.Brand>
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/FoodbiteLogo.png"
            width="180"
            alt="Foodbite logo"
          />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Navigation />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;