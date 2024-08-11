"use client";
import OAuth from "@/components/OAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import CreateUser from "@/components/CreateUser";

const CreateUserPage = () => {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   if (currentUser) {
  //     router.push("/");
  //   }
  // }, [currentUser, router]);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };
  const toggleConfirmPassword = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };
  const createNotify = () => toast("Account created successfully!");
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.message === "Username already exists") {
          setEmailError("");
          setLoading(false);
          setUsernameError(data.message);
          return;
        }
        if (data.message === "Email already exists") {
          setUsernameError("");
          setLoading(false);
          setEmailError(data.message);
          return;
        }
        if (data.success === false) {
          setLoading(false);
          setError(data.error);
          return;
        }
        createNotify();
        setEmailError("");
        setError("");
        setUsernameError("");
        setTimeout(() => {
          setLoading(false);
          router.push("/Signin");
        }, 1500);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container ">
        <div className="sub-container gap-2 max-w-[496px]">
          <CreateUser
            usernameError={usernameError}
            emailError={emailError}
            passwordError={passwordError}
          />
          <OAuth />
          <p className="mx-auto pt-5 flex justify-center items-center gap-3">
            Already have an account?
            <Link href={"/Signin"}>
              <button className=" h-[35px] w-[90px] flex items-center justify-center rounded-3xl bg-gray-600 text-white p-2">
                Sign In
              </button>
            </Link>
          </p>
        </div>
      </section>

      <Image
        src="/login.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />

      <ToastContainer />
    </div>
  );
};

export default CreateUserPage;
