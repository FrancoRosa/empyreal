"use client";

import { monetize } from "@/js/helpers";
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

const Checkout: React.FC<CheckoutProps> = ({
  setCheckout,
  value = 0,
  list,
}) => {
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

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
      })
      .then((res) => {
        setLoading(false);
        if (res.data.object === "error") {
          setError1(res.data.merchant_message);
          setError2(res.data.user_message);
          setTimeout(() => {
            setSuccess(true);
            setError1("");
            setError1("");
          }, 3000);
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
              <p className="text-center">Payment success</p>
            ) : (
              <form className="space-y-6" action="#" onSubmit={handlePayment}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Costumer Name"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
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
                      Your address information
                    </label>
                    <input
                      type="card"
                      name="phone"
                      id="phone"
                      className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Phone"
                      required
                    />
                    <input
                      type="card"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="flex justify-between gap-8 mt-4">
                    <input
                      type="tel"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="City"
                      required
                    />
                    <input
                      type="tel"
                      name="postal"
                      id="postal"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Postal code"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Card details
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
                      I have read the{" "}
                      <Link
                        href="/terms"
                        className="text-cyan-700 hover:underline dark:text-cyan-500"
                      >
                        terms and conditions
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
                <button
                  type="submit"
                  className="relative w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
                  disabled={loading}
                >
                  {loading && (
                    <BiLoaderAlt className="absolute bottom-2 animate-spin text-2xl" />
                  )}
                  Pay
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
