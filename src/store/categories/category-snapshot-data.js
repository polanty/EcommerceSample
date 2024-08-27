import { createSelector } from "reselect";
//the reselector eliminates the error generated because of the constant change from the variable

//holds the base state that wont change
const selectCategories = (state) => state.categories.categories;
const selectCategoryToggle = (state) => state.categories;

//holds the dynamically generated objects or array that is created by passing a variable into the selector
export const selectCategoryMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const SelectCategoryIsloading = createSelector(
  [selectCategoryToggle],
  (categorySlice) => categorySlice.isLoading
);

export const SelectCategoryErrorMessage = createSelector(
  [selectCategoryToggle],
  (categorySlice) => categorySlice.error
);
