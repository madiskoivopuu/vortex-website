import React from 'react';
import {NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {PersonFill} from 'react-bootstrap-icons';

class LoggedInButtons extends React.Component {
  render() {
    // render nothing so the react app doesn't crash when the user isnt logged in and loads the page
    if(!this.props.mainProps.loggedIn) return(<></>);

    const title_ = <><PersonFill/> {this.props.mainProps.user.userData.username} </>;
    return(
      <>
        <NavDropdown title={title_}>
          <Link to="/user/whitelists" style={{textDecoration: "none"}}><NavDropdown.Item>Whitelists & Orders</NavDropdown.Item></Link>
          <hr style={{margin: "0"}}/>

          {this.props.mainProps.user.isBuyer ? <Link to="/user/clothingbot/" style={{textDecoration: "none"}}><NavDropdown.Item>Clothing Bot</NavDropdown.Item></Link> : ''}

          <hr style={{margin: "0"}}/>
          <NavDropdown.Item onClick={this.props.logout}>Log out</NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }
}

export default LoggedInButtons;