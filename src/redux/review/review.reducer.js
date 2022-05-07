import ReviewTypes from "./review.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null, // []
};

const ReviewReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case ReviewTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case ReviewTypes.ADD:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case ReviewTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case ReviewTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        default:
            return state;
    }
};

export default ReviewReducer;
