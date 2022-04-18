import {FC, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryCategory } from '../directory/directory.component';

import {
    BackgroundImage,
    DirectoryItemBody,
    DirectoryItemContainer,
} from './directory-item.styles';

type DirectoryItemProps = {
    category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({category}) => {
    const { title, imageUrl, route, size } = category;
    const navigate = useNavigate();

    const onNavigateHandler = useCallback(() => navigate(route), []);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler} size={size}>
            <BackgroundImage imageUrl={imageUrl} />
            <DirectoryItemBody>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;
