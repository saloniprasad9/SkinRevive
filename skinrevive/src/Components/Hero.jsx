import Girl from "../assets/Girl.png";
import Bottle from "../assets/Bottle.jpg";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();

  const openShop = () => {
    navigate("/shop");
  };

  return (
    <div className="purple-gradient flex flex-row rounded-[20px] justify-between h-relative w-full ml-[16px] mr-[16px] mb-[16px] px-[30px] pt-[30px]">
      <div className="flex flex-col">
        <div className="font-abril ss:[72px] text-[30px] ss:leading=[100px] leading-[40px]">
          Lushy cosmetics
          <span className=" font-abril font-semibold text-black">
            {" "}
            luxurious
          </span>{" "}
          <br className="sm:block hidden" /> beauty
          <span className=" font-semibold font-abril text-black">
            {" "}
            everyone{" "}
          </span>{" "}
          deserves
        </div>
        <div className="mt-[16px] font-abril text-[#574d4d]">
          Elevate your beauty with Lushy
          <br className="sm:block hidden" />
          Cosmetics Unveil Your Radient Glow Today!
        </div>
        <div className="text-white flex-start justify-center items-center mt-[30px]">
          <button
            className="rounded-full bg-[#6d2c57] px-[30px] py-[8px]"
            onClick={() => openShop()}
          >
            Shop Now{" "}
          </button>
        </div>
        <div>
          <img
            src={Bottle}
            alt="Bottle"
            className="w-[420px] mt-10 rounded-[10px] mb-2"
          />
        </div>
      </div>
      <div className="flex flex-row">
        <img src={Girl} alt="Girl" className="w-[900px]" />
      </div>
    </div>
  );
};

export default Hero;
