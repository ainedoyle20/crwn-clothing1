import { useSelector } from 'react-redux';
import { stripePromise } from '../../utils/stripe/stripe.utils';
import {Elements } from '@stripe/react-stripe-js';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import {
    CheckoutContainer,
    CheckoutHeader,
    CheckoutHeaderBlock,
    CheckoutTotal,
} from './checkout.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>

            <CheckoutHeader>
                <CheckoutHeaderBlock>
                    <span>Product</span>
                </CheckoutHeaderBlock>
                <CheckoutHeaderBlock>
                    <span>Description</span>
                </CheckoutHeaderBlock>
                <CheckoutHeaderBlock>
                    <span>Quantity</span>
                </CheckoutHeaderBlock>
                <CheckoutHeaderBlock>
                    <span>Price</span>
                </CheckoutHeaderBlock>
                <CheckoutHeaderBlock>
                    <span>Remove</span>
                </CheckoutHeaderBlock>
            </CheckoutHeader>

            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}

            <CheckoutTotal>TOTAL: ${cartTotal}</CheckoutTotal>

            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
            
        </CheckoutContainer>
    );
}

export default Checkout;
