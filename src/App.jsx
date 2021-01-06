import React, { useState } from 'react';
import Filters from "./components/filters";
// import Filters from './components/filters';
import DataTable from './components/datatable';
import "./styles/global.css";

export default function App() {
	const [filters, setFilters] = useState([]);
	const [renderFlag, setRender] = useState(false);	// doesn't matter what value, just that it must change when filters modified

	function toggleRender() {
		setRender(renderFlag => !renderFlag);
	}

	return (
		<>
			<Filters filters={filters} setFilters={setFilters} toggleRender={toggleRender} />
			<hr className="separation" />
			<DataTable filters={filters} shouldUpdate={renderFlag} />
		</>
	);
}
