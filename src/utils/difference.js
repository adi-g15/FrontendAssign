/**
 * 
 * @param {Array[Operations]} operationArr (const)
 * 
 * @note - Won't work in ALL cases, works for basic and current case
 * 
 * @returns copy of operations array, containing copies of previous array
 */
function deepCopy( operationArr ) {
	if( !Array.isArray(operationArr) )	return null;

	return operationArr.map(obj => ({
		...obj,
		opr: [...obj.opr]	// we also need a copy of this, since earlier, even in the copy, it was accessing the same refernce of array
	}));
}

/**
 * @note - Both arguments are actually of different types, but both ideally will be having a `name` argument, that determines their uniqueness
 * 		   Also, when a operation has multiple supported con, then the operation will have more possibilities
 * 
 * @param {Array[Operations]} allOperations (const)
 * 
 * @param {Array[Filters]} usedFilters (const)
 * 
 * @returns {Array[Operations]} - Operations that can still be used
 * 								  Also the operator 'opr' in these objects are only the delta ones
 */
export function getUnusedOperations( allOperations, usedFilters ) {
	if( !Array.isArray(allOperations) || !Array.isArray(usedFilters) ) {
		return allOperations;
	}

	// `type checking`... could have used typescript, but already far in the assignment, kaun dependency badhaye ab ;(
	if(
		!allOperations.every(operation => (operation.name && Array.isArray(operation.opr)))
		|| !usedFilters.every(filter => (filter.name && filter.opr)) 
	){
		return allOperations;
	}

	let retVal = deepCopy(allOperations).filter((operation) => {
		// considering that usedFilter has only a SUBSET of supported operations `names`, and no name is other than this

		for (const filter of usedFilters) {
			if( operation.type !== "string" && filter.name === operation.name ) {
				// console.log("Matched ", operation, [...operation.opr], filter.opr,[...operation.opr].indexOf(filter.opr));
				operation.opr.splice( operation.opr.indexOf(filter.opr), operation.opr.indexOf(filter.opr) !== -1 ? 1: 0 );
			}
		}

		return operation.opr.length !== 0;
	});

	window.opr ? window.opr.push(retVal[0]): (window.opr = []);
	return retVal;
}
