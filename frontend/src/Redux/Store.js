import { createStore, combineReducers } from "redux";
import data from "./Reducers/Test"

export default createStore(
    combineReducers({
        data
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);