import CART_ACTION_TYPES from './cart.types';

import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';

import { CartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types';

export type SetIsCartOpen = Action<CART_ACTION_TYPES.SET_IS_CART_OPEN>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

// withMatcher actions
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher((): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN));


// Normal actions
const clearCartItem = (cartItems: CartItem[], itemToClear: CartItem): CartItem[] => {
    return cartItems.filter(item => item.id !== itemToClear.id);
}

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    if (productToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(item => (
        item.id === productToRemove.id 
            ? { ...item, quantity: item.quantity - 1}
            : item
    ));
}

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const itemExists = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (itemExists) {
        return cartItems.map(item => (
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

export const addItemToCart = (cartItems: CartItem[], itemToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, itemToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], itemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    return setCartItems(newCartItems);
}
