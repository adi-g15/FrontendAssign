// file to get filters from the server
// since it's already given in our case, currently only using a offline file itself for the filters

import Operations from "../supported.json";

export function fetchOperations(): Promise<Operation[]> {

	return new Promise((resolve) => {

		// @future - Can be fetched from hitting an API
		resolve(Operations);
	});
}
