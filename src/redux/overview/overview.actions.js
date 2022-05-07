// eslint-disable-next-line no-unused-vars
import OverviewTypes from './overview.types';
import api from '../../api/index.api';

export const onGetAllOverview= payload => {
    return async dispatch => {
        const { fCallBack, token } = payload
        try {
            const rs = await api.overviewApi.getAll({ token })
            dispatch({
                type: OverviewTypes.GET_ALL,
                payload: rs
            })
            if (fCallBack) {
                fCallBack(true, rs)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onUpdateOverview = payload => {
    return async dispatch => {
        const { fCallBack, token, data } = payload
        try {
            const rs = await api.overviewApi.update({ data, token })
            dispatch({
                type: OverviewTypes.UPDATE,
                payload: rs
            })
            if (fCallBack) {
                fCallBack(true, rs)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onAddOverview = payload => {
    return async dispatch => {
        const { fCallBack, token, data } = payload
        try {
            const rs = await api.overviewApi.add({ data, token })
            dispatch({
                type: OverviewTypes.ADD,
                payload: rs.data
            })
            if (fCallBack) {
                fCallBack(true, rs.data)
            }
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}