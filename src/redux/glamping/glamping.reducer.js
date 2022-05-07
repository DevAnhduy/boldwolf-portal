// eslint-disable-next-line no-unused-vars
import GlampingTypes from "./glamping.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null,
    info:null
};

const GlampingReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case GlampingTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case GlampingTypes.GET_INFO:
            return {
                ...state,
                info: payload
            }
        case GlampingTypes.ADD:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case GlampingTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case GlampingTypes.UPDATE_INFO:
            return {
                ...state,
                info: payload,
            }
        case GlampingTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
                }
        default:
            return state;
    }
};

export default GlampingReducer;
