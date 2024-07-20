"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase";

const page = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormdata] = useState({});
  console.log(formdata);

  if (!currentUser) {
    router.push("/Signin");
    return null;
  }
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.userName);
      setEmail(currentUser.email);
    } else {
      router.push("/Signin");
    }
  }, [currentUser, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      setFile(file);
    } else {
      setFile(null); // or handle the case when no file is selected
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormdata({ ...formdata, avatar: downloadUrl });
        });
      }
    );
  };

  return (
    <div className="">
      <form className="flex lg:flex-row flex-col mt-10 md:mt-20 gap-10 md:justify-around  items-center">
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current?.click()}
          src={currentUser.avatar}
          alt=""
          className="cursor-pointer md:h-[350px] md:w-[350px] rounded-full sm:h-[250px] sm:w-[250px] h-[150px] w-[150px] md:rounded-md"
        />
        <div>
          <div>
            <label htmlFor="" className="label">
              Username
            </label>
            <input
              type="text"
              className=" flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="email"
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Password
            </label>
            <input
              type="password"
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <button
            className="flex items-center justify-center  px-2 py-1 bg-gray-600 w-[70px] rounded-md text-gray-200 "
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
