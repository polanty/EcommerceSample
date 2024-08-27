//to avoid errors set the name of the category for the switch
//code will be optimized to the most recent redux slice libary
export const categoryReducerDefault = {
  SET_CATEGORY_REDUCER: "SET_CATEGORY_REDUCER",
  FETCH_CATEGORIES_START: "category/FETCH_CATEGORY_START",
  FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORY_SUCCESS",
  FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORY_FAILED",
};

// the initial state of my reducer to pass into the catgory as the intial state
const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case categoryReducerDefault.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case categoryReducerDefault.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case categoryReducerDefault.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
