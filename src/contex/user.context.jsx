import { createContext, useState, useEffect } from "react";
import {
  signOutUser,
  onAuthStateChangedListener,
  createUserDocumentFromAtuh,
} from "../utils/firebase/firebase.utils";

// Create a new context for user data
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// UserProvider component provides the user data to its children components
export const UserProvider = ({ children }) => {
  // Use state to store the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Create an object with the currentUser and setCurrentUser values
  const value = { currentUser, setCurrentUser };

  // useEffect hook to listen for changes in the authentication state
  useEffect(() => {
    // Create a listener for authentication state changes
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // If a user is logged in, create a user document
        createUserDocumentFromAtuh(user);
      }
      // Set the current user based on the authentication state
      setCurrentUser(user);
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, []);

  // Render the UserContext.Provider component and provide the value prop
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
