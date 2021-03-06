import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.actions';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    SignInFormContainer,
    ButtonsContainer,
} from './sign-in-form.styles';

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    const handleGoogleSignIn = async () => {
        dispatch(googleSignInStart());
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormInput({ ...formInput, [name]: value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formInput;

        setFormInput({
            email: '',
            password: '',
        });

        try {
            dispatch(emailSignInStart(email, password));
        } catch (error) {
            switch ((error as AuthError).code) {
              case AuthErrorCodes.INVALID_PASSWORD:
                alert('Invalid password. Please try again.');
                break;
              case AuthErrorCodes.USER_DELETED:
                alert('No user signed up with this email. Please sign up.');
                break;
              default:
                console.log('Error logging user in.');
            }
        }
    }

    return (
        <SignInFormContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email" 
                    type="email"
                    name="email"
                    value={formInput.email}
                    onChange={handleChange}
                    required
                />
                
                <FormInput
                    label="Password" 
                    type="password"
                    name="password"
                    value={formInput.password}
                    onChange={handleChange}
                    required
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={handleGoogleSignIn}>Google Sign In</Button>
                </ButtonsContainer>
                
            </form>
        </SignInFormContainer>
    );
}

export default SignInForm;
