import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(0, 1fr);
    row-gap: 50px;

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

export const CategoryTitle = styled.h2`
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
`;
