import { FC } from "react";

import { OrderData } from "../../utils/firebase/firebase.types";

import OrderItem from "../order-item/order-item.component";

import {
    OrdersStyledContainer,
    OrdersDate,
    OrdersHeader,
    OrdersHeaderBlock,
    OrdersTotal,
} from './orders-container.styles';

type OrdersContainerProps = {
    orderBatch: OrderData;
}

const OrdersContainer: FC<OrdersContainerProps> = ({ orderBatch }) => {
    const { confirmedOrders, total, dateString } = orderBatch;

    return (
        <OrdersStyledContainer>

            <OrdersDate>Order Date: {dateString}</OrdersDate>

            <OrdersHeader>
                <OrdersHeaderBlock>
                    <span>Product</span>
                </OrdersHeaderBlock>
                <OrdersHeaderBlock>
                    <span>Description</span>
                </OrdersHeaderBlock>
                <OrdersHeaderBlock>
                    <span>Quantity</span>
                </OrdersHeaderBlock>
                <OrdersHeaderBlock>
                    <span>Price</span>
                </OrdersHeaderBlock>
            </OrdersHeader>

            {confirmedOrders.map((item) => (
                <OrderItem key={item.id} item={item} />
            ))}

            <OrdersTotal>Total: ${total}</OrdersTotal>
            
        </OrdersStyledContainer>
    );
}

export default OrdersContainer;
