import { initializeApp } from 'firebase/app';
import { getAuth,
signInWithRedirect,
signInWithPopup,
GoogleAuthProvider,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut, 
onAuthStateChanged,

} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    // Create a reference to the 'categories' collection in Firestore
    const collectionRef = collection(db, 'categories');
    
    // Create a query to retrieve all documents from the 'categories' collection
    const q = query(collectionRef);

    // Retrieve the documents based on the query and wait for the operation to complete
    const querySnapshot = await getDocs(q);
    
    // Create an empty object to store the category mapping
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        // Extract the 'title' and 'items' properties from the document data
        const { title, items } = docSnapshot.data();
        
        // Add an entry to the mapping where the key is the lowercase value of the 'title' and the value is the 'items' array
        acc[title.toLowerCase()] = items;
        
        // Return the updated accumulator for the next iteration
        return acc;
    }, {});

    // Return the category mapping as the result of the function
    return categoryMap;
}


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

