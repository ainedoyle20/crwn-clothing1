import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h2>Sign in page</h2>
            <button onClick={logGoogleUser} >SignIn With Google</button>

            <SignUpForm />
        </div>
    );
}

export default SignIn;
