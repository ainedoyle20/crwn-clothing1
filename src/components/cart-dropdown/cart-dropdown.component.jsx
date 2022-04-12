import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    CartItemsContainer,
    EmptyMessageContainer,
} from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems, setIsCartOpen } = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length 
                    ? cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                    : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>
                Go To Checkout
            </Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;
