import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { signInSuccess } from "../src/feature/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

const OAuth = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    signIn("google");
  };

  useEffect(() => {
    const google = async () => {
      console.log("testing ");

      if (session?.user) {
        console.log("e dae");

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
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("fgh");
      }
    };
    google();
  }, [session]);

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="bg-transparent text-black  rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto"
      >
        <FaGoogle className="text-2xl" />
        Sign Up with Google
      </button>
      <button onClick={() => signOut()}>logout</button>
      {session?.user?.name}
    </>
  );
};

export default OAuth;
