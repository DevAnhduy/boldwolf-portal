import api from '../../api/index.api';
import AboutTypes from './about.types';

export const onGetAllAbout = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.aboutApi.getAllAbout({ token })
            dispatch({
                type: AboutTypes.GET_ALL,
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

export const onGetAboutDetailByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.aboutApi.getDetail({ token, data }, type)

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

export const onCreateAboutByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.aboutApi.add({ token, data }, type)
            dispatch({
                type: AboutTypes.ADD_ABOUT,
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

export const onUpdateAboutByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.aboutApi.update({ token, data }, type)
            // console.log("rs: ", result)
            dispatch({
                type: AboutTypes.UPDATE_ABOUT,
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

export const onDeleteAboutByType = (payload, type) => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            await api.aboutApi.remove({ token, data }, type)
            // console.log("rs: ", result)
            dispatch({
                type: AboutTypes.DELETE_ABOUT,
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