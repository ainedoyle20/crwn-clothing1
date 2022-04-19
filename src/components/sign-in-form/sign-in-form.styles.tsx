import styled from 'styled-components';

export const SignInFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 340px;
    margin-bottom: 40px;

    h2 {
        margin: 10px 0;
    }

    @media screen and (min-width: 450px) {
        width: 380px;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
