import api from '../../api/index.api';
import GlampingTypes from './glamping.types';

export const onGetAllGlamping = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.glampingApi.getAll({ token })
            dispatch({
                type: GlampingTypes.GET_ALL,
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

export const onUpdateGlamping = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.glampingApi.update({ data,token })
            dispatch({
                type: GlampingTypes.UPDATE,
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

export const onGetInfoGlamping = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.glampingInfoApi.getAll({ token })
            dispatch({
                type: GlampingTypes.GET_INFO,
                payload: result[0]
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

export const onUpdateInfoGlamping = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.glampingInfoApi.update({ data,token })
            dispatch({
                type: GlampingTypes.UPDATE_INFO,
                payload: result.data[0]
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