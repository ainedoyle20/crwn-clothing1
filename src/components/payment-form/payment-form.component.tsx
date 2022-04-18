import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

import { selectCartTotal } from '../../store/cart/cart.selectors'; 
import { selectCurrentUser } from '../../store/user/user.selectors';

import {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { PaymentButton, PaymentFormContainer, FormContainer } from './payment-form.styles';

const isValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartTotal = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: cartTotal * 100}),
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const cardDetails = elements.getElement(CardElement);

        // if (cardDetails === null) return;
        // More explicit:
        if (!isValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement  />
                <PaymentButton disabled={!stripe} isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
