import ORDERS_ACTION_TYPES from './orders.types';

import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';

import { OrderData } from '../../utils/firebase/firebase.types';

export type ClearOrders = Action<ORDERS_ACTION_TYPES.CLEAR_ORDERS>;

export type FetchOrdersStart = ActionWithPayload<ORDERS_ACTION_TYPES.FETCH_ORDERS_START, {userId: string}>;

export type FetchOrdersSuccess = ActionWithPayload<ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS, OrderData[]>;

export type FetchOrdersFailed = ActionWithPayload<ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED, Error>;

export const clearOrders = withMatcher((): ClearOrders => createAction(ORDERS_ACTION_TYPES.CLEAR_ORDERS));

export const fetchOrdersStart = withMatcher((userId: string): FetchOrdersStart => createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_START, {userId}));

export const fetchOrdersSuccess = withMatcher((ordersArray: OrderData[]): FetchOrdersSuccess => createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_SUCCESS, ordersArray));

export const fetchOrdersFailed = withMatcher((error: Error): FetchOrdersFailed => createAction(ORDERS_ACTION_TYPES.FETCH_ORDERS_FAILED, error));
