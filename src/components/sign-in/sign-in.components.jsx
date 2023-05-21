import { useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAtuh,
  signInWithGoogleRedirect,
  authSignInWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';

const SignIn = () => {
// Check if there is data returned after the Redirect
  const redirectCheck = async () => {
    const response = await getRedirectResult(auth);
    if (response) {
      const userDocRef = await createUserDocumentFromAtuh(response.user);
    }
  };

  // Runs Only Once
  useEffect(() => {
    redirectCheck();
  }, []);

  // Log Google User Method
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAtuh(user);
  };

  const deafultfieldData = {
    email: "",
    password: "",
  };

  const [fieldData, setFieldData] = useState(deafultfieldData);
  const { email, password } = fieldData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  console.log(fieldData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authSignInWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
                alert('Inccorect password');
                break
            case 'auth/user-not-found':
                alert('User not found');
                break;
            default:
                alert(error);       
        }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with you email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            name: "email",
            value: email,
            required: true,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            name: "password",
            value: password,
            required: true,
            onChange: handleChange,
          }}
        />
        <div className="buttons-container">
          <Button type="submit" title="Sign In" />
          <Button
            type="button"
            title="Google Sign In"
            buttonType="google"
            onClick={logGoogleUser}
          />
        </div>
      </form>
      </div>

      /* <Button title='Sign in with Google Redirect' onClick={signInWithGoogleRedirect}/> */
  );
}

export default SignIn;