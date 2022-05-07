// eslint-disable-next-line no-unused-vars
import TourTypes from "./tour.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null,
    currentTour: null,
    currentStep: 0,
};

const TourReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case TourTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case TourTypes.GET_DETAIL_SUCCESS:
            return {
                ...state,
                currentTour: { ...payload}
            }
        case TourTypes.ADD:
            return {
                ...state,
                currentTour: { ...payload },
                data: addDataInArr(state.data, payload)
            }
        case TourTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case TourTypes.UPDATE_UNSAVE:
            if (state.currentTour) {
                return {
                    ...state,
                    currentTour: {...state.currentTour, ...payload}
                }
            }
            return {...state, currentTour: {...payload}}
        case TourTypes.DELETE_UNSAVE:
            return {
                ...state,
                currentStep: 0,
                currentTour: null,
            }
       
        case TourTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        case TourTypes.UPDATE_CURRENT_STEP:
            return {
                ...state,
                currentStep: payload,
            }

        default:
            return state;
    }
};

export default TourReducer;
