import { AnyAction } from "redux";

import {
    signInSuccess,
    signOutSuccess,
    signInFailed,
    signUpFailed,
    signOutFailed,
} from './user.actions';

import { UserData } from "../../utils/firebase/firebase.types";

export type UserState = {
    readonly currentUser: UserData | null;
    // readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    // isLoading: false,
    error: null,
}

const userReducer = (state=INITIAL_STATE, action: AnyAction): UserState => {
    if (signInSuccess.match(action)) {
        return {
            ...state,
            error: null,
            // isLoading: false,
            currentUser: action.payload
        } 
    } else if (signOutSuccess.match(action)) {
        return {
            ...state, 
            currentUser: null,
        }
    } else if (signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            // isLoading: false,
            error: action.payload,
        }
    }

    return state;
}

export default userReducer;
