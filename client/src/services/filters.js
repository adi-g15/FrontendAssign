// file to get filters from the server
// since it's already given in our case, currently only using a offline file itself for the filters

import Operations from "../supported.json";

export function fetchOperations() {

	return new Promise((resolve, reject) => {

		// @future - Can be fetched from hitting an API
		resolve(Operations);
	});
}
