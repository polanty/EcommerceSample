import {
  CategoryBodyContainer,
  CategoryContainer,
  BackgroundImage,
} from "./category-itemstyle.jsx";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const NavigatorRoute = () => navigate(route);
  return (
    <CategoryContainer onClick={NavigatorRoute}>
      <BackgroundImage imageurl={imageUrl} />
      <CategoryBodyContainer>
        <h1>{title}</h1>
        <p>Shop now</p>
      </CategoryBodyContainer>
    </CategoryContainer>
  );
};

//
export default CategoryItem;
