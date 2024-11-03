// import { CategoryActions } from "./category-action";
// import { categoryReducerDefault } from "./category-actionCallers";
import { AnyAction } from "redux-saga";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./category-action";

//to avoid errors set the name of the category for the switch
//code will be optimized to the most recent redux slice libary

// export const categoryReducerDefault = {
//   SET_CATEGORY_REDUCER: "SET_CATEGORY_REDUCER",
//   FETCH_CATEGORIES_START: "category/FETCH_CATEGORY_START",
//   FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORY_SUCCESS",
//   FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORY_FAILED",
// };

//description of the CategoryItems for generic purpose
export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

//description of the CategoryItems for generic purpose
export type Category = {
  title: string;
  imageUrl: string;
  items: Array<CategoryItem>;
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

// the initial state of my reducer to pass into the catgory as the intial state
const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state = initialState,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }

  if (fetchCategoriesFailure.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;

  // switch (action.type) {
  //   case categoryReducerDefault.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   case categoryReducerDefault.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };
  //   case categoryReducerDefault.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       error: action.payload,
  //     };

  //   default:
  //     return state;
  // }
};
