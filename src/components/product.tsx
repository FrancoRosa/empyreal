"use client";

import Image from "next/image";
import { useGlobalContext } from "@/context/store";
import { ProductType } from "@/js/types";
import { images } from "@/js/images";
import { monetize } from "@/js/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const text: any = {
  add: {
    en: "Add to cart",
    es: "Añadir al carrito",
  },
  back: {
    en: "Back",
    es: "Regresar",
  },
};

const Product = ({
  product,
  lang,
  setModal,
}: {
  product: any;
  lang: string;
  setModal: any;
}) => {
  const router = useRouter();
  const [units, setUnits] = useState<number>(1);
  const { cart, setCart } = useGlobalContext();

  const handleAddToCard = (product: ProductType) => {
    const newCart = [...cart];
    setModal(true);
    for (let index = 0; index < units; index++) {
      newCart.push(product);
    }
    setCart(newCart);
  };

  return (
    <section className="flex flex-wrap justify-around gap-8">
      <div
        key={product.id}
        className="relative text-center shadow-lg p-10 rounded-xl my-8 mx-4 h-[440px] text-sm"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl pt-4 pb-2 text-ellipsis line-clamp-2 ">
            {product.name[lang]}
          </h3>
          <p className="font-semibold text-xl text-cyan-700">
            {monetize(product.price)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <Image
            src={images[product.image]}
            alt="board"
            className="mx-auto h-56 w-56 p-4"
          />
          <p className="text-sm line-clamp-6 h-[10em] text-justify">
            {product.description[lang]}
          </p>
        </div>

        <div className="flex justify-around">
          <button
            onClick={() => router.back()}
            className="text-cyan-500 w-32 bg-white rounded-lg my-4 py-2 px-4 font-bold hover:bg-teal-50 border-solid border-2 border-cyan-500"
          >
            {text.back[lang]}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setUnits(units - 1)}
              disabled={units < 2}
              title="Subtract"
              className="text-cyan-600  m-2 text-xl disabled:text-gray-400"
            >
              <AiFillMinusCircle />
            </button>
            <p>{units}</p>
            <button
              onClick={() => setUnits(units + 1)}
              title="Add"
              className="text-cyan-600 m-2 text-xl"
            >
              <AiFillPlusCircle />
            </button>
          </div>
          <button
            onClick={() => handleAddToCard(product)}
            className="bg-cyan-500 w-32 text-white rounded-lg my-4 py-2 px-4 font-bold hover:bg-teal-600"
          >
            {text.add[lang]}
          </button>
        </div>
      </div>
    </section>
  );
};
export default Product;
