import { FC } from 'react';

import {CartItem} from '../../store/cart/cart.types';

import { ConfirmedItemContainer, ImageContainer, BaseSpan } from './confirmed-item.styles';

type ConfirmedItemProps = {
    confirmedItem: CartItem;
}
  
  const ConfirmedItem: FC<ConfirmedItemProps> = ({ confirmedItem }) => {
    const {name, price, quantity, imageUrl } = confirmedItem;
  
    return (
      <ConfirmedItemContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <BaseSpan> {name} </BaseSpan>
        <BaseSpan>{quantity}</BaseSpan>
        <BaseSpan> {price}</BaseSpan>
      </ConfirmedItemContainer>
    );
};
  
export default ConfirmedItem;