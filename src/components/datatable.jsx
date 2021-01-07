import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import DataField from "./dataField";
import "../styles/data.css";
import { CONTAINS, EQUALS, GTE, LTE } from '../constants/opTypes';

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// fetchProfiles().then(profiles => profiles.forEach(profile => db.collection("profiles").add(profile)));
function DataTable(props) {
	const [profiles, setProfiles] = useState([]);
	const [noResult, toggleNoResult] = useState(false);
	const [loading, toggleLoading] = useState(true);
	const [filtered, setFiltered] = useState([]);
	let profileRef = db.collection("profiles");

	useEffect(() => {
		profileRef.get()
			.then(snapshot => {
				const newProfiles = [];
				snapshot.forEach(doc => newProfiles.push(doc.data()));
				setProfiles(newProfiles);
			})
			.catch(err => {
				alert(err.msg || err.message || "It seems there is a problem with connectivity");
			})
			.finally(() => toggleLoading(false));
	}, []);

	useEffect(() => {
		!loading && console.debug("Going to filter");
		// filter profiles only when data loaded, this effect only runs when either props.filters changes, or loading is started/completed
		!loading && filterProfiles(profiles, props.filters);
	}, [loading,/* props.filters,*/ props.shouldFilter]);

	function filterProfiles(profiles, filters) {
		let newFiltered = profiles.filter(profile => {

			// will be chosen only if passes EVERY filter
			return filters.every(filter => {
				switch (filter.opr) {
				case CONTAINS:
					if( !RegExp(filter.val, 'i').test(profile[filter.key_name]) ){
						return false;
					}
					break;

				case GTE:
					if( profile[filter.key_name] < parseInt(filter.val) ){
						return false;
					}
					break;

				case LTE:
					if( profile[filter.key_name] > parseInt(filter.val) ){
						return false;
					}
					break;

				case EQUALS:
					if( profile[filter.key_name].toString() !== filter.val.toLowerCase() ){
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
	shouldFilter: PropTypes.bool.isRequired
};

export default DataTable;
