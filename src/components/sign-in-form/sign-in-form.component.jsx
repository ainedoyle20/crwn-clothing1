import { useState } from 'react';

import { signUserInWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const SignInForm = () => {
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    const handleGoogleSignIn = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormInput({ ...formInput, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = formInput;

        setFormInput({
            email: '',
            password: '',
        });

        try {
            await signUserInWithEmailAndPassword(email, password);
        } catch (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log('Error logging user in: ', error.message);
            }
        }
    }

    console.log('running');
    return (
        <div className="sign-in-container" >
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" type="button" onClick={handleGoogleSignIn}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    );
}

export default SignInForm;
