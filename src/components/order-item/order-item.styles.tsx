import styled from 'styled-components';

export const OrderItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const OrderImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;


  img { 
      width: 100%;
      height: 100%;
  } 
`;

export const OrderItemSpan = styled.span`
  display: flex;
  justify-content: center;
  width: 23%;
  font-size: 16px;

  @media screen and (min-width: 400px) {
    font-size: 20px;
  }
`;
