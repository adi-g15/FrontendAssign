import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import FilterField from "./filterField";
import { fetchOperations } from "../utils/filters";
import { getUnusedOperations as getUnusedOper } from '../utils/difference';
import "../styles/filter.css";

function Filters(props) {
	const {filters, setFilters} = props;

	const [lastFilterEmpty, toggleEmpty] = useState(false);	// signifies whether the last filter added is empty/not yet full
	const [spareOper, setSpareOper] = useState([]);	// operations that still can be used

	const ALL_OPERATIONS = [];

	useEffect(() => {
		fetchOperations()
			.then(docs => ALL_OPERATIONS.push(...docs));
	});

	async function addEmptyField() {
		
		setSpareOper( getUnusedOper( await fetchOperations(), filters) );	// update the usable operations list
		setFilters([...filters, {name: null}]);	// if name is null, then FilterField knows it's the newest one

		toggleEmpty(true);
	}

	/**
	 * @param {number} index - Index of filter to remove
	 */
	function removeFilter(index) {
		if(index < 0 || index > filters.length)	return;	// just ignore wrong index

		let newFilters = [...filters];
		newFilters.splice(index, 1);

		setFilters(newFilters);
		if(newFilters.length === index)	lastFieldHandler();	// the removed filter was the last one
	}

	/**
	 * @note - Will be triggered ONLY by the last field, after a NAME 'and' OPERATOR has been chosen
	 * @note - lastFieldHandler will actually be used ONLY by the last one
	 */
	function lastFieldHandler() {
		toggleEmpty(false);

		console.debug("Called last field");
	}

	return (
		<>
			<div className="all_filter">
				{
					filters.map((filter, index) => (
						<FilterField
							filter={filter}
							spare_operations={spareOper}
							ALL_OPERATIONS={ALL_OPERATIONS}
							index={index}
							key={index}	/**Since say you removed the last-1th component, but still when last component takes its place */
							lastFieldHandler={lastFieldHandler}
							removeFilter={removeFilter}
							toggleFilter={props.toggleFilter}
						/>
					))
				}
			</div>
			<button
				className="add_filter_btn"
				disabled={lastFilterEmpty}
				onClick={addEmptyField}
			>
				➕ Add Filter
			</button>
		</>
	);
}

Filters.propTypes = {
	filters: PropTypes.arrayOf( PropTypes.shape({
		name: PropTypes.string,
		opr: PropTypes.string,
		val: PropTypes.string,
		key_name: PropTypes.string
	})).isRequired,
	setFilters: PropTypes.func.isRequired,
	toggleFilter: PropTypes.func.isRequired
};

export default Filters;