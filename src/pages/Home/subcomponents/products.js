import React from 'react';
import {Fade} from 'react-reveal';
import {Link} from 'react-router-dom';
import {Box, List, ListItem} from '@material-ui/core';
import {Container, Row, Col} from 'react-bootstrap';

class Products extends React.Component {
  render() {
    return (
      <>
        <div class="products">
          <Container>
            <Row style={{textAlign: "center"}}>
              <Col xs={12}>
                <Box display={{ xs: 'block', md: 'none' }}><h3>Products</h3></Box>
                <Box display={{ xs: 'none', md: 'block' }}><h1>Products</h1></Box>
              </Col>
            </Row>
            <hr/>

            {/* Product list so the user can click on a product 
            and he will get redirected to the appropriate page */}
            <List>
              {/* Vortex */}
              <Fade left delay={250}>
                <ListItem button component={Link} to="/products/clothingbot/">
                  <Row>
                    <Col md={5} lg={5} xl={4}>
                      <Box display={{ xs: 'block', md: 'none' }}><img alt="Vortex" src="/images/vortex_preview/1.png" height="115"/></Box>
                      <Box display={{ xs: 'none', md: 'block' }}><img alt="Vortex" src="/images/vortex_preview/1.png" height="150"/></Box>
                    </Col>
                    <Col md={7} lg={7} xl={8}>
                      <h2>Clothing Bot</h2>
                      <p>Vortex Clothing Bot is a tool that helps you earn robux by mass uploading shirts, t-shirts and pants into all of your groups. With automatic payouts, statistics of your earnings, automated asset downloads & uploads and a highly efficient Captcha Bypass system, you can leave Vortex running constantly without having to worry about running into problems</p>
                    </Col>
                  </Row>
                </ListItem>
              </Fade>
              {/* Titan */}
              <Fade left delay={500}>
                <ListItem button component={Link} to="/products/clothingbot/">
                  <Row>
                    <Col md={5} lg={5} xl={4}>
                      <Box display={{ xs: 'block', md: 'none' }}><img alt="Titan" src="/images/titan_preview/1.png" width="275"/></Box>
                      <Box display={{ xs: 'none', md: 'block' }}><img alt="Titan" src="/images/titan_preview/1.png" width="356"/></Box>
                    </Col>
                    <Col md={7} lg={7} xl={8}>
                      <h2>Titan</h2>
                      <p>Titan is a program that checks the Roblox catalog rapidly to buy limiteds that are priced significantly lower than their usual price. Being lightweight, you can check a lot of limiteds at the same time to get more out of sniping limiteds.</p>
                    </Col>
                  </Row>
                </ListItem>
              </Fade>
            </List>
          </Container>
        </div>
      </>
    );
  }
}

export default Products;
