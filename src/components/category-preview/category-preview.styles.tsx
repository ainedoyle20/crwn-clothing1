import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const CategoryPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

export const CategoryPreviewTitle = styled(Link)`
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
`;

export const PreviewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(0, 1fr);

    @media screen and (min-width: 450px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 15px;  
    }
    
    @media screen and (min-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 20px; 
    }

    @media screen and (min-width: 1000px) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px; 
    }
`;
