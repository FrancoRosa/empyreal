"use client";

import Image from "next/image";

import { useGlobalContext } from "@/context/store";
import { ProductType } from "@/js/types";
import { images } from "@/js/images";
import { getLang, monetize } from "@/js/helpers";
import products from "@/js/products";
const Products = () => {
  const { cart, setCart } = useGlobalContext();
  const lang = getLang();
  const handleAddToCard = (product: ProductType) => {
    const newCart = [...cart];
    newCart.push(product);
    setCart(newCart);
  };

  return (
    <section className="flex flex-wrap justify-around gap-8">
      {products.map((product: any, index: number) => (
        <div
          key={index}
          className="relative text-center shadow-lg p-10 rounded-xl my-8 mx-4 w-[300px] h-[440px]"
        >
          <Image
            src={images[product.image]}
            alt="board"
            className="mx-auto h-40 w-auto"
          />
          <h3 className="text-lg font-medium pt-8 pb-2">
            {product.name[lang]}
          </h3>
          <p className="text-sm line-clamp-4 h-[6em]">
            {product.description[lang]}
          </p>
          <p className="absolute top-8 right-8 font-semibold text-xl text-cyan-700">
            {monetize(product.price)}
          </p>
          <button
            onClick={() => handleAddToCard(product)}
            className="bg-cyan-500 text-white rounded-lg my-4 py-2 px-4 font-bold hover:bg-teal-600"
          >
            Add to card
          </button>
        </div>
      ))}
    </section>
  );
};
export default Products;
