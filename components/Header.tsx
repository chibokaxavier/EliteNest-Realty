import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "../src/app/store";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <header className="py-6 xl:py-6 px-3 ">
      <div className="max-w-6xl flex justify-between mx-auto items-center">
        <Link href={"/"}>
          <h1 className="font-bold flex xl:text-4xl md:text-3xl text-xl">
            <span>Elite</span>
            <span>Nest</span>
            <div className="xl:h-2 xl:w-2 md:h-[6px] md:w-[6px] rounded-full bg-black  h-1 w-1 mt-4 xl:mt-5 md:mt-6 xl:ml-2" />
          </h1>
        </Link>

        <button onClick={() => signOut()}>logout</button>

        <form action="" className="relative">
          <input
            type="text"
            className="flex xl:h-[40px] h-[20px] xl:w-[500px] md:w-[350px] w-[200px]  rounded-md border border-black text-black   font-light bg-[#ddd0c8] pl-4  pr-10 py-5 text-base  outline-none"
            placeholder="Search...."
          />
          <IoMdSearch className="text-lg absolute  top-3 right-3" />
        </form>

        <ul className="flex font-semibold  items-center justify-center">
          <Link href={"/"}>
            <li className="hidden md:flex">Home</li>
          </Link>
          <Link href={"/About"}>
            <li className="hidden md:flex px-3">About</li>
          </Link>
          {currentUser ? (
            <Link href={"/Profile"}>
              <img
                src={currentUser.avatar}
                alt=""
                className="rounded-full xl:h-[50px] xl:w-[50px] h-[40px] w-[40px] object-cover"
              />
            </Link>
          ) : (
            <Link href={"/Signin"}>
              <li>
                <button className="bg-gray-600 px-3 xl:px-4 py-1 rounded-xl text-white">
                  Sign in
                </button>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
