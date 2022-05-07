// eslint-disable-next-line no-unused-vars
import HomeTypes from './home.types';
import api from '../../api/index.api';

export const onGetHomeInfo = payload => {
    return async dispatch => {
        const { fCallBack, token } = payload
        try {
            const rs = await api.homePageApi.getInfo({ token })
            dispatch({
                type: HomeTypes.GET_HOME_INFO,
                payload: rs
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

export const onUpdateHomeInfo = payload => {
    return async dispatch => {
        const { fCallBack, token, data } = payload
        try {
            const rs = await api.homePageApi.updateInfo({ data, token })
            dispatch({
                type: HomeTypes.UPDATE_HOME_INFO,
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