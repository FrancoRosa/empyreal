const axios = require("axios");
const pub_key = "pk_test_XSbUCRi7oRuKojBu";

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "bad request" }));
}

export async function POST(request: Request) {
  let payload = { message: "Request timeout" };
  // {
  //   value: 45,
  //   name: 'MON 1102',
  //   email: 'km115.franco@gmail.com',
  //   phone: '984894723',
  //   address: 'Jayton',
  //   postal: '550436',
  //   city: 'CUSCO',
  //   card: '1234123412341234',
  //   expiry: '12/12',
  //   cvv: '123'
  // }

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
  } = body;

  const data = {
    card_number: card,
    expiration_month: expiry.slice(0, 2),
    expiration_year: expiry.at(-2) + expiry.at(-1),
    cvv,
    email,
    metadata: { name, phone, address, postal, city },
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
        Authorization: `Bearer ${pub_key}`,
        "Content-Type": "application/json",
      },
      data: {
        amount: value,
        currency_code: "USD",
        email,
        source_id: id,
        capture: true,
        description: "Prueba",
        installments: 2,
        metadata,
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

    try {
      const charge_result = await axios(options);
      console.log(charge_result.data);
    } catch (error) {
      payload = error.response.data;
      console.log(error.response);
    }
  } catch (error) {
    payload = error.response.data;
  }

  return new Response(JSON.stringify(payload, null, 2));
}
