import { 
    TEST
} from "../Constants/ActionTypes";

export function updateTest(payload) {
    return { 
        type: TEST, 
        payload 
    }
};