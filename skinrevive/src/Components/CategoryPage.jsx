import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
// import { categories } from "../content/categories";
import { FaRegHeart } from "react-icons/fa6";
const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  console.log(categoryId);

  const fetchCategoryData = async () => {
    const options = {
      method: "GET",
      url: "https://sephora.p.rapidapi.com/us/products/v2/list",
      params: {
        categoryId: `${categoryId}`,
        pageSize: "60",
        currentPage: "1",
      },
      headers: {
        "X-RapidAPI-Key": "4aa778d580mshc827fd6e6eaf86cp19745djsn59c537fec8c6",
        "X-RapidAPI-Host": "sephora.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setProducts(response.data.products);
      //   console.log(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  //

  const ratingStars = (rating) => {
    const lists = [];
    const rate = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        lists.push(<FaStar />);
      } else {
        lists.push(<CiStar />);
      }
    }

    return <div className="flex flex-row">{lists.map((list) => list)}</div>;
  };

  return (
    <div className="bg-[#f3f3f3] w-full">
      <div className="product-list">
        {products.map((product) => (
          <div
            className="flex flex-col items-center p-[24px] bg-[#ffffff] space-y-6 mt-8"
            key={product.productId}
          >
            <div
              className="h-[200px] w-[200px] bg-cover"
              style={{
                backgroundImage: `url(${product.heroImage})`,
              }}
            ></div>
            <h5 className="text-black font-semibold font-poppins mt-[16px] line-clamp-1">
              {product.brandName}
            </h5>
            <h6 className="mt-[16px] text-[15px] font-abril text-center min-h-[3em] line-clamp-2">
              {product.displayName}
            </h6>
            <div className="flex flex-row justify-center items-center space-x-2">
              <div className="flex flex-row">{ratingStars(product.rating)}</div>
              <div className="text-[#7a838b]">{`( ${product.reviews} )`}</div>
            </div>
            <div className="flex flex-row space-x-2">
              <button className="w-[90px] text-white flex justify-center items-center text-[13px] rounded-[5px] p-[8px] bg-[#6d2c57]">
                <FaRegHeart className="w-[30px] h-[30px]" />
              </button>
              <button className="w-[90px] font-poppins text-white rounded-[5px] p-[8px] bg-[#6d2c57]">
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
