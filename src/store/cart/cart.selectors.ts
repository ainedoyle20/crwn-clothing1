import { createSelector } from 'reselect';

import { RootState } from '../store';

import { CartState } from './cart.reducer';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.isCartOpen,
);

export const selectConfirmationOrders = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.confirmationOrders,
);

export const selectConfirmationTotal = createSelector(
    [selectConfirmationOrders],
    (confirmationOrders) => confirmationOrders.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0),
);

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.cartItems,
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0),
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0),
);
