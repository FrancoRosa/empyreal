"use client";
import { getLang } from "@/js/helpers";
import products from "@/js/products";
import Product from "@/components/product";
import { useState } from "react";
import CartModal from "@/components/cart_modal";
import Link from "next/link";

const text: any = {
  notFound: {
    en: "Product was not found, go back to ",
    es: "El producto no fue encontrado, regresar a ",
  },
  shop: {
    en: "shop",
    es: "productos",
  },
};

export default function ShopItem({ params }: { params: { id: string } }) {
  const product: any = products.find((p) => p.id === parseInt(params.id));
  const lang = getLang();

  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      {modal && <CartModal product={product} setModal={setModal} lang={lang} />}

      <section className="min-h-[calc(100vh-25em)] flex items-center justify-center">
        {product ? (
          <Product product={product} lang={lang} setModal={setModal} />
        ) : (
          <h2 className="text-center">
            {text.notFound[lang]}
            <Link className="text-cyan-600" href="/shop">
              {text.shop[lang]}
            </Link>
          </h2>
        )}
      </section>
    </>
  );
}
