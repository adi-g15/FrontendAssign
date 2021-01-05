import React, { useEffect, useState } from 'react';
import FilterField from "./filterField";
import { useSelector } from "react-redux";
import { getUnusedOperations } from '../../utils/difference';
import "../../styles/filter.css";

export default function Filters(props) {
	const allOper = useSelector(state => state.opr);
	const [filters, setFilters] = useState([]); // initially empty, later use useSelector
	const [emptyFilter, toggleEmpty] = useState(false);	// signifies whether the last filter added is empty/not yet full
	const [spareOper, setSpareOper] = useState([]);	// operations that still can be used

	function addEmptyField() {
		setSpareOper( getUnusedOperations(allOper, filters) );	// update the usable operations list
		setFilters([...filters, {name: null}]);	// if name is null, then FilterField knows it's the newest one

		toggleEmpty(true);
	}

	/**
	 * @note - Will be triggered ONLY by the last field, after a NAME 'and' OPERATOR has been chosen
	 * @note - lastFieldHandler will actually be used ONLY by the last one
	 */
	function lastFieldHandler() {
		toggleEmpty(false);

		console.log("Called last field");
	}

	return (
		<>
			<div className="all_filter">
				{
					filters.map((filter, index) => (
						<FilterField filter={filter} operations={spareOper} index={index} key={index} lastFieldHandler={lastFieldHandler} />
					))
				}
			</div>
			{
				!emptyFilter && (<button
					onClick={addEmptyField}
				>
					➕ Add Filter
				</button>)

			}
		</>
	);
}
