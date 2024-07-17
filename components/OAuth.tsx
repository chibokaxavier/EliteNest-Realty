import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { signIn } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

const OAuth = () => {
  const { data: session } = useSession();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      console.log("before");
      const result = await signInWithPopup(auth, provider);
      console.log("after");
      console.log(result);
      console.log("user");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(session);
  });
  return (
    <button
      onClick={() => signIn("google")}
      type="button"
      className="bg-transparent text-black  rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto"
    >
      <FaGoogle className="text-2xl" />
      Sign Up with Google
    </button>
  );
};

export default OAuth;
