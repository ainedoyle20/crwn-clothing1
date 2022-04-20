import { CategoryItem } from '../categories/categories.types';

enum CART_ACTION_TYPES {
    SET_CONFIRMATION_ORDERS = 'SET_CONFIRMED_ORDERS',
    CLEAR_CONFIRMATION_ORDERS = 'CLEAR_CONFIRMATION_ORDERS',
    SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    CLEAR_CART = 'CLEAR_CART',
    FETCH_CART_ITEMS_START = 'FETCH_CART_ITEMS_START',
    FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS',
    FETCH_CART_ITEMS_FAILED = 'FETCH_CART_ITEMS_FAILED',
}

export type CartItem = CategoryItem & { quantity: number };

export type FirestoreCartItem = {
    id?: number;
    imageUrl?: string;
    name?: string;
    price?: number;
    quantity?: number;
}

export default CART_ACTION_TYPES;
