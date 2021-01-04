import React, { useState } from 'react';
import { useSelector } from "react-redux";

export default function Filters(props) {
	const supportedOperations = useSelector(state => state.opr);

	return (
		<>
			<div className="all_filter">
				{
					supportedOperations.map((val,index) => (
						<div key={index}>
							{val.name}
						</div>
					))
				}
			</div>
		</>
	);
}
