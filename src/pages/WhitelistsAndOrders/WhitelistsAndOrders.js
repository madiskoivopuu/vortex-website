import React from 'react';
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import axios from 'axios';

import "./style.css";
import Whitelists from "./subcomponents/Whitelists";

class WhitelistsAndOrders extends React.Component {
	constructor() {
		super();

		this.state = {
			whitelists: null,
			orders: null
		}
	}

	componentDidMount() {
		this.fetchWhitelists();
	}

	fetchWhitelists() {
		axios.get("https://vortex-b.xyz/api/vortex/getwhitelists").then(response => {
			if(response.data.status === "success")
			{
			  this.setState({whitelists: {fetched: true, data: response.data.message}});
			}
			else {
			  this.setState({whitelists: {fetched: false, data: response.data.message}});
			}
		}).catch(error => {
			this.setState({whitelists: {fetched: false, data: `Failed to fetch whitelists. ${error}`}});
		})
	}

	render() {
		return(
			<>
				<Tab.Container defaultActiveKey="whitelists">
					<Row style={{marginTop: "10px"}}>
						<Col sm={2}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item><Nav.Link eventKey="whitelists" className="tabbutton">Whitelists</Nav.Link></Nav.Item>
								<Nav.Item><Nav.Link eventKey="orders" className="tabbutton">Orders</Nav.Link></Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="whitelists"><Whitelists whitelists={this.state.whitelists} PRICES={this.props.PRICES} PAYMENT_METHODS={this.props.PAYMENT_METHODS} PHRASES_FOR_ACTION={this.props.PHRASES_FOR_ACTION} ENDPOINTS_FOR_PROGRAMS={this.props.ENDPOINTS_FOR_PROGRAMS}/></Tab.Pane>
								<Tab.Pane eventKey="orders"></Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</>
		);
	}
}

export default WhitelistsAndOrders;