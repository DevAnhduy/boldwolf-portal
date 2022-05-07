import BannerTypes from "./banner.types";
import { updateBanner } from "./banner.utils";

const INITIAL_STATE = {
    data: null, // []
};

const BannerReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case BannerTypes.GET_ALL:
            return {
                ...state,
                data: [...payload]
            }
        case BannerTypes.UPDATE:
            return {
                ...state,
                data: updateBanner(state.data, payload),
            }

        default:
            return state;
    }
};

export default BannerReducer;
