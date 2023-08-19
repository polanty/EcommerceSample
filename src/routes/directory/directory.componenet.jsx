import "./directory.styles.scss";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { categoriesContext } from "../../contexts/product.context";
import CardProductComponent from "../../components/products/products.component";

const Directory = () => {
  const { category } = useParams();
  const { categories } = useContext(categoriesContext);

  const [products, setProducts] = useState(categories[category]);
  console.log(products);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <div className="directory-container">
      {products &&
        products.map((product) => (
          <CardProductComponent products={product} key={product.id} />
        ))}
    </div>
  );
};

export default Directory;
