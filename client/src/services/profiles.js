import { FETCH_ALL_USERS as FETCH_ALL_PROFILES } from "../constants/base_urls";

export function fetchProfiles() {
	return fetch(
		FETCH_ALL_PROFILES,
		{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
	).then(response => {
		if(!response.ok())	throw new Error(response.statusText);

		return response.json();
	});
}
