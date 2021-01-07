/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import "../styles/filter.css";

interface field_props {
	filter?: filter,
	lastFieldHandler: Function,
	spare_operations: {	// CONST
		name: string,
		opr: string[],
		type: string,
		key_name: string
	}[],
	ALL_OPERATIONS: operation[],
	index: number,
	removeFilter: Function,
	toggleFilter: Function
};

function FilterField(props: field_props) {
	const [name, setName] = useState( props.filter.name || '');
	const [operator, setOperator] = useState( props.filter.opr || '');
	const [val, setValue] = useState( props.filter.val || '');
	const [isLast, toggleIsLast] = useState( !!props.lastFieldHandler );

	const [linkedOperation, setLink] = useState(null);

	useEffect(() => {
		console.log(`Rendering - ${props.index} ${name}`);
		name || modifyName( props.spare_operations[0] && props.spare_operations[0].name);
	}, []);

	function modifyName(name) {
		console.debug("Name modified");
		let tmpLinkOper = props.spare_operations.find(operation => operation.name === name);	// ALL_OPERATIONS
		if( !tmpLinkOper ) return;

		tmpLinkOper = {
			...tmpLinkOper,
			spare_opr: tmpLinkOper.opr,	// reference to available operations
			opr: [...tmpLinkOper.opr]
		};	// (almost) deep copied

		console.debug("Linked opr : ", tmpLinkOper);
		props.filter.name = name;
		props.filter.key_name = tmpLinkOper.key_name;
		props.filter.opr = tmpLinkOper.opr[0];

		setName(name);
		setLink(tmpLinkOper);
		modifyOperator(tmpLinkOper.opr[0]);
		if( tmpLinkOper.type === "boolean" ) {
			modifyValue('True');
			props.lastFieldHandler();	// in case of boolean, True is automatically selected, so notify parent that lastField is filled
			toggleIsLast(null);
		} else {
			modifyValue('');
		}
	}

	function modifyOperator(value) {
		props.filter.opr = value;
		setOperator(value);
	}

	function modifyValue(value) {
		props.filter.val = value;

		setValue(value);
		if( isLast && value ) {
			props.lastFieldHandler();	// notify parent that last field has a valid value
			toggleIsLast(null);
		}
		props.toggleFilter();
	}

	return (
		<div className="field">
			<span className="input_span">
				<select value={name} onChange={e => modifyName(e.target.value)} required>
					{
						(name && props.spare_operations.every(opr => opr.name !== name) ? props.spare_operations.concat({name}): props.spare_operations).map(({name}, index) => (
							<option key={index} value={name}>{name}</option>
						))
					}
				</select>
			</span>
			<span className="input_span">
				<select value={operator} onChange={e => modifyOperator(e.target.value)} className="key_name" required>
					{
						linkedOperation && linkedOperation.opr.map((oper, index) => (
							<option key={index} value={oper}>{oper}</option>
						))
					}
				</select>
			</span>
			<span className="input_span">
				{
					linkedOperation ? (
						linkedOperation.type === 'string' ? (
							<input type="text" value={val} onChange={e => modifyValue(e.target.value)} required />
						) : (
							linkedOperation.type === 'number' ? (
								<input type="number" value={val}  onChange={e => modifyValue(e.target.value)} />
							) : (
								<select value={val} onChange={e => modifyValue(e.target.value)}>
									<option>True</option>
									<option>False</option>
								</select>
							)
						)
					): (
						<input value={val} disabled/>
					)
				}
			</span>
			<span className="input_span">
				<button className="delete_btn" onClick={() => props.removeFilter(props.index)}>
				❎
				</button>
			</span>
		</div>
	);
}

export default FilterField;
