import React from 'react';
import PropTypes from "prop-types";

function DataTable() {
	return (
		<>
		</>
	);
}

DataTable.propTypes = {
	filters: PropTypes.arrayOf( PropTypes.shape({
		name: PropTypes.string,
		opr: PropTypes.string,
		val: PropTypes.string
	})).isRequired
};

export default DataTable;
