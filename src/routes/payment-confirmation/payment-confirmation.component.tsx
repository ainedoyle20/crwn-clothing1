import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setOrdersInFirestore } from "../../utils/firebase/firebase.utils";

import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectConfirmationTotal, selectConfirmationOrders } from "../../store/cart/cart.selectors";
import { clearConfirmationOrders } from "../../store/cart/cart.actions";

import ConfirmedItem from "../../components/confirmed-item/confirmed-item.component";

import {
    ConfirmationContainer,
    ConfirmationHeader,
    ConfirmationHeaderBlock,
    ConfirmationTotal,
} from './payment-confirmation.styles';


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PaymentConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirmedOrders = useSelector(selectConfirmationOrders);
    const confirmationTotal = useSelector(selectConfirmationTotal);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (confirmedOrders.length === 0) {
            navigate('/');
        }
    }, [confirmedOrders]);

    const generateDateString = () => {
        const date = new Date();

        const dateString = `${date.toLocaleDateString()} ${weekdays[date.getDay()]} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        
        return dateString;
    }
    
    useEffect(() => {
        const createdAt = Date();
        const orderDate = generateDateString();

        if (currentUser !== null && currentUser.id !== undefined && confirmedOrders.length) {
            setOrdersInFirestore(currentUser.id, createdAt, orderDate, confirmationTotal, confirmedOrders);
        }

        return () => {
            dispatch(clearConfirmationOrders());
        }
    }, []);

    return (
        <ConfirmationContainer>

            <h1>Order Confirmed</h1>

            <ConfirmationHeader>
                <ConfirmationHeaderBlock>
                    <span>Product</span>
                </ConfirmationHeaderBlock>
                <ConfirmationHeaderBlock>
                    <span>Description</span>
                </ConfirmationHeaderBlock>
                <ConfirmationHeaderBlock>
                    <span>Quantity</span>
                </ConfirmationHeaderBlock>
                <ConfirmationHeaderBlock>
                    <span>Price</span>
                </ConfirmationHeaderBlock>
            </ConfirmationHeader>

            {confirmedOrders.map((confirmedOrder) => (
                <ConfirmedItem key={confirmedOrder.id} confirmedItem={confirmedOrder} />
            ))}

            <ConfirmationTotal>Total Payment: ${confirmationTotal}</ConfirmationTotal>
            
        </ConfirmationContainer>
    )
}

export default PaymentConfirmation;
