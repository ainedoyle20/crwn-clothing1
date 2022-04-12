import { createContext, useEffect, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((acc, item) => (
            acc + item.quantity
        ), 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    } 

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = { 
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal, 
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}