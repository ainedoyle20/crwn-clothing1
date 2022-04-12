import Button from '../button/button.component';

import './product-card.styles.scss';

const PorductCard = ({ name, price, imageUrl }) => {
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />

            <div className="footer">
                <span>{name}</span>
                <span>{price}</span>
            </div>

            <Button buttonType="inverted">Add to cart</Button>
        </div>
    );
}

export default PorductCard;
