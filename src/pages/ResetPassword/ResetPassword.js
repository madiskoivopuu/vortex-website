import React from 'react';
import {Card, Form, Container, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

class ResetPassword extends React.Component {
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

  resetPassword = () => {
    // check if both passwords match
    if(!this.state.password || !this.state.password2) {
      return this.setState({alertText: "Both password fields can't be left empty.", alertType: "danger"});
    }
    if(this.state.password !== this.state.password2) {
      return this.setState({alertText: "Both passwords must match.", alertType: "danger"});
    }

    this.setState({buttonDisabled: true});

    // get reset_id parameter
    var url = new URL(window.location.href);
    var reset_id = url.searchParams.get("id");

    // check the username and password
    axios.post("https://vortex-b.xyz/api/reset_password/", {
      reset_id: reset_id,
      password: this.state.password
    }).then(response => {
      if(response.data.status === "success")
      {
        this.setState({alertText: "Password reset successful.", alertType: "success"});
        
        setTimeout(() => {
          this.props.history.push("/");
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
    return (
      <>
        <Container style={{display:'flex', justifyContent:'center', marginTop: "20vh"}}>
          <Card centered bg="dark" style={{color: "rgba(255,255,255,.5)", width: "24rem"}}>
            <Card.Header style={{textAlign: "center"}}>Reset your password</Card.Header>
            <Card.Body>
              <Alert variant={this.state.alertType} style={{ display: (this.state.alertText === "" ? "none" : "block") }}>
                {this.state.alertText}
              </Alert>
              <Form>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={this.formValueChanged}/>
                </Form.Group>
                <Form.Group controlId="password2">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control type="password" onChange={this.formValueChanged}/>
                </Form.Group>
              </Form>
              <Button block variant="light" type="submit" onClick={this.resetPassword}>
                Reset password
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export default ResetPassword;
