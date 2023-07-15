import { setDBOrder } from "@/js/supabase";

const axios = require("axios");
const pub_key = process.env.PUB_KEY;
const prv_key = process.env.PRV_KEY;

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "bad request" }));
}

export async function POST(request: Request) {
  let payload = { message: "Request timeout" };

  const body = await request.json();
  const {
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
  } = body;

  const data = {
    card_number: card.replaceAll(" ", "").trim(),
    expiration_month: expiry.slice(0, 2),
    expiration_year: expiry.at(-2) + expiry.at(-1),
    cvv,
    email,
    metadata: {
      name,
      phone,
      address,
      postal,
      city,
    },
  };

  try {
    const token_result = await axios.post(
      "https://secure.culqi.com/v2/tokens",
      data,
      {
        headers: {
          Authorization: `Bearer ${pub_key}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { id, metadata } = token_result.data;

    const options = {
      method: "POST",
      url: "https://api.culqi.com/v2/charges",
      headers: {
        Authorization: `Bearer ${prv_key}`,
        "Content-Type": "application/json",
      },
      data: {
        amount: value * 100,
        currency_code: "PEN",
        email,
        source_id: id,
        capture: true,
        description: "Prueba",
        installments: 2,
        metadata,
        antifraud_details: {
          address,
          address_city: city,
          country_code: "US",
          first_name: name.split(" ")[0],
          last_name: name.split(" ")[1] || name,
          phone_number: phone,
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

    try {
      const charge_result = await axios(options);
      console.log(charge_result.data);
      payload = charge_result.data;
      setDBOrder(value, name, address, postal, city, email, list).then(
        (res) => {
          console.log(res);
          console.log("Order saved on DB");
        }
      );
    } catch (error: any) {
      payload = error.response.data;
      console.log(error.response.data);
    }
  } catch (error: any) {
    payload = error.response.data;
  }

  return new Response(JSON.stringify(payload, null, 2));
}
