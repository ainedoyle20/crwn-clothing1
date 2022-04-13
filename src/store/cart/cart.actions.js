import CartActionTypes from './cart.types';

const clearCartItem = (cartItems, itemToClear) => {
    return cartItems.filter(item => item.id !== itemToClear.id);
}

const removeCartItem = (cartItems, productToRemove) => {
    if (productToRemove.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(item => (
        item.id === productToRemove.id 
            ? { ...item, quantity: item.quantity - 1}
            : item
    ));
}

const addCartItem = (cartItems, productToAdd) => {
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

export const addItemToCart = (cartItems, itemToAdd) => {
    const newCartItems = addCartItem(cartItems, itemToAdd);
    return {
        type: CartActionTypes.SET_CART_ITEMS,
        payload: newCartItems,
    }
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return {
        type: CartActionTypes.SET_CART_ITEMS,
        payload: newCartItems,
    }
}

export const clearItemFromCart = (cartItems, itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    return {
        type: CartActionTypes.SET_CART_ITEMS,
        payload: newCartItems,
    }
}

export const setIsCartOpen = () => ({
    type: CartActionTypes.SET_IS_CART_OPEN,
});
