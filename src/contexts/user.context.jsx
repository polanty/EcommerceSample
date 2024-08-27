import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromPopUp,
} from "../utils/firebase/firebase.utils";

//this is the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//creating the reducer equivalent of the initial context equivalent
export const User_Action_Types = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

//the reducer function that defines the payload
export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case User_Action_Types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(
        `There is an error of Unhandled ${type} in the user reducer`
      );
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

//this is the actual provider
export const Userprovider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  //console.log(currentUser);

  //defining the action that carries out the dispatch function
  const setCurrentUser = (user) => {
    dispatch({ type: User_Action_Types.SET_CURRENT_USER, payload: user });
  };
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

// stating out with reducers now
