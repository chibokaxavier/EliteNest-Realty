"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import type { RootState } from "../store";
import "react-toastify/dist/ReactToastify.css";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../feature/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Signin = () => {
  const router = useRouter();
  const { error, loading } = useSelector((state: RootState) => state.user);
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const createNotify = () => toast("Signed in successfully!");
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3001/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        console.log(error);
        return;
      }
      createNotify();
      setTimeout(() => {
        dispatch(signInSuccess(data));
        router.push("/");
      }, 1500);
    } catch (error: any) {
      dispatch(
        signInFailure((error.message as string) || "An unknown error occurred")
      );
    }
  };

  return (
    <div>
      <div className="xl:bg-gradient-to-r from-slate-900 to-slate-700 h-[100vh] flex justify-center items-center ">
        <div className="flex xl:flex-row flex-col  justify-center  items-center  ">
          <div className=" h-[100vh] w-[100vw]  xl:w-[30vw] xl:h-[90vh] rounded-lg rounded-r-none  bg-white px-10 pt-2">
            <div className="">
              <p className="font-semibold text-2xl text-slate-800 text-center xl:text-3xl py-5 xl:pt-3 xl:pb-3">
                Sign in
              </p>
              <form
                action=""
                className="flex-col flex relative "
                onSubmit={handleSubmit}
              >
                <label htmlFor="" className="label">
                  {" "}
                  Email
                </label>
                <div className="border-2 rounded-md mb-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input"
                    required
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="flex items-center justify-center border mb-2 rounded-md">
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="********"
                    className="input "
                    required
                    onChange={handleChange}
                    id="password"
                  />
                  <div className="mr-4" onClick={togglePassword}>
                    {hidePassword ? (
                      <FaRegEyeSlash className="text-xl" />
                    ) : (
                      <FaRegEye className="text-xl " />
                    )}
                  </div>
                </div>

                <p className="text-base text-red-600 font-semibold">{error}</p>
                <div className="w-full pt-10">
                  <button
                    type="submit"
                    className="mt-5 mb-4  flex items-center justify-center rounded-md bg-gray-600 text-white py-2 px-2 h-[35px] w-full  "
                    disabled={loading}
                  >
                    {loading ? "Loading" : "Sign in"}
                  </button>
                </div>
              </form>
              <button className="bg-transparent text-black  rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto">
                <FaGoogle className="text-2xl" />
                Sign in with Google
              </button>
              <p className="mx-auto pt-5 flex justify-center items-center gap-3">
                Don't have an account?{" "}
                <Link href={"/createUser"}>
                  <button className=" h-[35px] w-[90px] flex items-center justify-center rounded-3xl bg-gray-600 text-white p-2">
                    Sign up
                  </button>
                </Link>
              </p>
            </div>
          </div>
          <div className=" hidden xl:flex items-center justify center h-[20vh] w-[35vw] xl:h-[90vh] xl:w-[35vw] rounded-lg rounded-l-none bg-white ">
            <Image
              src="/login-img.png"
              alt="photo"
              priority
              width={400}
              height={400}
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
