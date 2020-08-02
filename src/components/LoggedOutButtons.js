import React from 'react';
import {Nav} from 'react-bootstrap';

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

class LoggedOutButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registerModal: false,
      loginModal: false,
      forgotPasswordModal: false,
    }
  }

  closeModals = () => {
    this.setState({registerModal: false, loginModal: false, forgotPasswordModal: false});
  }

  openForgotPasswordModal = () => {
    this.setState({registerModal: false, loginModal: false, forgotPasswordModal: true});
  }

  render() {
    return(
      <>
        <Nav.Link style={this.props.style} onClick={() => {this.setState({registerModal: true})}}>Register</Nav.Link>
        <Nav.Link style={this.props.style} onClick={() => {this.setState({loginModal: true})}}>Log in</Nav.Link>
        <RegisterModal open={this.state.registerModal} closeModal={this.closeModals}/>
        <LoginModal open={this.state.loginModal} closeModal={this.closeModals} openForgotPasswordModal={this.openForgotPasswordModal} login={this.props.login}/>
        <ForgotPasswordModal open={this.state.forgotPasswordModal} closeModal={this.closeModals}/>
      </>
    );
  }
}

export default LoggedOutButtons;