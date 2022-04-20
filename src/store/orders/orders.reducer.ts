import { AnyAction } from 'redux';

import { clearOrders, fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailed} from './orders.actions';

import { OrderData } from '../../utils/firebase/firebase.types';

export type OrdersState = {
    readonly orders: OrderData[];
    readonly error: Error | null;
    readonly isLoading: boolean;
}

const ORDERS_INITIAL_STATE: OrdersState = {
    orders: [],
    error: null,
    isLoading: false,
}

const ordersReducer = (state = ORDERS_INITIAL_STATE, action: AnyAction): OrdersState => {
    if (clearOrders.match(action)) {
        return {
            ...state,
            orders: []
        }
    }

    if (fetchOrdersStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (fetchOrdersSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: null,
            orders: action.payload,
        }
    }

    if (fetchOrdersFailed.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        }
    }

    return state;
}

export default ordersReducer;
