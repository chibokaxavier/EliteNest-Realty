import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { signInStart, signInSuccess } from "../src/feature/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { RootState } from "src/app/store";

const OAuth = () => {
  const { data: session, status } = useSession();
  // const [loading, setLoading] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, loading } = useSelector((state: RootState) => state.user);

  const handleGoogleAuth = async () => {
    dispatch(signInStart());
    await signIn("google");
  };

  useEffect(() => {
    console.log(session, loading);

    const google = async () => {
      if (session?.user && loading) {
        console.log(session, "session");

        try {
          const res = await fetch("http://localhost:3001/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: session?.user?.name,
              email: session?.user?.email,
              photo: session?.user?.image,
            }),
          });
          const data = await res.json();
          console.log(data.user, "user details");
          dispatch(signInSuccess(data));
          await signOut();
          router.push("/");

          console.log("try worked");
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (status === "authenticated" && loading) {
      google();
    }
  }, [status, session, loading, dispatch, router]);
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
