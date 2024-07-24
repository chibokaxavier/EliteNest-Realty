import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import type { RootState } from "../src/app/store";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <header className="py-6  header-hero">
      <div className=" flex justify-between mx-auto items-center">
        <Link href={"/"}>
          <h1 className="font-extrabold flex xl:text-4xl md:text-3xl text-2xl">
            <span>Elite</span>
            <span>Nest</span>
            <div className="xl:h-2 xl:w-2 md:h-[6px] md:w-[6px] rounded-full bg-black  h-1 w-1 mt-5 xl:mt-5 md:mt-6 xl:ml-2" />
          </h1>
        </Link>

        {/* <button onClick={() => signOut()}>logout</button> */}

        <form action="" className="flex justify-center items-center relative">
          {/* <div className="max-w-[570px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className=" pl-4 pr-4 bg-transparent w-full focus:outline-none cursor-text placeholder:text-gray-700"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div> */}
          <input
            type="text"
            className="flex xl:h-[40px] h-[15px] sm:h-[20px] xl:w-[500px] md:w-[350px] w-[150px] sm:w-[200px] rounded-md border border-black text-black   font-light bg-transparent pl-4  pr-10 py-5 text-base  outline-none placeholder:text-gray-700"
            placeholder="Search...."
          />
          <IoMdSearch className="text-lg absolute  top-3 right-3" />
        </form>

        <ul className="flex font-semibold uppercase  gap-4 items-center justify-center">
          <Link href={"/"}>
            <li
              className={`hidden hover:text-gray-500 transition-all duration-200 ease-in-out md:flex ${
                pathName === "/" && "border-b-2 border-gray-700"
              }`}
            >
              Home
            </li>
          </Link>
          <Link href={"/About"}>
            <li
              className={`hover:text-gray-500 transition-all duration-200 ease-in-out  hidden md:flex ${
                pathName === "/About" && "border-b-2 border-gray-700"
              }`}
            >
              About
            </li>
          </Link>

          {currentUser?._id ? (
            <Link href={"/Profile"}>
              <img
                src={currentUser?.avatar}
                alt=""
                className="rounded-full xl:h-[40px] xl:w-[40px] sm:h-[35px] sm:w-[35px] h-[30px] w-[30px] object-cover"
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
