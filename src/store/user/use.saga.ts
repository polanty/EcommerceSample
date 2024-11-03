import { all, takeLatest, call, put } from "redux-saga/effects";
import { User_Action_Types } from "../userDispatch.action";
import {
  signInFailure,
  signInsucess,
  signUpSucess,
  signOutSuccess,
  signOutFailed,
} from "../userDispatch.action";
import {
  createUserDocumentFromPopUp,
  getCurrentUser,
  signInWithGooglePopUp,
  signInWithEmailAndPass,
  createUserWithEmailAndPass,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

// const unsuscribe = onAuthStateChangedListener((user) => {
//   if (user) {
//     createUserDocumentFromPopUp(user);
//   }

//   dispatch(setCurrentUser(user));
// });

// // unsuscribe();
// return unsuscribe;

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromPopUp,
      userAuth,
      additionalDetails
    );

    const user = {
      id: userSnapShot.id,
      //   createdDate: serializedCreatedDate,
      ...userSnapShot.data(),
    };

    const createdDate = new Date(
      user.createdDate.seconds * 1000 + user.createdDate.nanoseconds / 1000000
    );

    // Format the date into a readable string (e.g., YYYY-MM-DD HH:MM:SS)
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const day = String(createdDate.getDate()).padStart(2, "0");
    const hours = String(createdDate.getHours()).padStart(2, "0");
    const minutes = String(createdDate.getMinutes()).padStart(2, "0");
    const seconds = String(createdDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const serializedNewObject = {
      ...user,
      createdDate: formattedDate,
    };

    //console.log(serializedNewObject);
    yield put(signInsucess(serializedNewObject));
  } catch (error) {
    const serializedError = {
      message: error.message,
      stack: error.stack,
      // Add any other properties you need
    };
    yield put(signInFailure(serializedError));
  }
}

export function* userDispatchAsync() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;

    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    const serializedError = {
      message: error.message,
      stack: error.stack,
      // Add any other properties you need
    };
    yield put(signInFailure(serializedError));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopUp);

    yield call(getSnapShotFromUserAuth, user);
    //console.log(user);
  } catch (error) {
    const serializedError = {
      message: error.message,
      stack: error.stack,
      // Add any other properties you need
    };

    yield put(signInFailure(serializedError));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield (signInWithEmailAndPass, email, password);

    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    const serializedError = {
      message: error.message,
      stack: error.stack,
      // Add any other properties you need
    };

    yield put(signInFailure(serializedError));
  }
}

export function* signupUserWithEmailandPassWord({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(createUserWithEmailAndPass, email, password);

    yield put(signUpSucess(user, { displayName }));
  } catch (error) {
    const serializedError = {
      message: error.message,
      stack: error.stack,
      // Add any other properties you need
    };

    yield put(signInFailure(serializedError));
  }
}

export function* SignInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signUserOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignInwithEmail() {
  yield takeLatest(User_Action_Types.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleUserSignIn() {
  yield takeLatest(User_Action_Types.GOGGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignUpWithEmailandPassword() {
  yield takeLatest(
    User_Action_Types.SIGN_UP_USER_START,
    signupUserWithEmailandPassWord
  );
}

export function* onSignUpSucess() {
  yield takeLatest(User_Action_Types.SIGN_UP_SUCESS, SignInAfterSignUp);
}

export function* onSignOutSuccess() {
  yield takeLatest(User_Action_Types.SIGN_OUT_START, signUserOut);
}

export function* onCheckUserSession() {
  yield takeLatest(User_Action_Types.CHECK_USER_SESSION, userDispatchAsync);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleUserSignIn),
    call(onSignInwithEmail),
    call(onSignUpWithEmailandPassword),
    call(onSignUpSucess),
    call(onSignOutSuccess),
  ]);
}
