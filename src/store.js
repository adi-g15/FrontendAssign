import { createStore } from "redux";
import appReducers from "./reducers";   // './reducers/index.js'
import { composeWithDevTools } from "redux-devtools-extension";

// eslint-disable-next-line no-undef
const storeEnhancers = process.env.NODE_ENV === "development" ? 
	composeWithDevTools(): null;

export default createStore(appReducers, storeEnhancers);
