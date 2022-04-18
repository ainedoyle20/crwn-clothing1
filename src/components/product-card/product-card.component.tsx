import {FC, useCallback} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CategoryItem } from '../../store/categories/categories.types';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    ProductCardFooter,
    Name,
    Price,
} from './product-card.styles';

type ProductCardProps = {
    product: CategoryItem;
}

const PorductCard: FC<ProductCardProps> = ({product}) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = useCallback(() => dispatch(addItemToCart(cartItems, product)), [cartItems]);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />

            <ProductCardFooter>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </ProductCardFooter>

            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    );
}

export default PorductCard;
