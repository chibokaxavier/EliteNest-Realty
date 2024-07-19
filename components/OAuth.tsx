import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { signInSuccess } from "../src/feature/user/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const OAuth = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleAuth = async () => {
   await signIn("google");
  };

  useEffect(() => {
    const google = async () => {
      if (session?.user) {
        setLoading(true);
        try {
          const res = await fetch("http://localhost:3001/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: session?.user?.name,
              email: session?.user?.email,
              photo: session?.user?.image,
            }),
          });
          const data = await res.json();
          console.log(data, "user details");
          dispatch(signInSuccess(data));
          router.push("/");
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    google();
  }, [session]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="bg-transparent text-black  rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto"
      >
        <FaGoogle className="text-2xl" />
        Sign in with Google
      </button>
    </>
  );
};

export default OAuth;
