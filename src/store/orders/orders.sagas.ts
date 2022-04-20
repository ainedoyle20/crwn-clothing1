import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import ORDERS_ACTION_TYPES from './orders.types';

import { fetchOrdersSuccess, fetchOrdersFailed, FetchOrdersStart } from './orders.actions';

import { getOrdersFromFirestore } from '../../utils/firebase/firebase.utils';

export function* fetchOrdersAsync({ payload: {userId}}: FetchOrdersStart) {
    try {
        const ordersArray = yield* call(getOrdersFromFirestore, userId);
        yield* put(fetchOrdersSuccess(ordersArray));
    } catch (error) {
        yield* put(fetchOrdersFailed(error as Error));
    }
}

export function* onFetchOrdersStart() {
    yield* takeLatest(ORDERS_ACTION_TYPES.FETCH_ORDERS_START, fetchOrdersAsync);
}

export function* ordersSagas() {
    yield* all([call(onFetchOrdersStart)]);
}
