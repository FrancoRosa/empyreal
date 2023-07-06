"use client";
import useLocalStorage from "@/js/storage";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

type DataType = {
  firstName: string;
};

interface ContextProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<ContextProps>({
  count: parseInt(window.localStorage.getItem("count") || "0"),
  setCount: (): number => 0,
});

export const GlobalContextProvider = ({ children }) => {
  const [count, setCount] = useLocalStorage("count", 0);
  return (
    <GlobalContext.Provider value={{ count, setCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
