import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const SignIn = () => {
  const [required, setRequired] = useState("REQUIRED");
  const [enable, setEnable] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const closeSignin = () => {
    navigate("/");
  };
  const AuthState = Object.freeze({
    SIGN_IN: "SIGN_IN",
    REGISTER: "REGISTER",
    DETAILS: "DETAILS",
  });

  const [authState, setAuthState] = useState(AuthState.SIGN_IN);

  const openRegister = () => {
    setAuthState(AuthState.REGISTER);
  };

  const onEditInput = (e) => {
    setInputvalue(e.target.value);
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

  const onNameInput = (e) => {
    setName(e.target.value);
  };

  const onEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const newUser = () => {
    // if phonenumber exist in db

    axios
      .post("http://localhost:5050/userByPhone", {
        phoneNumber: inputvalue,
      })
      .then((res) => {
        console.log("result ", res.data);
        if (res.data == "") {
          console.log("in if");
          setAuthState(AuthState.DETAILS);
        } else {
          console.log("in else");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("eror : ", err);
      });
  };

  const onVerifyOtp = () => {
    toast.success("OTP sent successfully!");
    setIsButtonDisabled(true);
    newUser();
    // setTimeout(() => {
    //   setAuthState(AuthState.DETAILS);
    // }, 3000);
  };

  const saveUser = () => {
    toast.success("Successfully signed in");
    const info = {
      name: name,
      email: email,
      phoneNumber: inputvalue,
    };

    axios
      .post("http://localhost:5050/user", info)
      .then((res) => {
        console.log("result ", res.data);
        if (res.data.acknowledged == true) {
          navigate("/");
        } else {
          console.log("in else");
          toast.err("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("eror : ", err);
      });
  };
  return (
    <div className="bg-[#f3f3f3] flex justify-center items-center w-full">
      {console.log(authState)}
      {authState == AuthState.SIGN_IN && (
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
              onClick={() => openRegister()}
            >
              PROCEED
            </button>
          </div>
        </div>
      )}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        className="mb-[30px]"
      />
      {authState == AuthState.REGISTER && (
        <div className="bg-white flex w-[350px] h-[600px] flex-col mt-[20px] space-y-8 items-center border-[#c3b8b8] border-[1px] rounded-[16px]">
          <div className="relative items-center w-full mt-10">
            <IoClose
              className="absolute h-[30px] w-[30px] ml-[15px]"
              onClick={closeSignin}
            />
            <h1 className="text-black w-full justify-center flex text-[20px] font-[600px] font-inter ">
              REGISTER
            </h1>
          </div>
          <div className="flex justify-center items-center w-[280px] h-[40px]">
            <h1 className="text-black text-semibold text-[20px] font-[20px] font-inter">
              Welcome to SkinRevive!
            </h1>
          </div>
          <span className="flex justify-center space-x-2 items-center w-[400px] h-[40px]">
            <h1 className="text-black font-semibold text-[14px] font-inter">
              Register Now and
            </h1>
            <h1 className="text-[#a23880] font-semibold text-[14px] font-inter">
              get 2000 Reward Points!
            </h1>
          </span>
          <div className="flex justify-center items-center bg-[#f3f3f3] w-[280px] h-[40px]">
            {inputvalue}
          </div>
          <div className="font-inter w-[280px] h-[40px] text-center">
            Please enter the OTP sent to verify your phone number
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col space-y-1">
              <input placeholder="OTP" className="focus:outline-none"></input>
              <div className="w-[180px] h-[1px] bg-[#a23880]"></div>
            </div>
            <div
              className="text-[#a23880] max-w-[60px] text-[12px] text-center font-semibold font-inter"
              onClick={() => {
                toast.success("OTP sent successfully!");
              }}
            >
              RESEND OTP
            </div>
          </div>
          <div className="text-white font-semibold font-inter text-[18px] flex-start justify-center items-center mt-[160px]">
            <button
              className={`bg-[#6d2c57] w-[280px] h-[50px] px-[24px] py-[10px] ${
                isButtonDisabled &&
                "opacity-50 cursor-not-allowed bg-gray-400 text-[#4b1b3b] py-2 px-4 rounded "
              }`}
              onClick={() => onVerifyOtp()}
            >
              VERIFY
            </button>
          </div>
        </div>
      )}
      {authState == AuthState.DETAILS && (
        <div className="bg-white flex w-[350px] h-[600px] flex-col mt-[20px] space-y-6 items-center border-[#c3b8b8] border-[1px] rounded-[16px]">
          <div className="relative items-center w-full mt-10">
            <IoClose
              className="absolute h-[30px] w-[30px] ml-[15px]"
              onClick={closeSignin}
            />
            <h1 className="text-black w-full justify-center flex text-[20px] font-[600px] font-inter ">
              ALMOST THERE!
            </h1>
          </div>
          <div className="flex justify-center items-center bg-[#f3f3f3] w-[280px] h-[40px]">
            {inputvalue}
          </div>
          <div className="flex flex-col justify-center space-y-4 items-center w-[300px] h-[200px]">
            <div className="flex flex-col space-y-1">
              <input
                className="w-[280px] h-[30px] focus:outline-none"
                placeholder="Enter Full Name"
                onChange={(e) => onNameInput(e)}
              ></input>
              <div className="w-[250px] h-[1px] bg-[#a23880]"></div>
            </div>
            <div className="flex flex-col space-y-1 ">
              <input
                className="w-[280px] h-[30px] focus:outline-none"
                placeholder="Enter Email Address"
                onChange={(e) => onEmailInput(e)}
              ></input>
              <div className="w-[250px] h-[1.5px] bg-[#a23880]"></div>
            </div>
          </div>
          <div className="text-white font-semibold font-inter text-[18px] flex-start justify-center items-center mt-[160px]">
            <button
              className={`bg-[#6d2c57] w-[280px] h-[50px] px-[24px] py-[10px] `}
              onClick={saveUser}
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
