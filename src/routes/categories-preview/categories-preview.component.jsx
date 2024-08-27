import "./categories-preview.style.scss";
import { useSelector } from "react-redux";
// import { categoriesContext } from "../../contexts/product.context";
//import CardProductComponent from "../../components/products/products.component";
import CategoryPreviewPage from "../category-preview/category-preview.components";
import { selectCategoryMap } from "../../store/categories/category-snapshot-data";

const CategoriesPreview = () => {
  // const { categories } = useContext(categoriesContext);
  const categories = useSelector(selectCategoryMap);

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
