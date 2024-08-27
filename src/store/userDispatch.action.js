import { createAction } from "./genericActionCreator";

export const User_Action_Types = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
  GOGGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "user/SIGN_IN_FAILURE",
  SIGN_UP_USER_START: "user/SIGN_UP_USER",
  SIGN_UP_SUCESS: "user/SIGN_UP_SUCESS",
  SIGN_UP_FAILED: "user/SIGN_UP_FAILED",
  SIGN_OUT_START: "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED: "user/SIGN_OUT_FAILED",
};

export const setCurrentUser = (user) => {
  return { type: User_Action_Types.SET_CURRENT_USER, payload: user };
};

export const createUserSession = () =>
  createAction(User_Action_Types.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(User_Action_Types.GOGGLE_SIGN_IN_START);

export const emailSignStart = (email, password) =>
  createAction(User_Action_Types.EMAIL_SIGN_IN_START, { email, password });

export const signInsucess = (user) =>
  createAction(User_Action_Types.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) =>
  createAction(User_Action_Types.SIGN_IN_FAILURE, error);

//sign up start saga

export const signUpStart = (email, password, displayName) =>
  createAction(User_Action_Types.SIGN_UP_USER, {
    email,
    password,
    displayName,
  });

export const signUpSucess = (user, additionalDetails) => {
  createAction(User_Action_Types.SIGN_UP_SUCESS, { user, additionalDetails });
};

export const signUpfailed = (error) => {
  createAction(User_Action_Types.SIGN_UP_FAILED, error);
};

//sign out start

export const signOutStart = () =>
  createAction(User_Action_Types.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(User_Action_Types.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(User_Action_Types.SIGN_OUT_FAILED, error);
