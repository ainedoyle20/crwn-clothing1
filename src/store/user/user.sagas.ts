import { takeLatest, put, all, call } from 'typed-redux-saga/macro';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
  SignOutStart,
} from './user.actions';

import { clearCartOnSignOutSuccess } from '../cart/cart.actions';

import {User} from 'firebase/auth';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signUserInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signOutUser,
  setCartItemsInFirestore,
} from '../../utils/firebase/firebase.utils';
import { AdditionalInformation } from '../../utils/firebase/firebase.types';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
    
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signUserInWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const {user} = userCredential;

      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      signUpWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      
      yield* put(signUpSuccess(user, { displayName }));
    }
    
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signOut({ payload: {userId, cartItems}}: SignOutStart) {
  try {
    yield* call(setCartItemsInFirestore, userId, cartItems);
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* emptyCartOnSignOutSuccess() {
  yield* put(clearCartOnSignOutSuccess());
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignOutSuccess() {
  yield* takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, emptyCartOnSignOutSuccess)
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onSignOutSuccess),
  ]);
}