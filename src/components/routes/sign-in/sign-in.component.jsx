import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAtuh, 
    signInWithGoogleRedirect 
} from "../../../utils/firebase/firebase.utils";
import SignUp from "../../sign-up/sign-up.component";


const SignIn = () => {
    // Check if there is data returned after the Redirect
    const redirectCheck =  async () => {
        const response = await getRedirectResult(auth);
        if(response) {
            const userDocRef = await createUserDocumentFromAtuh(response.user);
        }
    }

    // Runs Only Once
    useEffect(() => {
        redirectCheck();
    }, []);

    // Log Google User Method
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAtuh(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUp/>
        </div>
    );
};

export default SignIn;