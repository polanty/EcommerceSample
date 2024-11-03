import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCollectionFromCloud } from "../../utils/firebase/firebase.utils";
import { categoryReducerDefault } from "./category-actionCallers";
import {
  fetchCategoriesFailure,
  // fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category-action";

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

// Define an interface for serialized error
interface SerializedError {
  message: string;
  stack?: string;
  // Add any other properties you might need here
}

export function* fetchCategoriesAsynch() {
  try {
    const categoryMapArray = yield* call(getCollectionFromCloud, "categories");

    yield* put(fetchCategoriesSuccess(categoryMapArray));
  } catch (error) {
    const serializedError: SerializedError = {
      message: (error as Error).message,
      stack: (error as Error).stack,
    };

    yield* put(fetchCategoriesFailure(serializedError as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    categoryReducerDefault.FETCH_CATEGORIES_START,
    fetchCategoriesAsynch
  );
}

export function* CategoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
