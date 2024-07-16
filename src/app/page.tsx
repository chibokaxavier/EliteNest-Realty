"use client";
import type { RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../feature/counter/counterSlice";
import Head from "next/head";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Dynamic Page Title</title>
      </Head>
      <main className="font-medium">
        <div>Home apge</div>
        <button onClick={() => dispatch(increment())}> add</button>
        {count}
        <div className="text-2xl">Lorem ipsum dolor sit amet co</div>
      </main>
    </>
  );
}
