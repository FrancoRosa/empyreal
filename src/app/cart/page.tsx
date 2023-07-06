"use client";

import { useGlobalContext } from "@/context/store";
import { monetize } from "@/js/helpers";
import { images } from "@/js/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export default function Cart() {
  const { cart, setCart } = useGlobalContext();

  const productList = (cart: any) => {
    const products: any = {};
    cart.forEach((product: any) => {
      if (product.id in products) {
        products[product.id] = {
          ...product,
          quantity: products[product.id].quantity + 1,
        };
      } else {
        products[product.id] = {
          ...product,
          quantity: 1,
        };
      }
    });
    return Object.values(products);
  };

  const handleAdd = (product) => {
    const newProduct = { ...product };
    delete newProduct.quantity;
    const newCart = [...cart, newProduct];
    setList(productList(newCart));
    setCart(newCart);
  };

  const handleSubtract = (product) => {
    if (cart.filter((p) => p.id === product.id).length > 1) {
      const removeIndex = cart.findIndex((p) => p.id == product.id);
      const newCart = [
        ...cart.slice(0, removeIndex),
        ...cart.slice(removeIndex + 1),
      ];
      setList(productList(newCart));
      setCart(newCart);
    }
  };

  const handleRemove = (product) => {
    const newCart = cart.filter((p) => p.id !== product.id);
    setList(productList(newCart));
    setCart(newCart);
  };

  const [list, setList] = useState(productList(cart));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const value = list.reduce((s, p) => s + p.price * p.quantity, 0);
    setTotal(value);
  }, [list]);
  return (
    <>
      {list.map((p: any) => (
        <div key={p.id} className="flex">
          <Image
            src={images[p.image] || images.default}
            alt="board"
            className="h-40 w-40 p-4"
          />
          <div className="m-4 w-full">
            <div className="flex justify-between items-center border-b-2 border-gray-200">
              <p className="font-bold">{p.name}</p>
              <button
                onClick={() => handleRemove(p)}
                className="text-gray-600 cursor-pointer m-2"
                title="Remove item"
              >
                <BsFillTrashFill />
              </button>
            </div>
            <div className="flex justify-between">
              <p>Unit price: {monetize(p.price)}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleSubtract(p)}
                  disabled={p.quantity < 2}
                  title="Subtract"
                  className="text-cyan-600  m-2 text-xl disabled:text-gray-400"
                >
                  <AiFillMinusCircle />
                </button>
                <p>{p.quantity}</p>
                <button
                  onClick={() => handleAdd(p)}
                  title="Add"
                  className="text-cyan-600 m-2 text-xl"
                >
                  <AiFillPlusCircle />
                </button>
              </div>
            </div>
            <p>Subtotal: {monetize(p.quantity * p.price)}</p>
          </div>
        </div>
      ))}
      <h3 className="font-bold text-right">Total: {monetize(total)}</h3>
      <div className="flex justify-end pt-4">
        <button className="bg-cyan-700 text-white rounded-lg py-2 px-4">
          Checkout
        </button>
      </div>
    </>
  );
}
