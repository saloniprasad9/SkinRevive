import { categories } from "../content/categories";
// import { styles } from "../style";
import { useNavigate } from "react-router-dom";
const CategoryCard = () => {
  const navigate = useNavigate();
  const openCategory = (categoryId) => {
    navigate(`./category/${categoryId}`);
  };
  console.log(categories.url);
  return (
    <div className="category-list">
      {categories.map((category) => (
        <div
          className="h-[160px] flex justify-center items-center w-[200px] rounded-[16px] bg-cover"
          style={{
            backgroundImage: `url(${category.url})`,
          }}
          key={category.categoryId}
          onClick={() => openCategory(category.categoryId)}
        >
          <div className="bg-black bg-opacity-30 h-[160px] w-[200px] flex items-center rounded-[16px] justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-white font-bold font-poppins text-[24px]">
                {category.displayName}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
