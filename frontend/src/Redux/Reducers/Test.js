import { 
    TEST
} from "../Constants/ActionTypes";

const initialState = {
  test: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                test: action.payload
            }
        default:
            return state
    }
}