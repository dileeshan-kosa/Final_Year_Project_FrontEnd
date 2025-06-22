import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Context from "../context";

const AdministrationLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // const { fetchAdminDetails } = useContext(Context);

  // console.log("fetchAdminDetails",fetchUserDetails)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/signin`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        console.log("AAAAAAAAAAAAAAAAAAAA", response.data.details.role);
        toast.success(response.data.message);

        if (response.data.details.role === "admina") {
          navigate("/adminadashbord");
        }
        if (response.data.details.role === "adminb") {
          // toast.success(response.data.message);
          navigate("/adminbdashbord");
        }

        // fetchAdminDetails();
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
      console.log("Update response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("data loging", data);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-emerald-100">
      <div className="w-96 p-8 bg-white bg-opacity-5 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Administration Login
        </h1>

        <form className="pt-1 flex flex-col gap-2 w-80">
          <div className="grid">
            <label className="text-black text-left ml-2">Email: </label>
            <div className="flex items-center rounded-lg shadow-lg bg-blue-200 p-3 py-1">
              <input
                type="text"
                onChange={handleOnChange}
                name="email"
                value={data.email}
                placeholder="Enter Your Email"
                className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid">
            <label className="text-black text-left ml-2">Password: </label>
            <div className="flex items-center rounded-lg shadow-lg bg-blue-200 p-3 py-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleOnChange}
                value={data.password}
                placeholder="Enter Your Password"
                className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
              />
              <div
                className="cursor-pointer text-xl to-black"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                <span className="text-black">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* <div className="flex flex-col gap-4 items-center w-80">
          <div className="w-275">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div className="w-275 flex">
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-3 rounded-md bg-blue-200 text-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <span className="absolute text-black cursor-pointer">
              <FaEye />
            </span>
          </div>
          <p className="text-black text-sm mt-2">
            Don’t have an Account?
            <Link
              to="/administrationsignup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div> */}

        <div className="flex py-4 ml-20 flex-col gap-5 w-40 justify-center items-center ">
          {/* <button
            onClick={() => navigate("/voterslogin")}
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 focus:outline-none"
          >
            Voter's Login
          </button> */}

          <motion.button
            onClick={handleSubmit}
            // type="submit"
            // onClick={() => navigate("/details")}
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 hover:scale-110 focus:outline-none center"
          >
            Login
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdministrationLogin;

// 03.03
