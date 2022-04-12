import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
    CartIconContainer,
    ShoppingIconContainer,
    ItemCountContainer,
} from './cart-icon.styles';

const CartIcon = () => {
    const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext);

    const toggleCartDropdown = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>
    );
}

export default CartIcon;
