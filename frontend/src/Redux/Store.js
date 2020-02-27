import { createStore, combineReducers } from "redux";
import testStore from "./Reducers/Test"

export default createStore(
    combineReducers({
        testStore
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);