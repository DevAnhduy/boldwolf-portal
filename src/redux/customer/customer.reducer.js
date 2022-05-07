// eslint-disable-next-line no-unused-vars
import CustomerTypes from "./customer.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null,
    currentCustomer: null,
};

const CustomerReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case CustomerTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case CustomerTypes.GET_DETAIL_SUCCESS:
            return {
                ...state,
                currentTour: { ...payload}
            }
        case CustomerTypes.ADD:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case CustomerTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case CustomerTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
                }
        default:
            return state;
    }
};

export default CustomerReducer;
