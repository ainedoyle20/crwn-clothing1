import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state, 
                currentUser: null,
            }
        case UserActionTypes.SIGN_OUT_FAILED:
        case UserActionTypes.SIGN_IN_FAILED:
        case UserActionTypes.SIGN_UP_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default userReducer;
