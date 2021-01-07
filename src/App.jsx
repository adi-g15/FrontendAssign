import React, { useState } from 'react';
import Filters from "./components/filters";
import DataTable from './components/datatable';
import "./styles/global.css";

export default function App() {
	const [filters, setFilters] = useState([]);
	const [shouldFilter, setShouldFilter] = useState(false);	// doesn't matter what value, just that it must change when filters modified

	function toggleFilter() {
		console.debug("Toggling");
		setShouldFilter(shouldFilter => !shouldFilter);
	}

	return (
		<>
			<Filters filters={filters} setFilters={setFilters} toggleFilter={toggleFilter} />
			<hr className="separation" />
			<DataTable filters={filters} shouldFilter={shouldFilter} />
		</>
	);
}
