import api from '../../api/index.api';
import CustomerTypes from './customer.types';

export const onGetAllCustomer = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.customerApi.getAll({ token })
            dispatch({
                type: CustomerTypes.GET_ALL,
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

export const onAddCustomer = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.customerApi.add({ data,token })
            dispatch({
                type: CustomerTypes.ADD,
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

export const onDeleteCustomer = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.customerApi.remove({ data,token })
            dispatch({
                type: CustomerTypes.DELETE,
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

export const onUpdateCustomer = payload => {
    return async (dispatch) => {
        const { token, data,fCallBack } = payload
            try {
            const result = await api.customerApi.update({ data,token })
            dispatch({
                type: CustomerTypes.UPDATE,
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