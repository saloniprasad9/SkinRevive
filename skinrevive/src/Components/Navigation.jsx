import SkinRevive from "../assets/Skinrevive.png";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();
  const openSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="flex flex-row px-[32px] py-[8px] items-center justify-between purple-gradient">
      <div className="flex flex-row object-contain items-center w-[100px] h-[100px]">
        <img src={SkinRevive} alt="Skinrevive" />
        <h1 className="font-poppins font-semibold text-[35px] text-[#322222]">
          SKINREVIVE
        </h1>
      </div>
      <div className="flex space-x-4">
        <button
          className="rounded-full bg-[#6d2c57] px-[30px] py-[8px] text-white"
          onClick={() => openSignIn()}
        >
          Sign In
        </button>
        <div className="flex justify-center items-center">
          <FaShoppingBag className="w-[40px] h-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
