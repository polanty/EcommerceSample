import { Category } from "./category-reducer";
import { categoryReducerDefault } from "./category-actionCallers";
import {
  createAction,
  actionWithPayload,
  actionWithoutPayload,
  withMatcher,
} from "../genericActionCreator";

// import { getCollectionFromCloud } from "../../utils/firebase/firebase.utils";

// export const setCategories = (category) => {
//   return {
//     type: categoryReducerDefault.FETCH_CATEGORIES_SUCCESS,
//     payload: category,
//   };
// };

export type FetchCategoryStart =
  actionWithoutPayload<categoryReducerDefault.FETCH_CATEGORIES_START>;

export type FetchCategorySuccess = actionWithPayload<
  categoryReducerDefault.FETCH_CATEGORIES_SUCCESS,
  Array<Category>
>;

export type FetchCategoryFailure = actionWithPayload<
  categoryReducerDefault.FETCH_CATEGORIES_FAILED,
  Error
>;

//Union for the acceptable actions by the category reducer
export type CategoryActions =
  | FetchCategoryStart
  | FetchCategorySuccess
  | FetchCategoryFailure;

//saga for when function starts
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoryStart =>
    createAction(categoryReducerDefault.FETCH_CATEGORIES_START)
);

//saga to indicate fetch function success
export const fetchCategoriesSuccess = withMatcher(
  (category: Array<Category>): FetchCategorySuccess =>
    createAction(categoryReducerDefault.FETCH_CATEGORIES_SUCCESS, category)
);

//saga to indicate fetch function failure
export const fetchCategoriesFailure = withMatcher(
  (error: Error): FetchCategoryFailure =>
    createAction(categoryReducerDefault.FETCH_CATEGORIES_FAILED, error)
);

//Thunk function
// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//     // Dispatch the start action
//     dispatch(fetchCategoriesStart());

//     try {
//       // Call the async function to get the data
//       const categoryMapArray = await getCollectionFromCloud("categories");

//       // Dispatch success action with the retrieved data
//       dispatch(fetchCategoriesSuccess(categoryMapArray));
//     } catch (error) {
//       // Serialize the error object
//       const serializedError = {
//         message: error.message,
//         stack: error.stack,
//         // Add any other properties you need
//       };
//       dispatch(fetchCategoriesFailure(serializedError));
//     }
//   };
// };
