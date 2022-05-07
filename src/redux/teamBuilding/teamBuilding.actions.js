import api from '../../api/index.api';
import TeamBuildingTypes from './teamBuilding.types';

export const onGetAllTeamBuilding = payload => {
    return async (dispatch) => {
        const { token, fCallBack } = payload
        try {
            const result = await api.teamBuildingApi.getAll({ token })
            dispatch({
                type: TeamBuildingTypes.GET_ALL,
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

export const onGetTeamBuildingDetail = payload => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.teamBuildingApi.getDetail({ token, data })
            // console.debug("img rs: ", result)

            if (fCallBack) {
                fCallBack(true, result.data)
            }
            // get images
            const images = result.data.team_building_image.map(item => item.image)
            // const reviews = result.data.team_building_review.map(item => {
            //     const temp = item.review;
            //     delete item.review
            //     return { ...item, ...temp }
            // })
            //delete result.data.team_building_review

            dispatch({
                type: TeamBuildingTypes.GET_DETAIL_SUCCESS,
                payload: {
                    ...result.data,
                    images,
                    // reviews,
                    // location: (4) [description, description_en, longitude, latitude] 
                    // location: { description: result.data.location[0], description_en: result.data.location[1], address: result.data.location[2] }
                }
            })
        } catch (err) {
            if (fCallBack) {
                fCallBack(false, err.message)
            }
        }
    }
}

export const onCreateTeamBuilding = payload => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.teamBuildingApi.add({ token, data })

            dispatch({
                type: TeamBuildingTypes.ADD,
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

export const onUpdateTeamBuilding = payload => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            const result = await api.teamBuildingApi.update({ token, data })
            // console.debug("rs: ", result)
            dispatch({
                type: TeamBuildingTypes.UPDATE,
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

export const onDeleteTeamBuilding = payload => {
    return async (dispatch) => {
        const { token, fCallBack, data } = payload
        try {
            await api.teamBuildingApi.remove({ token, data })
            dispatch({
                type: TeamBuildingTypes.DELETE,
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

export const onUpdateUnsaveTeamBuilding = payload => ({
    type: TeamBuildingTypes.UPDATE_UNSAVE,
    payload
})


export const onUpdateCurrentStep = payload => ({
    type: TeamBuildingTypes.UPDATE_CURRENT_STEP,
    payload
})


export const onDeleteUnsaveTeamBuilding = ({ currentTeamBuilding, token }) => {
    return async (dispatch) => {
        try {
            if (!currentTeamBuilding.id) {  // mode create
                const { images, reviews } = currentTeamBuilding
                let requests = []
                // delete all images and reviews
                if (images && images.length > 0) {
                    images.map(item => requests.push(api.uploadApi.deleteImg({ token, id: item.id })))
                }
                if (reviews && reviews.length > 0) {
                    reviews.map(item => requests.push(api.reviewApi.remove({ token, data: item.id })))
                }

                if (requests.length > 0 ){
                     await Promise.all(requests)
                }
            }

            dispatch({
                type: TeamBuildingTypes.DELETE_UNSAVE
            })

        } catch (err) {}
    }
}
