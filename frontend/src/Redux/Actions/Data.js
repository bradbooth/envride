import { 
    DISTANCE, CO2
} from "../Constants/ActionTypes";

export function updateCO2(payload) {
    return { 
        type: CO2, 
        payload 
    }
};

export function updateDistance(payload) {
    return { 
        type: DISTANCE, 
        payload 
    }
};