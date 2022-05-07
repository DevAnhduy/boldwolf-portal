import UserTypes from './user.types';
import api from '../../api/index.api';

export const onLogin = payload => {
    return async (dispatch) => {
        const { data, fCallBack } = payload
        try {
            const result = await api.userApi.login(data)
            dispatch({
                type: UserTypes.LOGIN,
                payload: result.data.token
            })
            if (fCallBack) {
                fCallBack(true)
            }
        }
        catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onDeleteToken = () => ({
    type: UserTypes.DELETE_TOKEN,
})

export const onLogout = () => ({
    type: UserTypes.LOGOUT,
})

export const onVerify = payload => {
    return async (dispatch) => {
        try {
            const result = await api.userApi.verify({ token: payload })
            dispatch({
                type: UserTypes.VERIFY,
                payload: result.data
            })
        }
        catch (err) {}
    }
}