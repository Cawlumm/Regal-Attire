import { useState } from 'react';
import { getNewsletterEmails, storeNewsLetterEmail } from '../../utils/firebase/firebase.utils';
import './newsletter.styles.scss'

const Newsletter = () => {
    // Initialize variables
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(false);

    // Handle form submission and validation of email address using regex pattern matching
    const validateEmail = (input) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{3,}$/;
        return emailRegex.test(input);
      };

    // Hanlde varaible state with input change
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        setIsValid(validateEmail(inputValue));
      };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default submit

        const inputField = document.getElementById('inputField');

        setSubmitted(true);

        if(!validateEmail(email)) {
            return;
        }

        // Clear the input field
        storeNewsLetterEmail(email)
        setEmail('');
        inputField.value = '';

        // API Call here
        storeNewsLetterEmail()
    }
    return (
        <div className="newsletter-container">
            <div className='components-container'>            <div className="instructions-container">
                <h2>Subscribe to our newsletter</h2>
                <p>Get the latest updates on new products and promotions.</p>
                <hr/>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="input-container">
                <input 
                type='text' 
                id='inputField' 
                placeholder=' '
                onChange={handleInputChange}/>
                <label for='inputField'>Your Email</label>
                <button 
                type='submit'
                >SUBSCRIBE
                </button>
            </div>
            </form>
            {submitted && !isValid && (
                <span className="error-message">Not a Valid Email</span>
            )}
            </div>
        </div>
    )
}

export default Newsletter