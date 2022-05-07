import { addDataInArr, deleteDataInArr, updateDataInArr } from "../../utils/function.utils";
import AdventureTypes from "./adventure.types";


const INITIAL_STATE = {
    info: null, // {}
    data: null, // []
    adventureTour: null, // [],
    currentTour: null,
    currentStep: 0,
};

const AdventureReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case AdventureTypes.GET_INFO:
            return {
                ...state,
                info: { ...payload },
            }
        case AdventureTypes.UPDATE_INFO:
            return {
                ...state,
                info: { ...payload },
            }

        case AdventureTypes.GET_ALL_ADVENTURE_TYPE:
            return {
                ...state,
                data: [...payload]
            }
        case AdventureTypes.ADD_ADVENTURE_TYPE:
            return {
                ...state,
                data: addDataInArr(state.data, payload)
            }
        case AdventureTypes.UPDATE_ADVENTURE_TYPE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case AdventureTypes.DELETE_ADVENTURE_TYPE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }
        case AdventureTypes.GET_ADVENTURE_TOUR:
            return {
                ...state,
                adventureTour: [...payload]
            }
        case AdventureTypes.ADD_ADVENTURE_TOUR:
            return {
                ...state,
                currentTour: { ...payload },
                adventureTour: addDataInArr(state.adventureTour, payload)
            }
        case AdventureTypes.UPDATE_ADVENTURE_TOUR:
            return {
                ...state,
                adventureTour: updateDataInArr(state.adventureTour, payload)
            }
        case AdventureTypes.UPDATE_UNSAVE:
            if (state.currentTour) {
                return {
                    ...state,
                    currentTour: {...state.currentTour, ...payload}
                }
            }
            return {...state, currentTour: {...payload}}
        
        case AdventureTypes.DELETE_UNSAVE:
            return {
                ...state,
                currentStep: 0,
                currentTour: null,
            }
        case AdventureTypes.UPDATE_CURRENT_STEP:
            return {
                ...state,
                currentStep: payload,
            }
        
        case AdventureTypes.DELETE_ADVENTURE_TOUR:
            return {
                ...state,
                adventureTour: deleteDataInArr(state.adventureTour, payload)
            }
        case AdventureTypes.GET_DETAIL_SUCCESS:
                return {
                    ...state,
                    currentTour: { ...payload}
                }
        default:
            return state;
    }
};

export default AdventureReducer;
