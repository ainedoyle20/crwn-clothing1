import styled from 'styled-components';

export const ContactFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    margin-bottom: 40px;

    @media screen and (min-width: 450px) {
        width: 70vw;
    }
`;

export const ContactFormTitle = styled.span`
    margin: 10px 0;
    font-size: 18px;
    font-weight: bold;
    width: 70%;
`;

export const StyledContactForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    width: 70%;

    button {
        min-width: unset;
        width: 50%;
        font-size: 14px;
    }

`;

export const ContactFormInput = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 40px;

    &:focus {
        outline: none;
    }
`;

export const ContactFormTextArea = styled.textarea`
    margin-bottom: 30px;
    min-width: 100%;
    max-width: 100%;
    min-height: 120px;
    max-height: 300px;

    &:focus {
        outline: none;
    }
`;
