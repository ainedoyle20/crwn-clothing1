import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../store/user/user.actions';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {SignUpContainer} from './sign-up-form.styles';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormInput({ ...formInput, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = formInput;

        setFormInput({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This email is already in use.');
            } else {
                console.log('error signing up user.');
            }
        }
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    type="text"
                    name="displayName"
                    value={formInput.displayName}
                    onChange={handleChange}
                    required
                />
                
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

                <FormInput
                    label="Confirm Password" 
                    type="password"
                    name="confirmPassword"
                    value={formInput.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;
