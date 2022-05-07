// eslint-disable-next-line no-unused-vars
import BlogTypes from "./blog.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null,
};

const BlogReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case BlogTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case BlogTypes.ADD:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case BlogTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case BlogTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        default:
            return state;
    }
};

export default BlogReducer;
