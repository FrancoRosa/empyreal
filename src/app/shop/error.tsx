"use client";
export default function Error() {
  const eraseStorage = () => {
    if (typeof window !== "undefined" && typeof window !== "undefined") {
      window.localStorage.removeItem("cart");
      location.reload();
    }
  };
  return (
    <div className="flex flex-col items-center h-[calc(100vh-25em)] justify-center">
      <p className="text-center  py-4 px-8">
        Something happened with your shopping cart, press below to fix it
      </p>
      <button
        className="relative w-28 text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
        onClick={eraseStorage}
      >
        Reload
      </button>
    </div>
  );
}
