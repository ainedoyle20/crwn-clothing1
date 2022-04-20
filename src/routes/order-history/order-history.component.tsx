import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selectors";
import { selectIsOrdersLoading, selectOrdersArray } from '../../store/orders/orders.selectors';

import { fetchOrdersStart, clearOrders } from "../../store/orders/orders.actions";

import Spinner from "../../components/spinner/spinner.component";
import OrdersContainer from "../../components/orders-container/orders-container.component";

const OrderHistory = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectIsOrdersLoading);
    const ordersArray = useSelector(selectOrdersArray);

    useEffect(() => {
        if (currentUser !== null && currentUser.id !== undefined) {
            dispatch(fetchOrdersStart(currentUser.id));
        } 

        return () => {
            dispatch(clearOrders());
        }
    }, [currentUser]);

    if (isLoading) {
        return <Spinner />;
    }

    if (currentUser === null) {
        return <h2>You must be logged in to view your orders.</h2>
    }

    if (ordersArray.length === 0) {
        return <h2>No Order History</h2>
    }

    return (
        <>
            {
                ordersArray.map(orderObj => <OrdersContainer key={orderObj.id} orderBatch={orderObj} />)
            }
        </>
    );
}

export default OrderHistory;
