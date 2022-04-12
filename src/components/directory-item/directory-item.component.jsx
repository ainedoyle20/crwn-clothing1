import { useNavigate } from 'react-router';

import {
    BackgroundImage,
    DirectoryItemBody,
    DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({category}) => {
    const { title, imageUrl, route, size } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

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
