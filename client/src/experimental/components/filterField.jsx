import React, { useEffect, useState } from "react";
import "../../styles/filter.css";

export default function FilterField(props) {
	useEffect(() => {
		if(props.filter.name) {    // @todo - add to props validation
			console.log("Null it");
			props.lastFieldHandler = null;    // no need of lasstFieldHandler
		}
	}, []);

	const [name, setName] = useState( props.filter.name || '');
	const [operator, setOperator] = useState( props.filter.opr || '');
	const [val, setValue] = useState( props.filter.val || '');
	const [isLast, toggleIsLast] = useState( !!props.lastFieldHandler );

	const [linkedOperation, setLink] = useState(null);

	function modifyName(e) {
		if( !props.operations.find(operation => operation.name === e.target.value) ) return;

		props.filter.name = e.target.value;
		setName(e.target.value);
		setLink(props.operations.find(operation => operation.name === e.target.value));
	}

	function modifyOperator(e) {
		props.filter.opr = e.target.value || e.target.checked;
		if(isLast &&  val && e.target.value) {
			console.debug("here");
			props.lastFieldHandler();
			toggleIsLast(null);
		}

		setOperator(e.target.value);
	}

	function handleValueChange(e) {
		props.filter.val = e.target.value;
		if(isLast &&  val && operator) {
			console.debug("here");
			props.lastFieldHandler();
			toggleIsLast(null);
		}

		setValue(e.target.value);
	}

	return (
		<div className="field">
			<span className="input_span">
				<input list={`names_${props.index}`} value={name} onChange={modifyName} />
				<datalist id={`names_${props.index}`} className="key_name">
					{
						props.operations.map((oper, index) => (
							<option key={index} value={oper.name} />
						))
					}
				</datalist>
			</span>
			<span className="input_span">
				<input list={`operators_${props.index}`} value={operator} onChange={modifyOperator} />
				<datalist id={`operators_${props.index}`} className="key_name">
					{
						linkedOperation && linkedOperation.opr.map((oper, index) => (
							<option key={index} value={oper} />
						))
					}
				</datalist>
			</span>
			<span className="input_span">
				{
					linkedOperation ? (
						linkedOperation.type === 'string' ? (
							<input type="text" value={val} onChange={handleValueChange} />
						) : (
							linkedOperation.type === 'number' ? (
								<input type="number" value={val}  onChange={handleValueChange} />
							) : (
								<input type="checkbox" checked={val} onChange={handleValueChange} />
							)
						)
					): (
						<input type="text" value={val} disabled/>
					)
				}
			</span>
		</div>
	);
}
