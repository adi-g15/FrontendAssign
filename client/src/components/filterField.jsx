import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/filter.css";

function FilterField(props) {
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
		let linkedOperation = props.operations.find(operation => operation.name === e.target.value);
		if( !linkedOperation ) return;

		props.filter.name = e.target.value;
		props.filter.key_name = linkedOperation.key_name;
		props.filter.opr = linkedOperation.opr[0];

		setName(e.target.value);
		setLink(linkedOperation);
		setOperator(linkedOperation.opr[0]);
	}

	function modifyOperator(e) {
		props.filter.opr = e.target.value || e.target.checked;
		// console.debug("Changed opr - ", isLast, e.target.value, val);
		if(isLast && e.target.value && val) {
			props.lastFieldHandler();
			toggleIsLast(null);
		}

		setOperator(e.target.value);
	}

	function handleValueChange(e) {
		props.filter.val = e.target.value;
		// console.debug("Changed value - ", isLast, operator, e.target.value);
		if(isLast && e.target.value && operator) {
			props.lastFieldHandler();
			toggleIsLast(null);
		}

		setValue(e.target.value);
		props.toggleRender();
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
				{/* <input list={`operators_${props.index}`}/> */}
				<select value={operator} onChange={modifyOperator} className="key_name">
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
							<input type="text" value={val} onChange={handleValueChange} />
						) : (
							linkedOperation.type === 'number' ? (
								<input type="number" value={val}  onChange={handleValueChange} />
							) : (
								<>
									<input list={`bools_${props.index}`} onChange={handleValueChange} />
									<datalist id={`bools_${props.index}`}>
										<option>True</option>
										<option>False</option>
									</datalist>
								</>
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

FilterField.propTypes = {
	filter: PropTypes.shape({
		name: PropTypes.string,
		opr: PropTypes.string,
		val: PropTypes.string,
		key_name: PropTypes.string
	}),
	lastFieldHandler: PropTypes.func,
	operations: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		opr: PropTypes.arrayOf(PropTypes.string).isRequired,
		type: PropTypes.string.isRequired,
		key_name: PropTypes.string
	})).isRequired,
	index: PropTypes.number.isRequired,
	removeFilter: PropTypes.func.isRequired,
	toggleRender: PropTypes.func.isRequired
};

export default FilterField;
