import React from "react";
import { FaGoogle } from "react-icons/fa";

const OAuth = () => {
  const handleGoogleAuth = async () => {
    try {
        
    } catch (error) {
      console.log("Could not sign in with google");
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-transparent text-black  rounded-lg px-4 font-bold flex gap-2 justify-center items-center mx-auto"
    >
      <FaGoogle className="text-2xl" />
      Sign Up with Google
    </button>
  );
};

export default OAuth;
