import React, { useState } from 'react';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Filters from './components/filters';
import DataTable from './components/datatable';

export default function App() {
	return (
		<>
			<Filters />
			<DataTable />
		</>
	);
}
