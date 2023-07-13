"use client";

import Image from "next/image";
import { useGlobalContext } from "@/context/store";
import { ProductType } from "@/js/types";
import { images } from "@/js/images";
import { getLang, monetize } from "@/js/helpers";
import products from "@/js/products";
import { useState } from "react";
import CartModal from "./cart_modal";
import Link from "next/link";

const text: any = {
  add: {
    en: "Add to cart",
    es: "Añadir al carrito",
  },
};

const Products = () => {
  const { cart, setCart } = useGlobalContext();
  const [modal, setModal] = useState<boolean>(false);
  const [product, setProduct] = useState<any>();
  const lang = getLang();

  const handleAddToCard = (product: ProductType) => {
    const newCart = [...cart];
    console.log(product);
    setProduct(product);
    setModal(true);
    newCart.push(product);
    setCart(newCart);
  };

  return (
    <>
      {modal && <CartModal product={product} setModal={setModal} lang={lang} />}
      <section className="flex flex-wrap justify-around gap-8">
        {products.map((product: any, index: number) => (
          <div
            key={index}
            className="relative text-center shadow-lg p-10 rounded-xl my-8 mx-4 w-[300px] h-[440px] text-sm hover:bg-slate-50"
          >
            <Link href={`/shop/${product.id}`}>
              <Image
                src={images[product.image]}
                alt="board"
                className="mx-auto h-40 w-auto p-4"
              />
              <h3 className="font-semibold pt-4 pb-2 text-ellipsis line-clamp-2 ">
                {product.name[lang]}
              </h3>
              <p className="text-sm line-clamp-4 h-[6em]">
                {product.description[lang]}
              </p>
              <p className="absolute top-8 right-8 font-semibold text-xl text-cyan-700">
                {monetize(product.price)}
              </p>
            </Link>
            <button
              onClick={() => handleAddToCard(product)}
              className="bg-cyan-500 text-white rounded-lg my-4 py-2 px-4 font-bold hover:bg-teal-600"
            >
              {text.add[lang]}
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
export default Products;
