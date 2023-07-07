"use client";

import axios from "axios";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Checkout() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [token, setToken] = useState("");

  const cardData = {
    card_number: "4111111111111111",
    cvv: "123",
    expiration_month: 9,
    expiration_year: "2025",
    email: "ichard@piedpiper.com",
    metadata: { dni: "5831543" },
  };

  const handleButtonCard = () => {
    setLoading1(true);

    axios
      .post("https://secure.culqi.com/v2/tokens", cardData, {
        headers: {
          Authorization: "Bearer pk_test_XSbUCRi7oRuKojBu",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { id } = response.data;
        console.log(response.data);
        console.log({ id });
        setToken(id);
        setLoading1(false);
      })
      .catch((error) => {
        setLoading1(false);

        console.error(error);
      });
  };

  const handleButtonBuy = () => {
    console.log(token);
    setLoading2(true);
    const options = {
      method: "POST",
      url: "https://api.culqi.com/v2/charges",
      headers: {
        Authorization: "Bearer pk_test_XSbUCRi7oRuKojBu",
        "Content-Type": "application/json",
      },

      data: {
        amount: 10000,
        currency_code: "PEN",
        email: "richard@piedpiper.com",
        source_id: "tkn_test_701ug3CDNJOAt5Q6, crd_test_TWsfemI22ypplGK6",
        capture: true,
        description: "Prueba",
        installments: 2,
        metadata: { dni: "70202170" },
        antifraud_details: {
          address: "Avenida Lima 213",
          address_city: "Lima",
          country_code: "PE",
          first_name: "Richard",
          last_name: "Hendricks",
          phone_number: "999999987",
        },
        authentication_3DS: {
          xid: "Y2FyZGluYWxjb21tZXJjZWF1dGg=",
          cavv: "AAABAWFlmQAAAABjRWWZEEFgFz+=",
          directoryServerTransactionId: "88debec7-a798-46d1-bcfb-db3075fedb82",
          eci: "06",
          protocolVersion: "2.1.0",
        },
      },
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-cyan-50">
      <button
        onClick={handleButtonCard}
        disabled={loading1}
        className="flex gap-4 justify-center items-center rounded-lg px-4 py-2 bg-cyan-600 text-white w-60"
      >
        {loading1 && <ImSpinner8 className="animate-spin" />}
        Get token card
      </button>
      <p>{token || "token"}</p>
      <hr />
      <button
        onClick={handleButtonBuy}
        disabled={loading2}
        className="flex gap-4 justify-center items-center rounded-lg px-4 py-2 bg-cyan-600 text-white w-60"
      >
        {loading2 && <ImSpinner8 className="animate-spin" />}
        Buy
      </button>
    </section>
  );
}
