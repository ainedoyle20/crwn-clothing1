import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import CART_ACTION_TYPES from './cart.types'
import { fetchCartItemsFailed, fetchCartItemsSuccess, FetchCartItemsStart } from './cart.actions';

import { getCartItemsFromFirestore } from '../../utils/firebase/firebase.utils';

export function* fetchCartItemsAsync({ payload: { userId }}: FetchCartItemsStart) {
    try {
        const firestoreCartItems = yield* call(getCartItemsFromFirestore, userId);
        yield* put(fetchCartItemsSuccess(firestoreCartItems));
    } catch (error) {
        yield* put(fetchCartItemsFailed(error as Error));
    }
}

export function* onFetchCartItemsStart() {
    yield* takeLatest(CART_ACTION_TYPES.FETCH_CART_ITEMS_START, fetchCartItemsAsync);
}

export function* cartSagas() {
    yield* all([call(onFetchCartItemsStart)]);
}
