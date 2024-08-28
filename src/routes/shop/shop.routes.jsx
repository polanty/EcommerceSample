import "../shop/shop.styles.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/category-action";
//import { fetchCategoriesAsync } from "../../store/categories/category-action";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Directory from "../directory/directory.componenet";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch the thunk using the regular dispatch
    dispatch(fetchCategoriesStart());
  });

  //dispatch function to get the categories from the cloud
  // useEffect(() => {
  //   const getCollections = async () => {
  //     const categoryMapArray = await getCollectionFromCloud("categories");
  //     console.log("Effect fired");
  //     dispatch(setCategories(categoryMapArray));
  //   };

  //   getCollections();
  // });

  return (
    <div>
      <Routes>
        <Route index element={<CategoriesPreview />}></Route>
        <Route path=":category" element={<Directory />}></Route>
      </Routes>
    </div>
  );
};
export default Shop;
