"use client";
import { useLocalStorage, localStorage } from "@/js/storage";
import { ProductType } from "@/js/types";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  cart: ProductType[];
  setCart: Dispatch<SetStateAction<ProductType[]>>;
  auth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  cart: localStorage("cart", "[]"),
  setCart: (): ProductType[] => [],
  auth: true,
  setAuth: (): boolean => true,
});

interface GlobProvProps {
  children: any;
}

export const GlobalContextProvider: React.FC<GlobProvProps> = ({
  children,
}) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [auth, setAuth] = useState(true);
  return (
    <GlobalContext.Provider value={{ cart, setCart, auth, setAuth }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
