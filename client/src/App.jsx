import React, { useState } from 'react';
import NavBar from './components/navbar';
import Filters from "./components/filters";
// import Filters from './components/filters';
import DataTable from './components/datatable';
import "./styles/global.css";

export default function App() {
	const [filters, setFilters] = useState([]);

	return (
		<>
			<Filters filters={filters} setFilters={setFilters} />
			<hr className="separation" />
			<DataTable filters={filters} />
		</>
	);
}
