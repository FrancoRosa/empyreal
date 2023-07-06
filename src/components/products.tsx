"use client";

import Image from "next/image";

import { useGlobalContext } from "@/context/store";
import { ProductType } from "@/js/types";
import { images } from "@/js/images";
const Products = () => {
  const { cart, setCart } = useGlobalContext();

  const products = [
    {
      id: 1,
      name: "RTK enabled tracking board",
      description:
        "Tracking element to achieve centimeter level accuracy, USB based ready to connect to any display or software",
      image: "boards",
      price: 10,
      price_hidden: true,
    },
    {
      id: 2,
      name: "GNSS Antenna",
      description:
        "The GNSS antenna is engineered to provide high-quality reception of satellite signals, even in challenging environments. Its compact and rugged design allows for easy installation on various platforms, including vehicles, buildings, and surveying equipment",
      image: "antenna1",
      price: 20,
    },
    {
      id: 3,
      name: "Correction stream 1 month",
      description:
        "Stand alone hardware can provide up meter level accuracy to improve this a correction stream from a static base is required then cm level accuracy is achieved",
      image: "stream",
      price: 10,
    },
    {
      id: 4,
      name: "Coffee",
      description:
        "Keep your boss happy by giving some coffee from time to time, buy high quality coffee here",
      image: "coffee",
      price: 200,
    },
    {
      id: 5,
      name: "Stream",
      description: "Buy your data streaming service",
      image: "stream",
      price: 200,
    },
  ];

  const handleAddToCard = (product: ProductType) => {
    const newCart = [...cart];
    newCart.push(product);
    setCart(newCart);
  };

  return (
    <section className="lg:flex gap-10">
      {products.map((product, index) => (
        <div
          key={index}
          className="text-center shadow-lg p-10 rounded-xl my-10"
        >
          <Image
            src={images[product.image]}
            alt="board"
            className="mx-auto  h-40 w-auto"
          />
          <h3 className="text-lg font-medium pt-8 pb-2">{product.name}</h3>
          <p className="py-2">{product.description}</p>
          <button
            onClick={() => handleAddToCard(product)}
            className="bg-cyan-500 text-white rounded-lg py-2 px-4 font-bold hover:bg-teal-600"
          >
            Add to card
          </button>
        </div>
      ))}
    </section>
  );
};
export default Products;
