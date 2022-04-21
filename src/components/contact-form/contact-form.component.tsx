import { useState, ChangeEvent, FormEvent } from 'react';

import Button from '../button/button.component';

import { ContactFormContainer, ContactFormTitle, StyledContactForm, ContactFormInput, ContactFormTextArea } from './contact-form.styles';

const ContactForm = () => {
    const [formInput, setFormInput] = useState({
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;

        setFormInput({ ...formInput, email: value });
    }

    const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;

        setFormInput({ ...formInput, message: value });
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        setTimeout(() => {
            setFormInput({ email: '', message: '' });
            setIsLoading(false);
        }, 3000);

        setTimeout(() => {
            alert('Your message has been sent. We will get back to your shortly.');
        }, 3500);
    }

    return (
        <ContactFormContainer>
            <ContactFormTitle>Leave your email address and message below and we will address your issue as soon as possible.</ContactFormTitle>

            <StyledContactForm onSubmit={onSubmitHandler}>
                <label htmlFor="email" >Your Email</label>
                <ContactFormInput
                    id="email" 
                    name="email"
                    type="email"
                    value={formInput.email}
                    required
                    onChange={onEmailChangeHandler}
                />

                <label htmlFor="message" >Your Message</label>      
                <ContactFormTextArea name="message" value={formInput.message} required onChange={onMessageChangeHandler}></ContactFormTextArea>

                <Button type="submit" isLoading={isLoading}>Send Message</Button>
            </StyledContactForm>
        </ContactFormContainer>
    );
}

export default ContactForm;
