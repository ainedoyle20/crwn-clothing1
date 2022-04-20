import styled from 'styled-components';

export const OrdersStyledContainer = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto;

    h1 {
        margin-bottom: 40px;
        font-size: 38px;
    }
    
    @media screen and (min-width: 500px) {
        width: 70%;
    }

    @media screen and (min-width: 800px) {
        width: 55%;
        margin: 50px auto 0;
    }
`;

export const OrdersDate = styled.div`
    margin-top: 10px;
    margin-right: auto;
    font-size: 16px;
`;

export const OrdersHeader = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
    border-top: 1px solid darkgrey;
`;

export const OrdersHeaderBlock = styled.div`
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    width: 23%;
`;

export const OrdersTotal = styled.div`
    margin-top: 10px;
    margin-left: auto;
    font-size: 24px;
`;