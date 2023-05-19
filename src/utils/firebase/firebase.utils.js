import { initializeApp } from 'firebase/app';
import { getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider
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

// Export Auth and GooglePopup methods to be used by SignIn Component
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create Database
export const db = getFirestore();

export const createUserDocumentFromAtuh = async (userAuth) => {
    // Takes databse, collection, and identifier as arguments
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    // Set User Data
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    // If user data exists
    // Create / Set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log("Error Creating User Document", error.message);
        }
    }

    // Return userDocRef
    return userDocRef;
}