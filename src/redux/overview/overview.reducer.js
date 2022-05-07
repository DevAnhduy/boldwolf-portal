import { addDataInArr, updateDataInArr } from "../../utils/function.utils";
// eslint-disable-next-line no-unused-vars
import OverviewTypes from "./overview.types";


const INITIAL_STATE = {
    data: null
};

const OverviewReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case OverviewTypes.GET_ALL:
            return {
                ...state,
                data: [...payload ]
            }
        case OverviewTypes.ADD:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case OverviewTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload)
            }
        default:
            return state;
    }
};

export default OverviewReducer;
