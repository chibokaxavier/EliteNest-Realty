"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
} from "src/feature/user/userSlice";

const Page = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormdata] = useState({ avatar: "" });
  const dispatch = useDispatch();
  console.log(formdata);

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push("/Signin");
  //   }
  // }, [currentUser, router]);

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

  const handleChange = (e: any) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
    console.log(formdata);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3001/api/user/updateUser/${currentUser._id.toString()}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        console.log(data.message);
      }
      dispatch(updateUserSuccess(data));
    } catch (error: any) {
      console.log("fghjk");

      dispatch(
        updateUserFailure(
          (error.message as string) || "An unknown error occurred"
        )
      );
    }
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex lg:flex-row flex-col mt-10 md:mt-20 gap-10 md:justify-evenly items-center"
      >
        <div className="flex flex-col gap-4 justify-center items-center">
          <input
            onChange={handleFileChange}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current?.click()}
            src={formdata.avatar || currentUser.avatar}
            alt=""
            className="cursor-pointer md:h-[350px] md:w-[350px] rounded-full sm:h-[250px] sm:w-[250px] h-[150px] w-[150px] md:rounded-md"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload. (Try uploading an actual image with less
                that 2mb or check your internet connection)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image Successfully uploaded!!
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div>
            <label htmlFor="" className="label">
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              id="userName"
              defaultValue={currentUser.userName}
              className=" flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              id="email"
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <div>
            <label htmlFor="" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="flex py-1 px-3 bg-transparent border-black rounded-md md:w-[400px] w-[380px] mt-3 mb-6 outline-none  border-2"
            />
          </div>
          <button className="btn" type="submit">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
