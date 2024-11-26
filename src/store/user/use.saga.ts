import { all, takeLatest, call, put } from "typed-redux-saga/macro";
import { User_Action_Types } from "../userDispatch.action";
import {
  signInFailure,
  signInsucess,
  signUpSucess,
  signOutSuccess,
  EmailSignStart,
  SignUpEmailStart,
  SignUpsuccess,
} from "../userDispatch.action";
import {
  auth,
  createUserDocumentFromPopUp,
  getCurrentUser,
  signInWithGooglePopUp,
  signInWithEmailAndPass,
  createUserWithEmailAndPass,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

// const unsuscribe = onAuthStateChangedListener((user) => {
//   if (user) {
//     createUserDocumentFromPopUp(user);
//   }

//   dispatch(setCurrentUser(user));
// });

// // unsuscribe();
// return unsuscribe;

interface SerializedError {
  message: string;
  stack?: string;
  // Add any other properties you need
}

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapShot = yield* call(
      createUserDocumentFromPopUp,
      userAuth,
      additionalDetails
    );

    // const createdDate = new Date();
    // const dateString = createdDate.toISOString();

    if (userSnapShot) {
      const user = {
        id: userSnapShot.id,
        //   createdDate: serializedCreatedDate,
        ...userSnapShot.data(),
      };

      yield* put(signInsucess(user));
    }
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* userDispatchAsync() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;

    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopUp);

    yield* call(getSnapShotFromUserAuth, user);
    //console.log(user);
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignStart) {
  try {
    const userCredential = yield* call(signInWithEmailAndPass, email, password);

    if (userCredential) {
      const { user } = userCredential;

      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* signupUserWithEmailandPassWord({
  payload: { email, password, displayName },
}: SignUpEmailStart) {
  try {
    const userCredentials = yield* call(
      createUserWithEmailAndPass,
      email,
      password
    );

    if (userCredentials) {
      const { user } = userCredentials;

      yield* put(signUpSucess(user, { displayName }));
    }
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* SignInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpsuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signUserOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      // Add any other properties you need
    };
    yield* put(signInFailure(serializedError as Error));
  }
}

export function* onSignInwithEmail() {
  yield* takeLatest(User_Action_Types.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleUserSignIn() {
  yield* takeLatest(User_Action_Types.GOGGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUpWithEmailandPassword() {
  yield* takeLatest(
    User_Action_Types.SIGN_UP_USER_START,
    signupUserWithEmailandPassWord
  );
}

export function* onSignUpSucess() {
  yield* takeLatest(User_Action_Types.SIGN_UP_SUCESS, SignInAfterSignUp);
}

export function* onSignOutSuccess() {
  yield* takeLatest(User_Action_Types.SIGN_OUT_START, signUserOut);
}

export function* onCheckUserSession() {
  yield* takeLatest(User_Action_Types.CHECK_USER_SESSION, userDispatchAsync);
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleUserSignIn),
    call(onSignInwithEmail),
    call(onSignUpWithEmailandPassword),
    call(onSignUpSucess),
    call(onSignOutSuccess),
  ]);
}
