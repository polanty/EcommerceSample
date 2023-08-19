import "./categories-preview.style.scss";

import { useContext } from "react";
import { categoriesContext } from "../../contexts/product.context";
//import CardProductComponent from "../../components/products/products.component";
import CategoryPreviewPage from "../category-preview/category-preview.components";

const CategoriesPreview = () => {
  const { categories } = useContext(categoriesContext);

  return (
    <div>
      {Object.keys(categories).map((title) => {
        const products = categories[title];

        return (
          <CategoryPreviewPage key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
