import { combineReducers } from "redux";
import { isLoggedInReducer } from "./isLoggedIn";
import { searchFilterReducers } from "./searchfilter";
const reducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    filters: searchFilterReducers
});
export default reducers;