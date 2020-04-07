import { 
    CO2, DISTANCE
} from "../Constants/ActionTypes";

const initialState = {
  co2: "",
  distance: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CO2:
            return {
                ...state,
                co2: action.payload
            }
        case DISTANCE:
            return {
                ...state,
                distance: action.payload
            }
        default:
            return state
    }
}