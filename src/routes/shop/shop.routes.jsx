import "../shop/shop.styles.scss";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Directory from "../directory/directory.componenet";

const Shop = () => {
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
