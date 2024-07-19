"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

const page = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  if (!currentUser) {
    router.push("/Signin");
    return null;
  }

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.userName);
      setEmail(currentUser.email);
      // You might not want to prefill the password for security reasons
    } else {
      router.push("/Signin");
    }
  }, [currentUser, router]);

  return (
    <div className="flex lg:flex-row flex-col mt-10 md:mt-20 gap-10 md:justify-around  items-center">
      <img
        src={currentUser.avatar}
        alt=""
        className="md:h-[350px] md:w-[350px] rounded-full sm:h-[250px] sm:w-[250px] h-[150px] w-[150px] md:rounded-md"
      />
      <form className="flex flex-col justify-center items-center">
        <div>
          <label htmlFor="" className="label">
            Username
          </label>
          <input
            type="text"
            className=" flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            value={username}
          />
        </div>
        <div>
          <label htmlFor="" className="label">
            Email
          </label>
          <input
            type="text"
            className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
          
          />
        </div>
        <div>
          <label htmlFor="" className="label">
            Password
          </label>
          <input
            type="text"
            className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
          />
        </div>
        <button
          className="flex items-center justify-center  px-2 py-1 bg-gray-600 w-[70px] rounded-md text-gray-200 "
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default page;
