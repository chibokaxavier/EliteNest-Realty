"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

const page = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  if (!currentUser) {
    router.push("/Signin");
    return null;
  }

  return <div>profile</div>;
};

export default page;
