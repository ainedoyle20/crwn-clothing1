import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCardContainer,
    ProductCardFooter,
    Name,
    Price,
} from './product-card.styles';

const PorductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

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
