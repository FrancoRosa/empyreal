"use client";

import { getLang, monetize } from "@/js/helpers";
import Brand from "./brand";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { setTimeout } from "timers";

interface CheckoutProps {
  setCheckout: Function;
  value?: number;
  list: any;
}

const text: any = {
  payment: { en: "Payment success", es: "El pago fue realizado con exito" },
  name: { en: "Name", es: "Nombre" },
  fname: { en: "First name", es: "Nombre" },
  lname: { en: "Last name", es: "Apellido" },
  client: { en: "Costumer name", es: "Nombre del cliente" },
  email: { en: "Email", es: "Email" },
  user_id: { en: "Identification (Id)", es: "Itentificacion (Id)" },
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
  const [formLoad, setFormLoad] = useState(true);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [session, setSession] = useState({});
  const lang = getLang();
  const [loadJS, setLoadJS] = useState(false);
  const [cardOK, setCardOK] = useState(false);

  const handlePayment = (e: any) => {
    e.preventDefault();
    console.log(cardOK);

    // setError1("");
    // setError2("");

    // setLoading(true);

    // const {
    //   fname: { value: fname },
    //   lname: { value: lname },
    //   email: { value: email },
    //   phone: { value: phone },
    //   address: { value: address },
    //   postal: { value: postal },
    //   city: { value: city },
    //   user_id: { value: user_id },
    // } = e.target.elements;
    // console.log({
    //   fname,
    //   lname,
    //   email,
    //   phone,
    //   address,
    //   postal,
    //   city,
    //   user_id,
    // });
    // console.log({ list });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  };

  useEffect(() => {
    console.log({ cardOK });
  }, [cardOK]);

  useEffect(() => {
    console.log("RENDERING CHECKOUT");

    const lib = {
      test: "https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
      prod: "https://static-content.vnforapps.com/elements/v1/payform.min.js",
    };

    if (window && document && !loadJS) {
      window.amount = value.toFixed(2);
      window.channel = "web";
      window.purchase = "123456789";
      window.dcc = false;

      console.log("inject script");

      const script = document.createElement("script");
      const body = document.getElementsByTagName("body")[0];
      script.src = lib.test;
      body.appendChild(script);
      script.addEventListener("load", () => {
        console.log("..... LOADED JS");
      });
      axios
        .post("/api/session", { amount: value })
        .then((res) => {
          setSession(res.data);
          setLoadJS(true);
          console.log(res.data);
          window.configuration = {
            sessionkey: res.data.sessionKey,
            channel: "web",
            merchantid: 456879854,
            purchasenumber: window.purchase,
            amount: window.amount,
            callbackurl: "",
            language: "en",
            // font: "https://fonts.googleapis.com/css?family=Montserrat:400&display=swap",
            font: "https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap",
          };
          window.payform.setConfiguration(window.configuration);

          const elementStyles = {
            base: {
              color: "black",
              margin: "0",
              // width: '100% !important',
              // fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontSmoothing: "antialiased",
              placeholder: {
                color: "#999999",
              },
              autofill: {
                color: "#e39f48",
              },
            },
            invalid: {
              color: "#E25950",
              "::placeholder": {
                color: "#FFCCA5",
              },
            },
          };
          // Número de tarjeta
          window.cardNumber = window.payform.createElement(
            "card-number",
            {
              style: elementStyles,
              placeholder: "XXXX XXXX XXXX XXXX",
            },
            "txtNumeroTarjeta"
          );

          window.cardNumber.then((element) => {
            element.on("bin", function (data) {
              console.log("BIN: ", data);
            });

            element.on("dcc", function (data) {
              console.log("DCC", data);
              if (data != null) {
                var response = confirm(
                  "Usted tiene la opción de pagar su factura en: PEN " +
                    window.amount +
                    " o " +
                    data["currencyCodeAlpha"] +
                    " " +
                    data["amount"] +
                    ". Una vez haya hecho su elección, la transacción continuará con la moneda seleccionada. Tasa de cambio PEN a " +
                    data["currencyCodeAlpha"] +
                    ": " +
                    data["exchangeRate"] +
                    " \n \n" +
                    data["currencyCodeAlpha"] +
                    " " +
                    data["amount"] +
                    "\nPEN = " +
                    data["currencyCodeAlpha"] +
                    " " +
                    data["exchangeRate"] +
                    "\nMARGEN FX: " +
                    data["markup"]
                );
                if (response == true) {
                  window.dcc = true;
                } else {
                  window.dcc = false;
                }
              }
            });

            element.on("installments", function (data) {
              console.log("INSTALLMENTS: ", data);
              if (data != null && window.channel == "web") {
                window.credito = true;
                var cuotas = document.getElementById("cuotas");
                cuotas.style.display = "block";

                var select = document.createElement("select");
                select.setAttribute(
                  "class",
                  "form-control form-control-sm mb-4"
                );
                select.setAttribute("id", "selectCuotas");
                optionDefault = document.createElement("option");
                optionDefault.value = optionDefault.textContent = "Sin cuotas";
                select.appendChild(optionDefault);
                data.forEach(function (item) {
                  option = document.createElement("option");
                  option.value = option.textContent = item;
                  select.appendChild(option);
                });
                cuotas.appendChild(select);
              } else {
                window.credito = false;
                var cuotas = document.getElementById("selectCuotas");
                if (cuotas != undefined) {
                  cuotas.parentNode.removeChild(cuotas);
                }
              }
            });

            element.on("change", function (data) {
              console.log("CHANGE CARD: ", data);
              var cardText = document.getElementById("msjNroTarjeta");
              var cardExp = document.getElementById("msjFechaVencimiento");
              var cardCVV = document.getElementById("msjCvv");
              var status = false;

              const ccNum = document.getElementById("cc-number");
              ccNum?.addEventListener("input", (e) => {
                console.log("num:");
                console.log(e.target?.value);
              });
              const ccExp = document.getElementById("cc-exp");
              ccExp?.addEventListener("input", (e) => {
                console.log("exp:");
                console.log(e.target?.value);
              });
              const ccCvv = document.getElementById("cc-cvv");
              ccCvv?.addEventListener("input", (e) => {
                console.log("cvv:");
                console.log(e.target?.value);
              });

              console.log("Cool", cardText.value, cardExp.value, cardCVV.value);

              if (
                cardText.value !== "" &&
                cardExp.value !== "" &&
                cardCVV.value !== ""
              ) {
                status = true;
              } else {
                status = false;
              }
              cardText.style.display = "none";
              cardExp.style.display = "none";
              document.getElementById("msjCvv").style.display = "none";
              if (data.length != 0) {
                status = false;
                data.forEach(function (d) {
                  if (d["code"] == "invalid_number") {
                    cardText.style.display = "block";
                    cardText.innerText = d["message"];
                  }
                  if (d["code"] == "invalid_expiry") {
                    document.getElementById(
                      "msjFechaVencimiento"
                    ).style.display = "block";
                    cardExp.innerText = d["message"];
                  }
                  if (d["code"] == "invalid_cvc") {
                    cardCVV.style.display = "block";
                    cardCVV.innerText = d["message"];
                  }
                });
              }
              setCardOK(status);
            });
          });

          // Cvv2
          window.cardCvv = payform.createElement(
            "card-cvc",
            {
              style: elementStyles,
              placeholder: "CVV",
            },
            "txtCvv"
          );

          window.cardCvv.then((element) => {
            element.on("change", function (data) {
              console.log("CHANGE CVV2: ", data);
            });
          });

          // Fecha de vencimiento
          window.cardExpiry = payform.createElement(
            "card-expiry",
            {
              style: elementStyles,
              placeholder: "MM/AAAA",
            },
            "txtFechaVencimiento"
          );

          window.cardExpiry.then((element) => {
            element.on("change", function (data) {
              console.log("CHANGE F.V: ", data);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.fname[lang]}
                      required
                    />
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder={text.lname[lang]}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {text.user_id[lang]}
                    </label>
                    <input
                      type="tel"
                      name="user_id"
                      id="user_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="12345678"
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
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {text.phone[lang]}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder={text.phone[lang]}
                    required
                  />
                </div>
                <div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {text.address[lang]}
                    </label>
                    <input
                      type="tel"
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
                    <div className="flex justify-between gap-4 mt-3">
                      <div>
                        <div
                          id="txtNumeroTarjeta"
                          className="w-52 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        ></div>

                        <small
                          id="msjNroTarjeta"
                          className="text-xs text-red-700 border-solid border-2 border-red-400"
                        ></small>
                      </div>
                      <div>
                        <div
                          id="txtFechaVencimiento"
                          className="w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        ></div>

                        <small
                          id="msjFechaVencimiento"
                          className="text-xs text-red-700"
                        ></small>
                      </div>
                      <div>
                        <div
                          id="txtCvv"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-16 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        ></div>

                        <small
                          id="msjCvv"
                          className="text-xs text-red-700"
                        ></small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
                  <pre className="text-xs text-red-800 overflow-scroll">
                    {error2}
                  </pre>
                )}
                {msg1 && (
                  <p className="text-sm text-green-800 text-center capitalize">
                    {msg1}
                  </p>
                )}
                {msg2 && (
                  <pre className="text-xs text-green-800 overflow-scroll">
                    {msg2}
                  </pre>
                )}
                <button
                  type="submit"
                  className="relative w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600"
                  disabled={!cardOK || loading}
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
