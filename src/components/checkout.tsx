// @ts-nocheck
"use client";
import {
  formatDate,
  getLang,
  getPurchaseNum,
  isValidEmail,
  monetize,
  purchaseNum,
  toMinSec,
} from "@/js/helpers";
import Brand from "./brand";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useGlobalContext } from "@/context/store";
import { useRouter } from "next/navigation";

const text: any = {
  paymentSuccess: {
    en: "Payment success",
    es: "El pago fue realizado con exito",
  },
  paymentFail: { en: "Payment fail", es: "Pago fallido" },
  paymentFailMsg: {
    en: "It was not possible to proceed with payment",
    es: "No fue posible realizar el pago",
  },
  paymentSuccessMsg: {
    en: "You will receive a confirmation email soon with the details of your order",
    es: "Pronto recibira un email con la informacion y confirmacion de su compra",
  },
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
  const { setCart } = useGlobalContext();
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [handlingPayment, setHandlingPayment] = useState(false);
  const [formLoad, setFormLoad] = useState(false);
  const [error1, setError1] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorPayload, setErrorPayload] = useState();
  const [successPayload, setSuccessPayload] = useState();
  const [session, setSession] = useState({});
  const [loadJS, setLoadJS] = useState(false);
  const lang = getLang();
  const [time, setTime] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [form, setForm] = useState({ user_id: "", email: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setForm((f) => ({ ...f, [id]: value }));
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    setHandlingPayment(true);
    setError1("");
    // setError2("");

    setLoading(true);

    const {
      fname: { value: fname },
      lname: { value: lname },
      email: { value: email },
      phone: { value: phone },
      address: { value: address },
      postal: { value: postal },
      city: { value: city },
      user_id: { value: user_id },
      company: { value: company },
    } = e.target.elements;
    console.log({
      fname,
      lname,
      email,
      phone,
      address,
      postal,
      city,
      user_id,
      company,
    });

    const data = {
      name: fname,
      lastName: lname,
      email,
      alias: "KS",
      phone,
      currencyConversion: false,
      recurrence: false,
    };

    console.log(window.cardNumber, window.cardExpiry, window.cardCvv);
    window.payform
      .createToken([window.cardNumber, window.cardExpiry, window.cardCvv], data)
      .then((data) => {
        console.log("data token:", data);
        console.log(
          "BIN: " +
            data.bin +
            "\ntransactionToken: " +
            data.transactionToken +
            "\nchannel: " +
            data.channel
        );
        axios
          .post("/api/authorization", {
            transactionToken: data.transactionToken,
            amount: value,
            purchase: window.purchase,
          })
          .then((res) => {
            console.log("auth response");
            console.log(res.data);
            if ("fulfillment" in res.data) {
              setSuccessPayload({
                status: res.data.dataMap.STATUS,
                orderNum: window.purchase,
                fname,
                lname,
                date: res.data.dataMap.TRANSACTION_DATE,
                amount: res.data.dataMap.AMOUNT,
                currency: res.data.order.currency,
                order: list,
                card: res.data.dataMap.CARD,
                brand: res.data.dataMap.BRAND,
              });
              // setCart([]);
              setSuccess(true);
            }
            if (res.data.error) {
              setErrorPayload({
                orderNum: window.purchase,
                date: res.data.message.data.TRANSACTION_DATE,
                description: res.data.message.data.ACTION_DESCRIPTION,
              });
            }
            setLoading(false);
            setSuccess(true);
          })
          .catch((res) => {
            console.log(res.data);
            setLoading(false);
          });
      })
      .catch((res) => {
        console.log(res);
        setError1(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (form.user_id.length > 1 && isValidEmail(form.email)) {
      const lib = {
        test: "https://pocpaymentserve.s3.amazonaws.com/payform.min.js",
        prod: "https://static-content.vnforapps.com/elements/v1/payform.min.js",
      };

      if (window && document && !loadJS) {
        setFormLoad(true);
        window.amount = value.toFixed(2);
        window.channel = "web";
        window.purchase = getPurchaseNum();
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
              console.log("... form loaded");

              setFormLoad(false);

              element.on("bin", function (data: any) {
                console.log("BIN: ", data);
              });

              // element.on("dcc", function (data: any) {
              //   console.log("DCC", data);
              //   if (data != null) {
              //     var response = confirm(
              //       "Usted tiene la opción de pagar su factura en: PEN " +
              //         window.amount +
              //         " o " +
              //         data["currencyCodeAlpha"] +
              //         " " +
              //         data["amount"] +
              //         ". Una vez haya hecho su elección, la transacción continuará con la moneda seleccionada. Tasa de cambio PEN a " +
              //         data["currencyCodeAlpha"] +
              //         ": " +
              //         data["exchangeRate"] +
              //         " \n \n" +
              //         data["currencyCodeAlpha"] +
              //         " " +
              //         data["amount"] +
              //         "\nPEN = " +
              //         data["currencyCodeAlpha"] +
              //         " " +
              //         data["exchangeRate"] +
              //         "\nMARGEN FX: " +
              //         data["markup"]
              //     );
              //     if (response == true) {
              //       window.dcc = true;
              //     } else {
              //       window.dcc = false;
              //     }
              //   }
              // });

              // element.on("installments", function (data: any) {
              //   console.log("INSTALLMENTS: ", data);
              //   if (data != null && window.channel == "web") {
              //     window.credito = true;
              //     var cuotas = document.getElementById("cuotas");
              //     cuotas.style.display = "block";

              //     var select = document.createElement("select");
              //     select.setAttribute(
              //       "class",
              //       "form-control form-control-sm mb-4"
              //     );
              //     select.setAttribute("id", "selectCuotas");
              //     optionDefault = document.createElement("option");
              //     optionDefault.value = optionDefault.textContent = "Sin cuotas";
              //     select.appendChild(optionDefault);
              //     data.forEach(function (item) {
              //       option = document.createElement("option");
              //       option.value = option.textContent = item;
              //       select.appendChild(option);
              //     });
              //     cuotas.appendChild(select);
              //   } else {
              //     window.credito = false;
              //     var cuotas = document.getElementById("selectCuotas");
              //     if (cuotas != undefined) {
              //       cuotas.parentNode.removeChild(cuotas);
              //     }
              //   }
              // });

              element.on("change", function (data) {
                console.log("CHANGE CARD: ", data);
                const cardText: any = document.getElementById("msjNroTarjeta");
                const cardExp: any = document.getElementById(
                  "msjFechaVencimiento"
                );
                const cardCVV: any = document.getElementById("msjCvv");
                cardText.innerText = "";
                cardExp.innerText = "";
                cardCVV.innerText = "";
                if (data.length != 0) {
                  data.forEach(function (d) {
                    if (d["code"] == "invalid_number") {
                      cardText.style.display = "block";
                      cardText.innerText = d["message"];
                    }
                    if (d["code"] == "invalid_expiry") {
                      cardExp.style.display = "block";
                      cardExp.innerText = d["message"];
                    }
                    if (d["code"] == "invalid_cvc") {
                      cardCVV.style.display = "block";
                      cardCVV.innerText = d["message"];
                    }
                  });
                }
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

            window.cardExpiry = payform.createElement(
              "card-expiry",
              {
                style: elementStyles,
                placeholder: "MM/AAAA",
              },
              "txtFechaVencimiento"
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  useEffect(() => {
    if (session.expirationTime) {
      const timeLeft = session.expirationTime - time;
      setRemaining(timeLeft);
      if (timeLeft < 0 && !handlingPayment) {
        setCheckout(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full justify-center items-center flex bg-cyan-800/70">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => {
              setCheckout(false);
              if (successPayload) {
                setCart([]);
                route.push("/");
              }
            }}
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
              <>
                {successPayload && (
                  <>
                    <p className="text-center py-4">
                      {text.paymentSuccess[lang]}!
                    </p>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Status
                            </th>
                            <td className="px-6 py-2">
                              {successPayload.status}
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Order number
                            </th>
                            <td className="px-6 py-2">
                              {successPayload.orderNum}
                            </td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Client
                            </th>
                            <td className="px-6 py-2">
                              {successPayload.fname} {successPayload.lname}
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Date
                            </th>
                            <td className="px-6 py-2">
                              {formatDate(successPayload.date)}
                            </td>
                          </tr>

                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Amount
                            </th>
                            <td className="px-6 py-2">
                              {successPayload.amount} {successPayload.currency}
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Card
                            </th>
                            <td className="px-6 py-2">
                              {successPayload.card}{" "}
                              <span className="capitalize">
                                ({successPayload.brand})
                              </span>
                            </td>
                          </tr>
                          <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Order details
                            </th>
                            <td className="px-6 py-2">
                              <table>
                                <thead>
                                  <th>Item</th>
                                  <th>Qty.</th>
                                </thead>
                                <tbody>
                                  {successPayload.order.map((m, index) => (
                                    <tr key={index}>
                                      <td>{m.name[lang]}</td>
                                      <td className="text-right">
                                        {m.quantity}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-center mt-8">
                      {text.paymentSuccessMsg[lang]}
                    </p>
                  </>
                )}
                {errorPayload && (
                  <>
                    <p className="text-center py-4">{text.paymentFail[lang]}</p>
                    <p className="text-xs text-center text-red-600 mb-4">
                      {text.paymentFailMsg[lang]}
                    </p>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Description
                            </th>
                            <td className="px-6 py-2">
                              {errorPayload.description}
                            </td>
                          </tr>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Order number
                            </th>
                            <td className="px-6 py-2">
                              {errorPayload.orderNum}
                            </td>
                          </tr>

                          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              Date
                            </th>
                            <td className="px-6 py-2">
                              {formatDate(errorPayload.date)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
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
                      value={form.user_id}
                      onChange={handleChange}
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
                      value={form.email}
                      onChange={handleChange}
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Company name"
                    required
                  />
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
                      value="Cusco"
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
                <div className={!loadJS && "hidden"}>
                  <div className={formLoad && "hidden"}>
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
                          className="text-xs text-red-700"
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
                          className="overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-16 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        ></div>

                        <small
                          id="msjCvv"
                          className="text-xs text-red-700"
                        ></small>
                      </div>
                    </div>
                  </div>
                  {formLoad && (
                    <div className="flex justify-center my-0">
                      <BiLoaderAlt className="animate-spin text-2xl text-center" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
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

                <button
                  type="submit"
                  className="relative w-full text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 disabled:bg-gray-600 my-0"
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
      <p className="absolute top-1 left-1 text-xs text-cyan-300/25">
        {toMinSec(remaining)}
      </p>
    </div>
  );
};
export default Checkout;
