import SafeTypes from "./safety.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null, // []
};

const SafetyReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case SafeTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case SafeTypes.ADD_SAFE:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case SafeTypes.UPDATE_SAFE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case SafeTypes.DELETE_SAFE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        default:
            return state;
    }
};

export default SafetyReducer;
