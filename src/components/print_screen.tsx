"use client";
const PrintScreen = () => {
  const printScreen = () => {
    window.print();
  };
  return (
    <div className="flex w-full justify-center">
      <button
        className="animate-bounce motion-safe:animate-bounce print:hidden bg-cyan-700 text-white rounded-lg py-2 px-4 w-28"
        onClick={() => {
          printScreen();
        }}
      >
        Print
      </button>
    </div>
  );
};
export default PrintScreen;
