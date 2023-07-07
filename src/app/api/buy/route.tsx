const axios = require("axios");

export async function GET(request: Request) {
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

  const result = await axios(options);
  console.log(result.data);

  return new Response(JSON.stringify(result.data));
}
