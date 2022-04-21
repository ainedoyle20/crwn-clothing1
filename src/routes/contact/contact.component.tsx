import ContactForm from "../../components/contact-form/contact-form.component";

import { ContactContainer } from './contact.styles';

const Contact = () => {
    return (
        <ContactContainer>
            <h2>Contact Us</h2>
            <ContactForm />
        </ContactContainer>
    );
}

export default Contact;
