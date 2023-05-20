import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAtuh,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { Form } from "react-router-dom";
import Button from '../button/button.component'
import './sign-up.styles.scss'

// Object to keep track of multiple fields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Sign up form within Sign In page
const SignUp = () => {
  // Use state hook to set the value of form fields
  // Pull varaible from object to be used instead of 'formFields.displayName'
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // Reset Fields Function
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handle form submit
  // Override submit event to create and add user to google firebase
  const handleSubmit = async (event) => {
    // Call firebase auth function to create a new user
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        const userDocRef = await createUserDocumentFromAtuh(user, {
          displayName,
        });
        resetFormFields();
      } catch (error) {
        // Handle the case where the email is already in use
        if (error.code === "auth/email-already-in-use") {
          alert("User with the provided email already exits.");
        } else {
          alert("Error creating user:", error.message);
        }
      }
    } else {
      alert("Passwords do not match.");
    }
  };

  const handleChange = (event) => {
    // Pull varaible from object to be used instead of 'formFields.displayName'
    const { name, value } = event.target;

    // Setter function to change useState
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={(event) => {
          // Call createAuthUserWithEmailAndPassword function
          handleSubmit(event);
        }}
      >
        <FormInput
          label="Display Name"
          inputOptions={{
            name: "displayName",
            type: "text",
            required: true,
            value: displayName,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            required: true,
            name: "confirmPassword",
            value: confirmPassword,
            onChange: handleChange,
          }}
        />

        <Button type="submit" title='Sign Up' buttonType=''/>

      </form>
    </div>
  );
};

export default SignUp;
