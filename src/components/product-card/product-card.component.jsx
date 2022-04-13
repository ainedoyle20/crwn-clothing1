import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    ProductCardFooter,
    Name,
    Price,
} from './product-card.styles';

const PorductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
