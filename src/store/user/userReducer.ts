import { AnyAction } from "redux-saga";
import {
  signInFailure,
  signInsucess,
  signOutSuccess,
  signUpfailed,
  signOutFailed,
} from "../userDispatch.action";
import { UserData } from "../../utils/firebase/firebase.utils";

// export enum User_Action_Types {
//   SET_CURRENT_USER = "SET_CURRENT_USER",
//   CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
//   GOGGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
//   EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
//   SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",

//   SIGN_IN_FAILURE = "user/SIGN_IN_FAILURE",
//   SIGN_UP_FAILURE = "user/SIGN_UP_FAILURE",

//   SIGN_OUT_START = "user/SIGN_OUT_START",
//   SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS",
//   SIGN_OUT_FAILURE = "user/SIGN_OUT_FAILURE",
// }

export type initialState = {
  readonly currentUser: UserData | null;
  readonly inLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: initialState = {
  currentUser: null,
  inLoading: false,
  error: null,
};

//the reducer function that defines the payload
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInsucess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }
  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (
    signInFailure.match(action) ||
    signOutFailed.match(action) ||
    signUpfailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
