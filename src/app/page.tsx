"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  // const user = useSelector((state: RootState) => state.user.currentUser);
  // const dispatch = useDispatch();
  const { data: session } = useSession();
  return (
    <>
      <section className=" landing-hero h-[100vh] ">
        <div className="">
          <div>Home apge</div>

          <div className="text-2xl">Lorem ipsum dolor sit amet co</div>
          {session?.user?.name}
          <button className="btn" onClick={() => signOut()}>
            {" "}
            log out
          </button>
        </div>
      </section>
    </>
  );
}
