import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    CartItemsContainer,
    EmptyMessageContainer,
} from './cart-dropdown.styles';

const CartDropdown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen());
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
