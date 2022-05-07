import api from '../../api/index.api';
import TeamBuildingTypeTypes from './teamBuildingType.types';

export const onGetAllTeamBuildingType = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.TeamBuildingTypeApi.getAll({ token })
            dispatch({
                type: TeamBuildingTypeTypes.GET_ALL,
                payload: result
            })
            if (fCallBack) {
                fCallBack(true)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onUpdateTeamBuildingType = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.TeamBuildingTypeApi.update({ data,token })
            dispatch({
                type: TeamBuildingTypeTypes.UPDATE,
                payload: result.data
            })
            if (fCallBack) {
                fCallBack(true)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onAddTeamBuildingType = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.TeamBuildingTypeApi.add({ data,token })
            dispatch({
                type: TeamBuildingTypeTypes.ADD,
                payload: result.data
            })
            if (fCallBack) {
                fCallBack(true)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onDeleteTeamBuildingType = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.TeamBuildingTypeApi.remove({ data,token })
            dispatch({
                type: TeamBuildingTypeTypes.DELETE,
                payload: result.data
            })
            if (fCallBack) {
                fCallBack(true)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}