import { User } from "firebase/auth";
import {
  createAction,
  withMatcher,
  actionWithPayload,
  actionWithoutPayload,
} from "./genericActionCreator";
import {
  UserData,
  AdditionalInformation,
} from "../utils/firebase/firebase.utils";

export enum User_Action_Types {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  CHECK_USER_SESSION = "user/CHECK_USER_SESSION",
  GOGGLE_SIGN_IN_START = "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START = "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS = "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE = "user/SIGN_IN_FAILURE",
  SIGN_UP_USER_START = "user/SIGN_UP_USER",
  SIGN_UP_SUCESS = "user/SIGN_UP_SUCESS",
  SIGN_UP_FAILED = "user/SIGN_UP_FAILED",
  SIGN_OUT_START = "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED = "user/SIGN_OUT_FAILED",
}

// Firstly we create our action returns
export type checkUsersession =
  actionWithoutPayload<User_Action_Types.CHECK_USER_SESSION>;

//then we create their actions
export const createUserSession = withMatcher(
  (): checkUsersession => createAction(User_Action_Types.CHECK_USER_SESSION)
);

// Firstly we create our action returns
export type SetCurrentUser = actionWithPayload<
  User_Action_Types.SET_CURRENT_USER,
  UserData
>;

//then we create their actions
export const setCurrentUser = withMatcher(
  (user: UserData & { id: string }): SetCurrentUser =>
    createAction(User_Action_Types.SET_CURRENT_USER, user)
);

// Firstly we create our action returns
export type GoogleSignInStart =
  actionWithoutPayload<User_Action_Types.GOGGLE_SIGN_IN_START>;

//then we create their actions
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(User_Action_Types.GOGGLE_SIGN_IN_START)
);

// define the sign in Obj

export type emailSignInObj = {
  email: string;
  password: string;
};
// Firstly we create our action returns
export type EmailSignStart = actionWithPayload<
  User_Action_Types.EMAIL_SIGN_IN_START,
  emailSignInObj
>;

//then we create their actions
export const emailSignStart = withMatcher(
  (email: string, password: string): EmailSignStart =>
    createAction(User_Action_Types.EMAIL_SIGN_IN_START, { email, password })
);

// Firstly we create our action returns
export type EmailSignSucess = actionWithPayload<
  User_Action_Types.SIGN_IN_SUCCESS,
  UserData
>;

//then we create their actions
export const signInsucess = withMatcher(
  (user: UserData): EmailSignSucess =>
    createAction(User_Action_Types.SIGN_IN_SUCCESS, user)
);

export type SignInFailed = actionWithPayload<
  User_Action_Types.SIGN_IN_FAILURE,
  Error
>;
export const signInFailure = withMatcher((error: Error) =>
  createAction(User_Action_Types.SIGN_IN_FAILURE, error)
);

//sign up start saga section

//firstly define the object for signing up

export type SignUpStartObject = {
  email: string;
  password: string;
  displayName: string;
  createdAt?: Date;
};

// Firstly we create our action returns
export type SignUpEmailStart = actionWithPayload<
  User_Action_Types.SIGN_UP_USER_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpEmailStart =>
    createAction(User_Action_Types.SIGN_UP_USER_START, {
      email,
      password,
      displayName,
    })
);

export type SignUpsuccess = actionWithPayload<
  User_Action_Types.SIGN_UP_SUCESS,
  { user: User; additionalDetails: AdditionalInformation }
>;

export const signUpSucess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpsuccess =>
    createAction(User_Action_Types.SIGN_UP_SUCESS, { user, additionalDetails })
);

export type SignUpfailed = actionWithPayload<
  User_Action_Types.SIGN_UP_FAILED,
  Error
>;

export const signUpfailed = withMatcher(
  (error: Error): SignUpfailed =>
    createAction(User_Action_Types.SIGN_UP_FAILED, error)
);

//sign out start actions

//first we start with what each action returns

export type SignOutStart =
  actionWithoutPayload<User_Action_Types.SIGN_OUT_START>;

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(User_Action_Types.SIGN_OUT_START)
);

export type SignOutSuccess =
  actionWithoutPayload<User_Action_Types.SIGN_OUT_SUCCESS>;
export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(User_Action_Types.SIGN_OUT_SUCCESS)
);

export type SignOutFailed = actionWithPayload<
  User_Action_Types.SIGN_OUT_FAILED,
  Error
>;

export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(User_Action_Types.SIGN_OUT_FAILED, error)
);
