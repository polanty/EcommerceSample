export const User_Action_Types = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
  GOGGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",

  SIGN_IN_FAILURE: "user/SIGN_IN_FAILURE",
  SIGN_UP_FAILURE: "user/SIGN_UP_FAILURE",

  SIGN_OUT_START: "user/SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "user/SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE: "user/SIGN_OUT_FAILURE",
};

const INITIAL_STATE = {
  currentUser: null,
  inLoading: false,
  error: null,
};

//the reducer function that defines the payload
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case User_Action_Types.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case User_Action_Types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case User_Action_Types.SIGN_IN_FAILURE:
    case User_Action_Types.SIGN_OUT_FAILURE:
    case User_Action_Types.SIGN_UP_FAILURE:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
