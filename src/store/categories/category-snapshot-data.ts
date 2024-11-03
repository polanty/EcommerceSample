import { createSelector } from "reselect";
import { CategoriesState } from "./category-reducer";
import { CategoryMap } from "./category-reducer";
import { Rootstate } from "../store";
//the reselector eliminates the error generated because of the constant change from the variable

//holds the base state that wont change
const selectCategoryReducer = (state: Rootstate): CategoriesState =>
  state.categories;
const selectCategoryToggle = (state: Rootstate): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoryArray) => categoryArray.categories
);

//holds the dynamically generated objects or array that is created by passing a variable into the selector
export const selectCategoryMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const SelectCategoryIsloading = createSelector(
  [selectCategoryToggle],
  (categorySlice) => categorySlice.isLoading
);

export const SelectCategoryErrorMessage = createSelector(
  [selectCategoryToggle],
  (categorySlice) => categorySlice.error
);
