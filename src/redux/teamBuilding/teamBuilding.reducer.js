// eslint-disable-next-line no-unused-vars
import TeamBuildingTypes from "./teamBuilding.types";
import { updateDataInArr, deleteDataInArr, addDataInArr } from "../../utils/function.utils";

const INITIAL_STATE = {
    data: null,
    currentTeamBuilding: null,
    currentStep: 0,
};

const TeamBuildingReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case TeamBuildingTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case TeamBuildingTypes.GET_DETAIL_SUCCESS:
            return {
                ...state,
                currentTeamBuilding: { ...payload}
            }
        case TeamBuildingTypes.ADD:
            return {
                ...state,
                currentTeamBuilding: { ...payload },
                data: addDataInArr(state.data, payload)
            }
        case TeamBuildingTypes.UPDATE:
            return {
                ...state,
                data: updateDataInArr(state.data, payload),
            }
        case TeamBuildingTypes.UPDATE_UNSAVE:
            if (state.currentTeamBuilding) {
                return {
                    ...state,
                    currentTeamBuilding: {...state.currentTeamBuilding, ...payload}
                }
            }
            return {...state, currentTeamBuilding: {...payload}}
        case TeamBuildingTypes.DELETE_UNSAVE:
            return {
                ...state,
                currentStep: 0,
                currentTeamBuilding: null,
            }
        
        case TeamBuildingTypes.DELETE:
            return {
                ...state,
                data: deleteDataInArr(state.data, payload),
            }

        case TeamBuildingTypes.UPDATE_CURRENT_STEP:
            return {
                ...state,
                currentStep: payload,
            }

        default:
            return state;
    }
};

export default TeamBuildingReducer;
