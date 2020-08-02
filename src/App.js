import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PulseLoader} from 'react-spinners';
import axios from "axios";

import Navbar from "./components/Navbar";
// Pages
import HomePage from "./pages/Home/home";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import WhitelistsAndOrders from "./pages/WhitelistsAndOrders/WhitelistsAndOrders";

const PAYMENT_METHODS = ["Bitcoin", "Ethereum"];
const PRICES = {
  ClothingBot: {
    month: 20,
    renew: 20,
    lifetime: 120,
    templatechanger: 10,
    unlimitedcookies: 60
  }
}
const ENDPOINTS_FOR_PROGRAMS = {
  ClothingBot: {
    month: "/api/purchase_clothingbot",
    lifetime: "/api/purchase_clothingbot",
    renew: "/api/renew_clothingbot",
    templatechanger: "/api/purchase_addon",
    unlimitedcookies: "/api/purchase_addon"
  }
}
const PHRASES_FOR_ACTION = {
  ClothingBot: {
    renew: "Renew whitelist",
    templatechanger: "Purchase template changer",
    unlimitedcookies: "Purchase unlimited cookies"
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      loggedIn: false,
      user: {}
    }
  }

  // Check user's token || get user info
  getTokenInfo = () => {
    var token = localStorage.getItem("loginToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.post("https://vortex-b.xyz/api/checktoken").then((response) => {
      if(response.data.status === 0)
      {
        this.setState({loading: false});
      }
      else
      {
        this.setState({loading: false, loggedIn: true, user: {...response.data}});
      }
    }).catch((error) => {
      this.setState({loading: false});
    })
  }

  // Log the user out and update state
  logout = () => {
    localStorage.removeItem("loginToken");
    this.setState({loggedIn: false});
  }

  login = (data) => {
    localStorage.setItem('loginToken', data.message);
    this.getTokenInfo();
  }

  componentDidMount() {
    this.getTokenInfo();
  }

  render() {
    if(this.state.loading) {
      return(
        <>
          <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: "#FFFFFF", textAlign: "center"}}>
            <PulseLoader margin={5} color="#FFFFFF"/>
          </div>
        </>
      );
    }

    return (
      <>
        <BrowserRouter>
          <Navbar mainProps={this.state} logout={this.logout} login={this.login}/>
          <Switch>
            <Route path="/" render={(renderProps) => (<HomePage {...renderProps} mainProps={this.state} />)} exact/>
            <Route path="/whitelists" render={(renderProps) => (<WhitelistsAndOrders {...renderProps} PRICES={PRICES} PAYMENT_METHODS={PAYMENT_METHODS} PHRASES_FOR_ACTION={PHRASES_FOR_ACTION} ENDPOINTS_FOR_PROGRAMS={ENDPOINTS_FOR_PROGRAMS}/>)} exact/>
            <Route path="/reset_password" component={ResetPassword} />
          </Switch>

        </BrowserRouter>
      </>
    );
  }
}

export default App;
