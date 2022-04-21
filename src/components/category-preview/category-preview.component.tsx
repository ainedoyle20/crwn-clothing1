import {FC} from 'react';

import { CategoryItem } from '../../store/categories/categories.types';

import ProductCard from '../product-card/product-card.component';

import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  PreviewContainer,
} from './category-preview.styles';

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>{title.toUpperCase()}</h2>
        <CategoryPreviewTitle to={title}>
          Show All
        </CategoryPreviewTitle>
      
      <PreviewContainer>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </PreviewContainer>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;