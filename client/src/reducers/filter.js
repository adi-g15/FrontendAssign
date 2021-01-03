import { ADD_FILTER, CLEAR_FILTER } from "../constants/action_types";

const initialState = [];

function FilterReducer( state = initialState, action) {
	switch (action.key) {
	case ADD_FILTER:
		break;
	case CLEAR_FILTER:

		break;
	default:
		return state;
	}
}

export default FilterReducer;
