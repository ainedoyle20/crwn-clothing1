import CART_ACTION_TYPES from './cart.types';

import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';

import { CartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types';

export type SetIsCartOpen = Action<CART_ACTION_TYPES.SET_IS_CART_OPEN>;

export type SetConfirmationOrders = ActionWithPayload<CART_ACTION_TYPES.SET_CONFIRMATION_ORDERS, CartItem[]>;

export type ClearConfirmationOrders = Action<CART_ACTION_TYPES.CLEAR_CONFIRMATION_ORDERS>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export type ClearCartOnSignOutSuccess = Action<CART_ACTION_TYPES.CLEAR_CART>;

export type FetchCartItemsStart = ActionWithPayload<CART_ACTION_TYPES.FETCH_CART_ITEMS_START, {userId: string}>;

export type FetchCartItemsFailed = ActionWithPayload<CART_ACTION_TYPES.FETCH_CART_ITEMS_FAILED, Error>;

export type FetchCartItemsSuccess = ActionWithPayload<CART_ACTION_TYPES.FETCH_CART_ITEMS_SUCCESS, CartItem[] | []>;

// withMatcher actions
export const setIsCartOpen = withMatcher((): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN));

export const setConfirmationOrders = withMatcher((cartItems: CartItem[]): SetConfirmationOrders => createAction(CART_ACTION_TYPES.SET_CONFIRMATION_ORDERS, cartItems));

export const clearConfirmationOrders = withMatcher((): ClearConfirmationOrders => createAction(CART_ACTION_TYPES.CLEAR_CONFIRMATION_ORDERS));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const clearCartOnSignOutSuccess = withMatcher((): ClearCartOnSignOutSuccess => createAction(CART_ACTION_TYPES.CLEAR_CART));

export const fetchCartItemsStart = withMatcher(( userId: string ): FetchCartItemsStart => createAction(CART_ACTION_TYPES.FETCH_CART_ITEMS_START, {userId}));

export const fetchCartItemsFailed = withMatcher((error: Error): FetchCartItemsFailed => createAction(CART_ACTION_TYPES.FETCH_CART_ITEMS_FAILED, error));

export const fetchCartItemsSuccess = withMatcher((cartItems: CartItem[] | []): FetchCartItemsSuccess => createAction(CART_ACTION_TYPES.FETCH_CART_ITEMS_SUCCESS, cartItems));


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
