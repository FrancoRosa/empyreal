"use client";

import Checkout from "@/components/checkout";
import { useGlobalContext } from "@/context/store";
import { getLang, monetize } from "@/js/helpers";
import { images } from "@/js/images";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const text: any = {
  checkout: {
    en: "Checkout",
    es: "Pagar",
  },
  shipping: {
    en: "Shipping",
    es: "Envio",
  },
  unitPrice: {
    en: "Unit price",
    es: "Precio/unidad",
  },
};

export default function Cart() {
  const { cart, setCart } = useGlobalContext();
  const [checkout, setCheckout] = useState(false);
  const [total, setTotal] = useState<any>(0);
  const lang = getLang();

  const productList = (cart: any[] = []) => {
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

  const [list, setList] = useState(productList(cart));

  const handleAdd = (product: any) => {
    const newCart = [...cart, product];
    setList(productList(newCart));
    setCart(newCart);
  };

  const handleSubtract = (product: { id: number }) => {
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

  const handleRemove = (product: any) => {
    const newCart = cart.filter((p) => p.id !== product.id);
    setList(productList(newCart));
    setCart(newCart);
  };

  useEffect(() => {
    const value =
      list.reduce((s: any, p: any) => s + p.price * p.quantity, 0) || 0;
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
              <p className="font-bold">{p.name[lang]}</p>
              <button
                onClick={() => handleRemove(p)}
                className="text-gray-600 cursor-pointer m-2"
                title="Remove item"
              >
                <BsFillTrashFill />
              </button>
            </div>
            <div className="flex justify-between">
              <table>
                <tbody className="text-left">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-2 font-medium text-gray-900  dark:text-white"
                    >
                      {text.unitPrice[lang]}:
                    </th>
                    <td className="pl-6 py-2">{monetize(p.price)}</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className=" py-2 font-medium text-gray-900  dark:text-white"
                    >
                      Subtotal:
                    </th>
                    <td className="pl-6 py-2">
                      {monetize(p.quantity * p.price)}
                    </td>
                  </tr>
                </tbody>
              </table>

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
          </div>
        </div>
      ))}

      {cart?.length > 0 ? (
        <>
          <table className="table-auto flex justify-end p-4">
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td className="pl-8 text-right">{monetize(total)}</td>
              </tr>
              <tr>
                <td>{text.shipping[lang]}</td>
                <td className="pl-8 text-right">{monetize(15)}</td>
              </tr>
              <tr className="font-semibold">
                <td>Total:</td>
                <td className="pl-8 text-right">{monetize(total + 15)}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end p-4 ">
            <button
              onClick={() => setCheckout((s) => !s)}
              className="bg-cyan-700 text-white rounded-lg py-2 px-4 w-28"
            >
              {text.checkout[lang]}
            </button>
          </div>
          {checkout && (
            <Checkout
              setCheckout={setCheckout}
              value={total + 15}
              list={list}
            />
          )}
        </>
      ) : (
        <section className="flex justify-center items-center flex-col -mt-16 min-h-screen ">
          <h1 className="font-bold text-xl">Your shopping cart is empty</h1>
          <h3>
            Start shopping{" "}
            <Link className="text-cyan-700" href="/shop">
              here
            </Link>
          </h3>
        </section>
      )}
    </>
  );
}
