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
    getDocs,
    updateDoc
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
/**
 * Queries the Firestore db for the categories document
 * Retrieves the categories and maps them into an array of objects 
 * to be used in the categories context
 * @returns a category map for the category context
 */
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

/**Test Function */
export const getUserDocument = async (uid) => {
    // Takes database, collection, and identifier as arguments
    const userDocRef = doc(db, "users", uid);

    try {
        const userSnapshot = await getDoc(userDocRef);
        
        if (userSnapshot.exists()) {
            return userSnapshot;
        } else {
            console.log("User document does not exist.");
            return null;
        }
    } catch (error) {
        console.log("Error getting user document:", error.message);
        return null;
    }
};

/**
 * Update the user's cart in the Firebase Firestore database.
 * @param {string} uid - The UID of the user.
 * @param {Array} cartItems - The array of cart items to be updated supplied from 
 *                            the cart items context.
 */
export const updateUserCart = async (uid, cartItems) => {
    // Reference to the user document in the Firestore database
    const userDocRef = doc(db, "users", uid);
  
    try {
      // Fetch the user's existing cart data from the Firestore document
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.data();
  
      // Update the user's cart with the new cartItems to Firestore
      await updateDoc(userDocRef, { cart: cartItems });
  
      console.log("Cart updated successfully.");
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

/**
 * Load the user's cart from firestore to create data persitance
 * The function loads once on mount of the navigation component
 * @param {string} uid - The UID of the user
 * @returns a cart map for the shopping car from firestore
 */
export const loadUserCart = async (uid) => {
    // Reference to the user document in the Firestore database
    const userDocRef = doc(db, "users", uid);
    try {
        const userSnapshot = await getDoc(userDocRef);
        const userCart = userSnapshot.data().cart;
        console.log('Cart loaded successfully')
        return userCart
    } catch (error) {
        console.error('Error loading user cart:', error.message);
    }
}

/**
 * Create a user document in the Firestore database using authentication data.
 * @param {object} userAuth - The authentication data of the user.
 * @param {object} additionalInformation - Additional information for the user document.
 * @returns {DocumentReference} - A reference to the created user document.
 */
export const createUserDocumentFromAtuh = async (userAuth, additionalInformation = {displayName: ''}) => {
    // Check if there is user authentication data
    if (!userAuth) return;
  
    // Create a reference to the user document using the UID from userAuth
    const userDocRef = doc(db, "users", userAuth.uid);
  
    // Fetch the user document snapshot
    const userSnapshot = await getDoc(userDocRef);
  
    // If the user document doesn't exist, create it
    if (!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      const cart = []; // Initialize an empty cart array for the user
  
      try {
        // Store user information in the user document
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          cart, // Assign the cart array
          ...additionalInformation
        });
  
        console.log("User document created successfully.");
      } catch(error) {
        console.error("Error creating user document:", error.message);
      }
    }
  
    // Return the reference to the user document
    return userDocRef;
  };
  

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

