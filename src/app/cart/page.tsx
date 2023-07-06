"use client";

import { useGlobalContext } from "@/context/store";

export default function Cart() {
  const { cart } = useGlobalContext();
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
    return products;
  };
  return <pre>{JSON.stringify(productList(cart), null, 2)}</pre>;
}
