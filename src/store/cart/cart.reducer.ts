import { AnyAction } from "redux";

import { CartItem } from './cart.types';

import { 
    setCartItems,
    setIsCartOpen,
    setConfirmationOrders,
    clearConfirmationOrders,
    fetchCartItemsFailed,
    fetchCartItemsSuccess,
    clearCartOnSignOutSuccess 
} from './cart.actions';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
    readonly error: Error | null;
    readonly confirmationOrders: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    error: null,
    confirmationOrders: [],
}

const cartReducer = (state=CART_INITIAL_STATE, action: AnyAction): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: !state.isCartOpen,
        }
    }

    if (setConfirmationOrders.match(action)) {
        return {
            ...state,
            cartItems: [],
            confirmationOrders: action.payload,
        }
    }

    if (clearConfirmationOrders.match(action)) {
        return {
            ...state,
            confirmationOrders: [],
        }
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        }
    } 

    if (fetchCartItemsSuccess.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
            error: null,
        }
    }

    if (fetchCartItemsFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
        }
    }
    
    if (clearCartOnSignOutSuccess.match(action)) {
        return {
            ...state,
            cartItems: [],
        }
    }

    return state;
}

export default cartReducer;
