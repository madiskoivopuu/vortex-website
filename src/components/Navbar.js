import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import LoggedInButtons from "./LoggedInButtons";
import LoggedOutButtons from "./LoggedOutButtons";

class Navbar_ extends React.Component {
  render() {
    //console.log(this.props);
    return(
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand>
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
              <img
                alt=""
                src="/images/vortex_logo_transparent.png"
                width="45"
                height="45"
              />{' '}
              Vortex
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{marginRight: "70px"}}>
            {/* This makes the navbar next to this one appear on the right side instead of left */}
            <Nav className="mr-auto"></Nav>
            <Nav>
              <NavDropdown title="Products">
                <Link to="/products/clothingbot/" style={{textDecoration: "none"}}><NavDropdown.Item>Clothing Bot</NavDropdown.Item></Link>
                <Link to="/products/groupjoiner/" style={{textDecoration: "none"}}><NavDropdown.Item>Group Joiner</NavDropdown.Item></Link>
              </NavDropdown>
              <Nav.Link href="https://discord.gg/aHjrKCj">Discord</Nav.Link>
              
              <div style={{display: (this.props.mainProps.loggedIn ? "block" : "none")}}><LoggedInButtons mainProps={this.props.mainProps} logout={this.props.logout}/></div>
              <LoggedOutButtons login={this.props.login} style={{display: (!this.props.mainProps.loggedIn ? "block" : "none")}}/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Navbar_