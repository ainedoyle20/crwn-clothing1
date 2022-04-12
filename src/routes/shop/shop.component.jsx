import { useContext } from 'react';

import { ProductsContext } from '../../contexts/products.context';

import PorductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {
                products.map(({id, ...props}) => (
                    <PorductCard key={id} {...props} />
                ))
            }
        </div>
    );
}

export default Shop;
