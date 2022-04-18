import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartCount } from '../../store/cart/cart.selectors';

import {
    CartIconContainer,
    ShoppingIconContainer,
    ItemCountContainer,
} from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    
    const toggleCartDropdown = useCallback(() => dispatch(setIsCartOpen()), []);

    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>
    );
}

export default CartIcon;
