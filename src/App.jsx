import React, { useState } from 'react';
import NavBar from "./components/navbar";
import Filters from "./components/filters";
import DataTable from './components/datatable';
import "./styles/global.css";

export default function App() {
	const [filters, setFilters] = useState([]);
	const [shouldFilter, setShouldFilter] = useState(false);	// doesn't matter what value, only that it should _change_

	function toggleFilter() {
		console.debug("Toggling");
		setShouldFilter(shouldFilter => !shouldFilter);
	}

	// <></> is a react fragement
	return (
		<>
			<NavBar />
			<Filters
				filters={filters}	// filters will be handled/modified by Filters component
				setFilters={setFilters}
				toggleFilter={toggleFilter}	// triggers DataTable component to refresh data using latest filter
			/>
			<hr className="separation" />
			<DataTable
				filters={filters}	// _Const_ - Not to be modified, only read
				shouldFilter={shouldFilter}	// when it changes App rerenders, and so does DataTable
			/>
		</>
	);
}
