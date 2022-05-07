import AboutTypes from "./about.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null, // []
};

const AboutReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case AboutTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case AboutTypes.ADD_ABOUT:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case AboutTypes.UPDATE_ABOUT:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case AboutTypes.DELETE_ABOUT:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        default:
            return state;
    }
};

export default AboutReducer;
