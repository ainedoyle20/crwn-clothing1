import { AnyAction } from "redux";

import { CartItem } from './cart.types';

import { setCartItems, setIsCartOpen } from './cart.actions';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
}

const cartReducer = (state=CART_INITIAL_STATE, action: AnyAction): CartState => {
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        }
    } else if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: !state.isCartOpen,
        }
    }

    return state;
}

export default cartReducer;
