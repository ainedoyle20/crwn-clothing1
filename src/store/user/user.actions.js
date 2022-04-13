import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (email, password) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: { email, password },
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailed = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILED,
    payload: error.message,
});

export const signUpStart = (email, password, displayName) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: { email, password, displayName },
});

export const signUpSuccess = (user, additionalDetails) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalDetails },
});

export const signUpFailed = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILED,
    payload: error.message,
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailed = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILED,
    payload: error.message,
});
