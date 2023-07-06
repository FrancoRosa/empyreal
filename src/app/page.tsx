"use client";
import Intro from "@/components/intro";
import { useGlobalContext } from "@/context/store";

export default function Home() {
  const { count, setCount } = useGlobalContext();
  return (
    <>
      <button
        className="bg-gray-600 text-white rounded-lg py-2 px-4"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
      <Intro />
    </>
  );
}
