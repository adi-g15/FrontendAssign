import ProfileData from "../offlineProfiles.json";

/**
 * @brief - Uses the server endpoint to get the data
 * 
 * @returns 
 */
export function fetchProfiles() {
	return new Promise(resolve => resolve(ProfileData));
	// return fetch(
	// 	FETCH_ALL_PROFILES,
	// 	{
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		}
	// 	}
	// ).then(response => {
	// 	if(!response.ok())	throw new Error(response.statusText);

	// 	return response.json();
	// });
}
