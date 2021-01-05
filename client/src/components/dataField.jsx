import React from "react";
import PropTypes from "prop-types";
import "../styles/data.css";

function DataField(props) {
	return (
		<tr className="data_field">
			<td>{props.name}</td>
			<td>{props.screen_name}</td>
			<td>{props.followers_count}</td>
			<td>{props.following_count}</td>
			<td>{props.location}</td>
			<td>{props.verified}</td>
		</tr>
	);
}

DataField.propTypes = {
	name: PropTypes.string.isRequired,
	screen_name: PropTypes.string.isRequired,
	followers_count: PropTypes.number,
	following_count: PropTypes.number,
	location: PropTypes.string.isRequired,
	verified: PropTypes.oneOf(["True", "False"])
};

export default DataField;