import { createSelector } from "reselect";
import { initialState } from "./userReducer";
import { Rootstate } from "../store";

export const selectUserReducer = (state: Rootstate): initialState =>
  state.users;

export const selectCurrentUser = createSelector(
  selectUserReducer,

  (user) => user.currentUser
);
