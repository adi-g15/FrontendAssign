import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import DataField from "./dataField";
import "../styles/data.css";
import { fetchProfiles } from '../services/profiles';
import { CONTAINS, EQUALS, GTE, LTE } from '../constants/opTypes';

function DataTable(props) {
	const [profiles, setProfiles] = useState([]);
	const [noResult, toggleNoResult] = useState(false);
	const [loading, toggleLoading] = useState(true);
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		fetchProfiles()
			.then(profiles => {
				setProfiles(profiles);
			})
			.catch(err => {
				alert(err.msg || "It seems there is a problem with connectivity");
			})
			.finally(() => toggleLoading(false));
	}, []);

	useEffect(() => {
		console.log(!loading ? "Going to filter": null);
		// filter profiles only when data loaded, this effect only runs when either props.filters changes, or loading is started/completed
		!loading && filterProfiles(profiles, props.filters);
	}, [loading, props.filters, props.shouldUpdate]);

	function filterProfiles(profiles, filters) {
		let newFiltered = profiles.filter(profile => {

			// will be chosen only if passes EVERY filter
			return filters.every(filter => {
				switch (filter.opr) {
				case CONTAINS:
					console.log(`Checking if ${profile[filter.key_name]} contains ${filter.val}`, RegExp(`/${filter.val}/i`).test(profile[filter.key_name]) );
					if( !RegExp(filter.val, 'i').test(profile[filter.key_name]) ){
						console.log("Out: ", filter, profile);
						return false;
					}
					break;

				case GTE:
					if( profile[filter.key_name] < parseInt(filter.val) ){
						console.log("Out: ", filter, profile);
						return false;
					}
					break;

				case LTE:
					if( profile[filter.key_name] > parseInt(filter.val) ){
						console.log("Out: ", filter, profile);
						return false;
					}
					break;

				case EQUALS:
					if( profile[filter.key_name].toString() !== filter.val.toLowerCase() ){
						console.log("Out: ", filter, profile);
						return false;
					}
					break;
				}

				return true;
			});

		}).map((profile, index) => (
			<DataField
				name={profile.name}
				screen_name={profile.screen_name}
				followers_count={profile.followers_count}
				following_count={profile.following_count}
				location={profile.location}
				verified={profile.verified}
				key={index}
			/>
		));

		if(newFiltered.length === 0) toggleNoResult(true);
		else {
			toggleNoResult(false);
			setFiltered( newFiltered );
		}
	}

	return (
		<div className="data_table">
			{
				loading ? (
					<div className="loading centered">
						Loading...
					</div>
				): noResult ? (
					<div className="centered">
						No Result matches your filters...
					</div>
				): (
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Screen Name</th>
								<th>Followers Count</th>
								<th>Following Count</th>
								<th>Location</th>
								<th>Verified</th>
							</tr>
						</thead>
						<tbody>
							{filtered}
						</tbody>
					</table>)
			}
		</div>
	);
}

DataTable.propTypes = {
	filters: PropTypes.arrayOf( PropTypes.shape({
		name: PropTypes.string,
		opr: PropTypes.string,
		val: PropTypes.string
	})).isRequired,
	shouldUpdate: PropTypes.bool.isRequired
};

export default DataTable;
