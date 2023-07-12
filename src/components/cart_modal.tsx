"use client";
import Link from "next/link";

const text: any = {
  add: {
    en: " was added to your cart, keep",
    es: " fue anadido a tu carrito de compras, sigue",
  },
  shopping: {
    en: " shopping ",
    es: " comprando ",
  },
  go: {
    en: "or go to your ",
    es: "o ve a tu ",
  },
  cart: {
    en: "cart",
    es: "carrito",
  },
};

const CartModal = ({
  product,
  setModal,
  lang,
}: {
  product: any;
  setModal: any;
  lang: any;
}) => {
  return (
    <div
      onClick={() => setModal(false)}
      className="animate-fade-in fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full flex items-center justify-center bg-cyan-500/60"
    >
      <div
        className="p-4 mb-4 text-sm rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="font-medium">{product?.name[lang]}</span>
        {text.add[lang]}
        <span
          className="text-cyan-600 cursor-pointer"
          onClick={() => setModal(false)}
        >
          {text.shopping[lang]}
        </span>
        {text.go[lang]}
        <Link href="/cart" className="text-cyan-600 cursor-pointer">
          {text.cart[lang]}
        </Link>
      </div>
    </div>
  );
};

export default CartModal;
