import React from 'react';
import {Table, Modal, Form, Button, Alert} from 'react-bootstrap';

import Whitelist from "./Whitelist";

const white = {
	color: "#FFFFFF"
};

class Whitelists extends React.Component {
	constructor(props) {
		super(props);

		// stuff needed for the modal
		this.state = {
			showPurchaseModal: false,
			modalErrorText: "",
			modalButtonDisabled: false,
			formValues: {},

			action: null
		}
	}

	showPurchaseModal = (type, whitelistUsername, program) => {
		this.setState({showPurchaseModal: true, action: {type: type, username: whitelistUsername, program: "ClothingBot" /* no other program rn */}});
	}
	closeModal = () => {
		this.setState({showPurchaseModal: false, action: null});
	}
	formValueChanged = (event) => {
		this.setState({formValues: {[event.target.id]: event.target.value, ...this.state.formValues}});
	}
	purchase = () => {
		
	}

	render() {
		if(!this.props.whitelists) {
			return(
				<p style={white}>Loading whitelists...</p>
			);
		}
		if(!this.props.whitelists.fetched) {
			return(
				<p style={white}>Failed to fetch your whitelists, reloading the page might help.</p>
			);
		}

		return(
			<>
				<Table bordered variant="dark">
					<thead>
						<tr>
							<th>Username</th>
							<th>Password</th>
							<th>Expires at</th>
							<th>Template changer</th>
							<th>Unlimited cookies</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.whitelists.data.map(whitelist => <Whitelist whitelist={whitelist} showPurchaseModal={this.showPurchaseModal}/>)}
					</tbody>
				</Table>

				{/* Modal for addon/renew purchase */}
				<Modal show={this.state.showPurchaseModal} onHide={this.closeModal} centered size="md" style={{color: "rgba(255,255,255,.5)"}}>
					<Modal.Header closeButton style={{backgroundColor: "#212529"}}>
						{this.props.PHRASES_FOR_ACTION[this.state.action]}
					</Modal.Header>
					<Modal.Body style={{backgroundColor: "#212529"}}>
						<Alert variant={this.state.modalErrorText} style={{ display: (this.state.modalErrorText === "" ? "none" : "block") }}>
							{this.state.modalErrorText}
						</Alert>

						<Form>
							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control disabled type="text" value={this.state.action && this.state.action.username}/>
							</Form.Group>
							<Form.Group controlId="paymentMethod">
								<Form.Label>Payment Method</Form.Label>
								<Form.Control as="select" custom onChange={this.formValueChanged}>
									{this.props.PAYMENT_METHODS.map(method => {
										return(
											<option value={method}>{method}</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Form>
						<Button block variant="success" type="submit" onClick={this.state.modalButtonDisabled ? null : this.purchase} disabled={this.state.modalButtonDisabled}>
							Purchase ({this.state.action && this.props.PRICES[this.state.action.program][this.state.action.type]}$)
						</Button>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default Whitelists;