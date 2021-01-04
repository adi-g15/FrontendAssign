import React, { useState } from 'react';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Filters from "./experimental/components/filterBoxes";
// import Filters from './components/filters';
import DataTable from './components/datatable';
import "./styles/global.css";

export default function App() {
	return (
		<>
			<Filters />
			{/* <DataTable /> */}
		</>
	);
}
