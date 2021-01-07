import React from "react";
import "../styles/data.css";

interface field_props {
	name: string,
	screen_name: string,
	followers_count: number | 0,
	following_count: number | 0,
	location: string,
	verified: boolean | false
}

function DataField(props: field_props) {
	return (
		<tr className="data_field">
			<td>{props.name}</td>
			<td>{props.screen_name}</td>
			<td>{props.followers_count}</td>
			<td>{props.following_count}</td>
			<td>{props.location}</td>
			<td>{props.verified ? "True": "False"}</td>
		</tr>
	);
}

export default DataField;