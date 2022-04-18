import { CategoryItem } from '../categories/categories.types';

enum CART_ACTION_TYPES {
    SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
}

export type CartItem = CategoryItem & { quantity: number };

export default CART_ACTION_TYPES;
