import Image from "next/image";
const page = () => {
  return (
    <div>
      <div className="flex flex-row justify-center  items-center xl:mt-[40px] ">
        <div className="bg-white/60 h-[100vh] w-[100vw]  xl:w-[30vw] xl:h-[90vh] rounded-lg rounded-r-none  shadow-xl px-3">
          <div>
            <p className="font-extrabold text-3xl text-center xl:text-4xl py-5">
              Create your account
            </p>
            <form action="" className="flex-col flex">
              <label htmlFor="" className="label">
                Username
              </label>
              <input
                type="text"
                placeholder="Your Username"
                className="input"
              />
              <label htmlFor="" className="label">
                {" "}
                Email
              </label>
              <input type="email" placeholder="Your email" className="input" />
              <label htmlFor="" className="label">
                {" "}
                Password
              </label>
              <input type="password" placeholder="********" className="input" />
              <label htmlFor="" className="label">
                {" "}
                Confirm Password
              </label>
              <input type="password" placeholder="********" className="input" />
              <div className="mx-auto">
                <button
                  type="submit"
                  className="mt-10 h-[50px] w-[100px] flex items-center justify-center rounded-3xl bg-gray-600 text-white p-2"
                >
                  {" "}
                  Sign up
                </button>
              </div>
              <p className="mx-auto pt-10 flex justify-center items-center gap-3">
                Already have an account?{" "}
                <button className=" h-[35px] w-[90px] flex items-center justify-center rounded-3xl bg-[#ba68c8] text-white p-2">
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden xl:flex  items-center justify center h-[90vh] w-[35vw] rounded-lg rounded-l-none shadow-2xl">
          <Image
            src="/searching.png"
            alt="photo"
            priority
            width={600}
            height={550}
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
