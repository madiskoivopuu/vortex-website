import React from 'react';
import ReactSpoiler from "react-spoiler";

class Whitelist extends React.Component {
	constructor(props) {
		super();

		this.state = {
			showPassword: false,
		}
	}

	formatWhitelistDate = date => {
		if(date > 2000000000000) return "Never";
		
		date = new Date(date);
		return <>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()} {date < Date.now() ? <a href="#!" onClick={() => this.props.showPurchaseModal("renew", this.props.whitelist.whitelistName)}>(Renew)</a> : ""}</>;
	}

	render() {
		var whitelist = this.props.whitelist;

		var bgColor = {
			backgroundColor: whitelist.expires > Date.now() ? "rgba(0, 255, 0, 0.05)" : "rgba(255, 0, 0, 0.05)",
			margin: "5px",
			borderRadius: "20px"
		}

		return(
			<>
				<tr>
					<td>{whitelist.whitelistName}</td>
					<td><ReactSpoiler>{whitelist.whitelistPassword}</ReactSpoiler></td>
					<td>{this.formatWhitelistDate(whitelist.expires)}</td>
					<td>{whitelist.templateChanger ? "Enabled" : "Disabled"}</td>
					<td>{whitelist.templateChanger ? "Enabled" : "Disabled"}</td>
					<td></td>
				</tr>
			</>
		);
	}
}

export default Whitelist;