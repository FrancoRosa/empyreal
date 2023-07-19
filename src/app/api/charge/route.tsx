// import { setDBOrder } from "@/js/supabase";

const axios = require("axios");
const acc_token = process.env.ACC_TKN;

const sanitize = (txt: string) => {
  return txt.replaceAll(" ", "").trim();
};

const generateCardToken = async (
  card: string,
  expiration: string,
  cvv: string,
  name: string,
  user_id: string
) => {
  const url = "https://api.mercadopago.com/v1/card_tokens";

  const cardData = {
    card_number: card,
    expiration_month: parseInt(expiration.slice(0, 2)),
    expiration_year: 2000 + parseInt(expiration.slice(-2)),
    security_code: cvv,
    cardholder: {
      name: name,
      identification: {
        number: user_id,
      },
    },
  };

  return await axios.post(url, cardData, {
    headers: {
      Authorization: `Bearer ${acc_token}`,
    },
  });
};

const createPayment = async (
  card_token: string,
  name: string,
  value: string,
  phone: string,
  address: string,
  postal: string,
  city: string,
  email: string,
  issuer: string
) => {
  return await axios.post(
    "https://api.mercadopago.com/v1/payments",
    {
      additional_info: {
        items: [
          {
            id: "MLB2907679857",
            title: "Point Mini",
            description:
              "Producto Point para cobros con tarjetas mediante bluetooth",
            picture_url:
              "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
            category_id: "electronics",
            quantity: 1,
            unit_price: parseFloat(value),
          },
        ],
        payer: {
          first_name: name.split(" ")[0],
          last_name: name.split(" ")[1] || "",
          phone: {
            area_code: 11,
            number: phone,
          },
          address: {
            zip_code: postal,
            street_name: address + "\n" + city,
          },
        },
        shipments: {
          receiver_address: {
            zip_code: postal,
            state_name: city,
            city_name: city,
            street_name: address,
            street_number: 0,
          },
        },
      },
      description: "Payment for product",
      external_reference: "MP0001",
      installments: 1,
      metadata: {},
      payer: {
        entity_type: "individual",
        type: "customer",
        identification: {},
        email,
      },
      payment_method_id: issuer,
      token: card_token,
      transaction_amount: value,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acc_token}`,
      },
    }
  );
};

export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "bad request" }));
}

export async function POST(request: Request) {
  const body = await request.json();
  let payload = {
    data: null,
    error: "api issue",
    message: "general error in the api",
  };
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
    issuer,
    user_id,
    list,
  } = body;

  try {
    const token_result = await generateCardToken(
      sanitize(card),
      sanitize(expiry),
      sanitize(cvv),
      name,
      sanitize(user_id)
    );

    const card_token = token_result.data?.id;
    try {
      const payment_result = await createPayment(
        card_token,
        name,
        value,
        phone,
        address,
        postal,
        city,
        email,
        issuer
      );
      payload = payment_result.data;
    } catch (error: any) {
      console.log(error.response.data);
      console.log("##### ERROR PROCESSING PAYMENT");
      payload = error.response.data;
    }
  } catch (error: any) {
    console.log(error.response.data);
    console.log("#### ERROR PROCESSING CARD");
    payload = error.response.data;
  }

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(payload);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

  return new Response(JSON.stringify(payload));
}
