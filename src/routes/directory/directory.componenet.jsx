import "./directory.styles.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../store/categories/category-snapshot-data";
import Spinner from "../../components/spinner/spinner.components";
import CardProductComponent from "../../components/products/products.component";
import {
  SelectCategoryIsloading,
  // SelectCategoryErrorMessage,
} from "../../store/categories/category-snapshot-data";

const Directory = () => {
  const { category } = useParams();
  // const { categories } = useContext(categoriesContext);
  const categories = useSelector(selectCategoryMap);
  const isLoading = useSelector(SelectCategoryIsloading);
  // const fetchError = useSelector(SelectCategoryErrorMessage);
  const [products, setProducts] = useState(categories[category]);
  // const [error, setError] = useState(fetchError);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="directory-container">
          {products &&
            products.map((product) => (
              <CardProductComponent products={product} key={product.id} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Directory;
