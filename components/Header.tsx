import Link from "next/link";
import React from "react";
import { IoMdSearch } from "react-icons/io";

const Header = () => {
  return (
    <header className="py-6 xl:py-6 px-3 ">
      <div className="max-w-6xl flex justify-between mx-auto items-center">
        <Link href={"/"}>
          <h1 className="font-extrabold flex xl:text-4xl text-xl">
            <span>Elite</span>
            <span>Nest</span>
            <div className="xl:h-3 xl:w-3 rounded-full bg-black  h-1 w-1 mt-4 xl:mt-5 xl:ml-2" />
          </h1>
        </Link>

        <form action="" className="relative">
          <input
            type="text"
            className="flex xl:h-[40px] h-[20px] xl:w-full w-[150px]  rounded-md border border-black text-black   font-light bg-[#ddd0c8] pl-4  pr-10 py-5 text-base  outline-none"
            placeholder="Search...."
          />
          <IoMdSearch className="text-lg absolute  top-3 right-3" />
        </form>
        <ul className="flex font-bold  items-center justify-center">
          <Link href={"/"}>
            <li className="hidden md:flex">Home</li>
          </Link>
          <Link href={"/About"}>
            <li className="hidden md:flex px-3">About</li>
          </Link>
          <Link href={"/Signin"}>
            <li>
              <button className="bg-gray-600 px-3 xl:px-6 py-2 rounded-xl text-white">
                Sign in
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
