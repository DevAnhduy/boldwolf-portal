import UserTypes from "./user.types";

const INITIAL_STATE = {
    token: null,
    isVerify: null
};

const UserReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    const { type, payload } = action
    switch (type) {
        case UserTypes.LOGIN:
            return {
                ...state,
                token: payload,
            }
        case UserTypes.VERIFY:
            return {
                ...state,
                isVerify: payload.isValid
            }
        case UserTypes.DELETE_TOKEN:
            if (!state.isVerify) {
                return {
                    ...state,
                    token: null,
                }
            }
            else {
                return { ...state };
            }
        case UserTypes.LOGOUT:
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    }
};

export default UserReducer;
