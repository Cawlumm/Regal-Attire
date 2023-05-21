import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAtuh,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contex/user.context";
import "./sign-up.styles.scss";

// Object to keep track of multiple fields
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Sign Up Form within Authentication component
const SignUp = () => {
  // Use state hook to set the value of form fields
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  // Reset Fields Function
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Handle form submit
  const handleSubmit = async (event) => {
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
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <Button type="submit" title="Sign Up" buttonType="" />
      </form>
    </div>
  );
};

export default SignUp;
