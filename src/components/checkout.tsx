"use client";

import { getLang, monetize } from "@/js/helpers";
import Brand from "./brand";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface CheckoutProps {
  setCheckout: Function;
  value?: number;
  list: any;
}

const text: any = {
  payment: { en: "Payment success", es: "El pago fue realizado con exito" },
  name: { en: "Name", es: "Nombre" },
  client: { en: "Costumer name", es: "Nombre del cliente" },
  email: { en: "Email", es: "Email" },
  address: { en: "Address", es: "Direccion" },
  phone: { en: "Phone", es: "Telefono" },
  city: { en: "City", es: "Ciudad" },
  postal: { en: "Postal code", es: "Codigo postal" },
  card: { en: "Card details", es: "Información de tarjeta" },
  read: { en: "I have read the", es: "Confirmo que he leido los" },
  terms: { en: "terms and conditions", es: "terminos y condiciones" },
  pay: { en: "Pay", es: "Pagar" },
};

const Checkout: React.FC<CheckoutProps> = ({
  setCheckout,
  value = 0,
  list,
}) => {
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const lang = getLang();

  const handlePayment = (e: any) => {
    e.preventDefault();
    setError1("");
    setError2("");
    setLoading(true);

    const {
      name: { value: name },
      email: { value: email },
      phone: { value: phone },
      address: { value: address },
      postal: { value: postal },
      city: { value: city },
      card: { value: card },
      expiry: { value: expiry },
      cvv: { value: cvv },
    } = e.target.elements;

    axios
      .post("/api/charge", {
        value,
        name,
        email,
        phone,
        address,
        postal,
        city,
        card,
        expiry,
        cvv,
        list,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.object === "error") {
          setError1(res.data.merchant_message);
          setError2(res.data.user_message);
        } else {
          //TODO: Send sucessfull order to DB
          setSuccess(true);
          setMsg1(res.data.merchant_message);
          setMsg2(res.data.user_message);
        }
        console.log(res);
      });
  };

  console.log(list);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full justify-center items-center flex bg-cyan-800/70">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => setCheckout(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="px-6 py-6 lg:px-8">
            <div className="flex justify-between items-center pt-2 pb-4">
              <Brand />
              {!success && (
                <h3 className="pr-4 font-bold text-cyan-700">
                  Total: {monetize(value)}
                </h3>
              )}
            </div>
            {success ? (
              <p className="text-center">{text.payment[lang]}</p>
            ) : (
              <form className="space-y-6" action="#" onSubmit={handlePayment}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {text.name[lang]}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder={text.client[lang]}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {text.email[lang]}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {text.address[lang]}
                    </label>
                    <input
                      type="card"
                      name="phone"
                      id="phone"
                      className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.phone[lang]}
                      required
                    />
                    <input
                      type="card"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.address[lang]}
                      required
                    />
                  </div>
                  <div className="flex justify-between gap-8 mt-4">
                    <input
                      type="tel"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.city[lang]}
                      required
                    />
                    <input
                      type="tel"
                      name="postal"
                      id="postal"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.postal[lang]}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {text.card[lang]}
                    </label>
                    <input
                      type="card"
                      name="card"
                      id="card"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="#### #### #### ####"
                      required
                    />
                  </div>
                  <div className="flex justify-between gap-8 mt-3">
                    <input
                      type="tel"
                      name="expiry"
                      id="expiry"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="MM/YY"
                      data-mask="##/##"
                      required
                    />
                    <input
                      type="tel"
                      name="cvv"
                      id="cvv"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="CVV"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {text.read[lang]}
                      <Link
                        href="/terms"
                        className="text-cyan-700 hover:underline dark:text-cyan-500"
                      >
                        {" "}
                        {text.terms[lang]}
                      </Link>
                    </label>
                  </div>
                </div>
                {error1 && (
                  <p className="text-sm text-red-800 text-center">{error1}</p>
                )}
                {error2 && (
                  <p className="text-sm text-red-800 text-center">{error2}</p>
                )}
                {msg1 && (
                  <p className="text-sm text-green-800 text-center">{msg1}</p>
                )}
                {msg2 && (
                  <p className="text-sm text-green-800 text-center">{msg2}</p>
                )}
                <button
                  type="submit"
                  className="relative w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
                  disabled={loading}
                >
                  {loading && (
                    <BiLoaderAlt className="absolute bottom-2 animate-spin text-2xl" />
                  )}
                  {text.pay[lang]}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
