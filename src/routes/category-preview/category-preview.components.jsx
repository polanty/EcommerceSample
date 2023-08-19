import "./category-preview.styles.scss";
import CardProductComponent from "../../components/products/products.component";
import { Link } from "react-router-dom";

const CategoryPreviewPage = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title}>
          <span>{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <CardProductComponent key={product.id} products={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreviewPage;
