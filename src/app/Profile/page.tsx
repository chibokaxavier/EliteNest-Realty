"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

const page = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    router.push("/Signin");
    return null;
  }
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.userName);
      setEmail(currentUser.email);
    } else {
      router.push("/Signin");
    }
  }, [currentUser, router]);

  return (
    <div className="">
      <form className="flex lg:flex-row flex-col mt-10 md:mt-20 gap-10 md:justify-around  items-center">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current?.click()}
          src={currentUser.avatar}
          alt=""
          className="cursor-pointer md:h-[350px] md:w-[350px] rounded-full sm:h-[250px] sm:w-[250px] h-[150px] w-[150px] md:rounded-md"
        />
        <div>
          <div>
            <label htmlFor="" className="label">
              Username
            </label>
            <input
              type="text"
              className=" flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="email"
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Password
            </label>
            <input
              type="password"
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <button
            className="flex items-center justify-center  px-2 py-1 bg-gray-600 w-[70px] rounded-md text-gray-200 "
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
