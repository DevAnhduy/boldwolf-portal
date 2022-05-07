import api from '../../api/index.api';
import SafeTypes from './safety.types';

export const onGetAllSafety = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.safeApi.getAllSafety({ token })
            dispatch({
                type: SafeTypes.GET_ALL,
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

export const onGetSafeDetailByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.safeApi.getDetail({ token, data }, type)

            if (fCallBack) {
                fCallBack(true, result.data)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onCreateSafeByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.safeApi.add({ token, data }, type)
            // console.log("rs: ", result)
            dispatch({
                type: SafeTypes.ADD_SAFE,
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

export const onUpdateSafeByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.safeApi.update({ token, data }, type)
            // console.log("rs: ", result)
            dispatch({
                type: SafeTypes.UPDATE_SAFE,
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

export const onDeleteSafeByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            await api.safeApi.remove({ token, data }, type)
            // console.log("rs: ", result)
            dispatch({
                type: SafeTypes.DELETE_SAFE,
                payload: { id: data }
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