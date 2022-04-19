import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;

    @media screen and (min-width: 860px) {
        display: flex;
        flex-direction: row;
        width: 90vw;
        justify-content: space-between;
    }
`;
