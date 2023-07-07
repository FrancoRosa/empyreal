"use client";
import { useEffect } from "react";

export default function Checkout() {
  const handleButton = () => {
    console.log("test");
    const data = JSON.stringify({
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: 9,
      expiration_year: "2020",
      email: "ichard@piedpiper.com",
      metadata: {
        dni: "5831543",
      },
    });

    fetch("https://secure.culqi.com/v2/tokens", {
      method: "POST",
      headers: {
        Authorization: "Bearer pk_test_UTCQSGcXW8bCyU59",
        "Content-Type": "application/json",
      },
      body: data,
      mode: "cors",
    })
      .then((response) => {
        console.log({ response });
        response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <section className="min-h-screen flex flex-col justify-center bg-cyan-50">
      <button
        onClick={handleButton}
        className="rounded-lg px-4 py-2 bg-cyan-600 text-white"
      >
        Press here
      </button>
    </section>
  );
}
