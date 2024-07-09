"use client";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";

const CreateUserPage = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const toggleConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      // Handle form submission
      console.log("Passwords match. Form submitted.");
    }
  };
  return (
    <div>
      <div className="flex flex-row justify-center  items-center xl:mt-[40px] ">
        <div className="bg-white/60 h-[100vh] w-[100vw]  xl:w-[30vw] xl:h-[90vh] rounded-lg rounded-r-none  shadow-xl px-3">
          <div className="">
            <p className="font-extrabold text-3xl text-center xl:text-3xl py-5 xl:pt-3 xl:pb-3">
              Create your account
            </p>
            <form
              action=""
              className="flex-col flex relative"
              onSubmit={handleSubmit}
            >
              <label htmlFor="" className="label">
                Username
              </label>
              <input
                type="text"
                placeholder="Your Username"
                className="input"
                required
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <label htmlFor="" className="label">
                {" "}
                Email
              </label>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input"
                  required
                />
              </div>

              <label htmlFor="" className="label">
                Password
              </label>
              <div className="flex items-center justify-center">
                <input
                  type={hidePassword ? "password" : "text"}
                  placeholder="********"
                  className="input "
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <div className="mr-4" onClick={togglePassword}>
                  {hidePassword ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl " />
                  )}
                </div>
              </div>

              <label htmlFor="" className="label">
                Confirm Password
              </label>
              <div className=" pb-0 flex items-center justify-center">
                <input
                  type={hidePassword ? "password" : "text"}
                  placeholder="********"
                  className="input"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />

                <div className=" mr-4" onClick={toggleConfirmPassword}>
                  {hideConfirmPassword ? (
                    <FaRegEyeSlash className="text-xl" />
                  ) : (
                    <FaRegEye className="text-xl " />
                  )}
                </div>
              </div>
              {error && <p className="text-red-500 mx-auto">{error}</p>}
              <div className="mx-auto">
                <button
                  type="submit"
                  className="xl:mt-5 mb-4 mt-10  flex items-center justify-center rounded-3xl bg-gray-600 text-white py-2 px-2 h-[35px] w-[90px]"
                >
                  Sign up
                </button>
              </div>
            </form>
            <button className="bg-blue-700 text-white py-2 rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto">
              <FaGoogle className="text-2xl" />
              Sign Up with Google
            </button>
            <p className="mx-auto pt-5 flex justify-center items-center gap-3">
              Already have an account?{" "}
              <button className=" h-[35px] w-[90px] flex items-center justify-center rounded-3xl bg-gray-600 text-white p-2">
                Sign In
              </button>
            </p>
          </div>
        </div>
        <div className="hidden xl:flex  items-center justify center h-[90vh] w-[35vw] rounded-lg rounded-l-none shadow-2xl">
          <Image
            src="/searching.png"
            alt="photo"
            priority
            width={600}
            height={550}
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;
