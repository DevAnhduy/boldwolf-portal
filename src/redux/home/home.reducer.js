// eslint-disable-next-line no-unused-vars
import HomeTypes from "./home.types";


const INITIAL_STATE = {
    data: null
};

const HomeReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case HomeTypes.GET_HOME_INFO:
            return {
                ...state,
                data: { ...payload }
            }
        case HomeTypes.UPDATE_HOME_INFO:
            return {
                ...state,
                data: { ...payload }
            }
        default:
            return state;
    }
};

export default HomeReducer;
