"use client";
import { useLocalStorage, localStorage } from "@/js/storage";
import { ProductType } from "@/js/types";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface ContextProps {
  cart: ProductType[];
  setCart: Dispatch<SetStateAction<ProductType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  cart: localStorage("cart", "[]"),
  setCart: (): ProductType[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
