import React from 'react';
import {Modal, Form, Button, Alert, Container} from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

class LoginModal extends React.Component {
  constructor() {
    super();

    this.state = this.initialState;
  }

  get initialState() {
    return {
      buttonDisabled: false,
      alertText: "",
      alertType: ""
    };
  }

  logIn = () => {
    // do checks beforehand
    if(!this.state.username) {
      return this.setState({alertText: "Username field can't be empty", alertType: "danger"});
    }

    this.setState({buttonDisabled: true});

    // check the username and password
    axios.post("https://vortex-b.xyz/api/forgot_password/", {
      username: this.state.username,
    }).then(response => {
      if(response.data.status === "success")
      {
        this.setState({alertText: "A password reset request has been sent to your email.", alertType: "success"});
        
        setTimeout(() => {
          if(this.props.open) this.props.closeModal();
          this.setState(this.initialState)
        }, 5000);
      }
      else {
        this.setState({alertText: response.data.message, alertType: "danger", buttonDisabled: false});
      }
    }).catch(error => {
      this.setState({alertText: `${error}`, alertType: "danger", buttonDisabled: false});
    })
  }

  formValueChanged = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return(
      <>
        <Modal show={this.props.open} onHide={this.props.closeModal} centered size="md" style={{color: "rgba(255,255,255,.5)"}}>
          <Modal.Body style={{backgroundColor: "#212529"}}>
            {/* A small box that shows a message when login succeeds or fails */}
            <Alert variant={this.state.alertType} style={{ display: (this.state.alertText === "" ? "none" : "block") }}>
              {this.state.alertText}
            </Alert>

            {/* Form */}
            <Form>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={this.formValueChanged}/>
              </Form.Group>
            </Form>
            <Button block variant="light" type="submit" onClick={this.state.buttonDisabled ? null : this.logIn} disabled={this.state.buttonDisabled}>
              Reset password
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default LoginModal