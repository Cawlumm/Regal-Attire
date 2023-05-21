import { initializeApp } from 'firebase/app';
import { getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut, onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNTCSwfVtqPLiWNO7nbnhqDhm5i7v-65E",
    authDomain: "crwn-clothing-db-8a59e.firebaseapp.com",
    projectId: "crwn-clothing-db-8a59e",
    storageBucket: "crwn-clothing-db-8a59e.appspot.com",
    messagingSenderId: "937804951327",
    appId: "1:937804951327:web:d06fe8734e7b62b29aca2a"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Instanciate new GoogleAuthPoriver provider & Set Parameters
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

// Export Auth and sign in provider methods to be used by SignIn Component
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// Create Database
export const db = getFirestore();

export const createUserDocumentFromAtuh = async (userAuth, additionalInformation = {displayName: ''}) => {
    // Protect Code: return if there is no auth
    if(!userAuth) return;
    // Takes databse, collection, and identifier as arguments
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    // User Data
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // If user data exists
    // Create / Set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            // Store User
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(error) {
            console.log("Error Creating User Document", error.message);
        }
    }

    // Return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // Protect Code: return if there is no email or password
    if(!email || !password) return;
    // Takes authentication, email, and password as arguments
    // Create authenticated user
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const authSignInWithEmailAndPassword = async (email, password) => {
    // Protect Code: return if there is no email or password
    if(!email || !password) return;
    // Takes authentication, email, and password as arguments
    // Sign in authenticated user
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

