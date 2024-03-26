import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [required, setRequired] = useState("REQUIRED");
  const [enable, setEnable] = useState(false);
  const navigate = useNavigate();
  const closeSignin = () => {
    navigate("/");
  };
  const onEditInput = (e) => {
    console.log(e.target.value);
    if (e.target.value == "") {
      setRequired("REQUIRED");
      setEnable(false);
    } else if (e.target.value.length !== 10) {
      setRequired("ENTER A VALID MOBILE NUMBER");
      setEnable(false);
    } else {
      setRequired("");
      setEnable(true);
    }
  };
  return (
    <div className="bg-[#f3f3f3] flex justify-center items-center w-full">
      <div className="bg-white flex w-[350px] h-[600px] flex-col mt-[20px] items-center border-[#c3b8b8] border-[1px] rounded-[16px]">
        <div className="relative items-center w-full mt-10">
          <IoClose
            className="absolute h-[30px] w-[30px] ml-[15px]"
            onClick={closeSignin}
          />
          <h1 className="text-black w-full justify-center flex text-[20px] font-[600px] font-inter ">
            LOGIN / REGISTER
          </h1>
        </div>
        <div className="flex flex-col mt-[30px]">
          <input
            placeholder="Enter Email Id or Phone Number"
            className="w-[280px] h-[40px] border-[1.5px] border-[#78265d] px-4 py-2 placeholder-center placeholder:text-[17px]"
            onChange={(e) => onEditInput(e)}
          ></input>
          <h6 className="text-right text-[12px]">{required}</h6>
        </div>
        <div className="text-white font-semibold font-inter text-[18px] flex-start justify-center items-center mt-[160px]">
          <button
            className="bg-[#6d2c57] w-[280px] h-[50px] px-[24px] py-[10px] "
            disabled={!enable}
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
