"use client";

import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default function Admin() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useGlobalContext();
  const route = useRouter();

  const handleAuthenticate = (e: any) => {
    e.preventDefault();
    const {
      name: { value: name },
      pass: { value: pass },
    } = e.target.elements;
    console.log({ name, pass });
    setAuth(true);
    route.push("/admin/dashboard");
  };
  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-24em)]">
      <form className="space-y-6" action="#" onSubmit={handleAuthenticate}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="User name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="pass"
            id="pass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="User password"
            required
          />
        </div>
        {error && <p className="text-sm text-red-800 text-center">{error}</p>}

        <button
          type="submit"
          className="relative w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
          disabled={loading}
        >
          {loading && (
            <BiLoaderAlt className="absolute bottom-2 animate-spin text-2xl" />
          )}
          Login
        </button>
      </form>
    </section>
  );
}
