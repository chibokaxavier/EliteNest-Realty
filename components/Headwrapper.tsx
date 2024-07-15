"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

const HeaderWrapper = () => {
  const pathName = usePathname();
  const showHeader = pathName !== "/createUser" && pathName !== "/Signin";

  return showHeader ? <Header /> : null;
};

export default HeaderWrapper;
