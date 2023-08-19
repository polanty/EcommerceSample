import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromPopUp,
} from "../utils/firebase/firebase.utils";

// this is the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//this is the actual provider
export const Userprovider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsuscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromPopUp(user);
      }
      setCurrentUser(user);
      console.log(user);
    });

    return unsuscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
