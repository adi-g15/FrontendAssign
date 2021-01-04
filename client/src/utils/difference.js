/**
 * @note - Both arguments are actually of different types, but both ideally will be having a `name` argument, that determines their uniqueness
 * 		   Also, when a operation has multiple supported con, then the operation will have more possibilities
 * 
 * @param {Array[Operations]} allOperations -
 * 
 * @param {Array[Filters]} usedFilters 
 * 
 * @returns {Array[Operations]} - Operations that can still be used
 * 								  Also the operator 'opr' in these objects are only the delta ones
 */
export function getUnusedOperations( allOperations, usedFilters ) {
	console.log("Got here with, ", allOperations, usedFilters);
	if( !Array.isArray(allOperations) || !Array.isArray(usedFilters) ) {
		return allOperations;
	}

	// `type checking`... could have used typescript, but already far in the assignment, kaun dependency badhaye ab ;(
	if(
		!allOperations.every(operation => (operation.name && Array.isArray(operation.opr)))
		|| !usedFilters.every(filter => (filter.name && Array.isArray(filter.opr))) 
	){
		return allOperations;
	}
	// for (const operation of allOperations)
	// 	if( !operation.name || !Array.isArray(operation.opr) || !operation.type )
	// 		return [];
	// for (const filter of usedFilters)
	// 	if( !filter.name || !filter.opr )
	// 		return [];

	console.log("Got here");
	return [...allOperations].filter((operation) => {
		// considering that usedFilter has only a SUBSET of supported operations `names`, and no name is other than this

		for (const filter of usedFilters) {
			if( filter.name === operation.name ) {
				operation.opr.splice( operation.opr.findIndex(filter.opr) );
			}
		}

		return operation.opr.length !== 0;
	});
}
