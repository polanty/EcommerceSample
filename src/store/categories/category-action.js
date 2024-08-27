import { categoryReducerDefault } from "./category-reducer";
import { createAction } from "../genericActionCreator";
import { getCollectionFromCloud } from "../../utils/firebase/firebase.utils";

// export const setCategories = (category) => {
//   return {
//     type: categoryReducerDefault.FETCH_CATEGORIES_SUCCESS,
//     payload: category,
//   };
// };

//saga for when function starts
export const fetchCategoriesStart = () =>
  createAction(categoryReducerDefault.FETCH_CATEGORIES_START);

//saga to indicate fetch function success
export const fetchCategoriesSuccess = (category) =>
  createAction(categoryReducerDefault.FETCH_CATEGORIES_SUCCESS, category);

//saga to indicate fetch function failure
export const fetchCategoriesFailure = (error) =>
  createAction(categoryReducerDefault.FETCH_CATEGORIES_FAILED, error);

//Thunk function
export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    // Dispatch the start action
    dispatch(fetchCategoriesStart());

    try {
      // Call the async function to get the data
      const categoryMapArray = await getCollectionFromCloud("categories");

      // Dispatch success action with the retrieved data
      dispatch(fetchCategoriesSuccess(categoryMapArray));
    } catch (error) {
      // Serialize the error object
      const serializedError = {
        message: error.message,
        stack: error.stack,
        // Add any other properties you need
      };
      dispatch(fetchCategoriesFailure(serializedError));
    }
  };
};
