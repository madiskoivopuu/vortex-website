import React from 'react';
import {Zoom} from 'react-reveal';
import {Link} from 'react-router-dom';
import {Box} from '@material-ui/core';

import Products from "./subcomponents/products";

class Home extends React.Component {
  render() {
    return (
      <>
        {/* Logo and moto, zooms in on page load */}
        <Zoom>
          <div class="main">
            <div class="vortex-center">
              <img src="/images/vortex_logo_transparent.png" alt="logo" width="250" height="250"/>
            </div>
            <Box display={{ xs: 'block', md: 'none' }}><h5 class="white vortex-center">Vortex - Provider of Roblox bots</h5></Box>
            <Box display={{ xs: 'none', md: 'block' }}><h2 class="white vortex-center">Vortex - Provider of Roblox bots</h2></Box>
          </div>
        </Zoom>

        <div class="white-container">
          <Products />
          <hr/>
        </div>

      </>
    );
  }
}

export default Home;
