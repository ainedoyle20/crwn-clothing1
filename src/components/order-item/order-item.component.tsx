import { FC } from "react";

import { CartItem } from '../../store/cart/cart.types';

import { OrderItemContainer, OrderImageContainer, OrderItemSpan} from './order-item.styles';

type OrderItemProps = {
    item: CartItem;
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
    const {name, price, quantity, imageUrl } = item;
  
    return (
      <OrderItemContainer>
        <OrderImageContainer>
          <img src={imageUrl} alt={`${name}`} />
        </OrderImageContainer>
        <OrderItemSpan> {name} </OrderItemSpan>
        <OrderItemSpan>{quantity}</OrderItemSpan>
        <OrderItemSpan> {price}</OrderItemSpan>
      </OrderItemContainer>
    );
}

export default OrderItem;
