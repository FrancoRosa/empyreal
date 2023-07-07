const axios = require("axios");
export async function GET(request: Request) {
  const data = {
    card_number: "4111111111111111",
    cvv: "123",
    expiration_month: 9,
    expiration_year: "2025",
    email: "ichard@piedpiper.com",
    metadata: { dni: "5831543" },
  };

  const result = await axios.post("https://secure.culqi.com/v2/tokens", data, {
    headers: {
      Authorization: "Bearer pk_test_XSbUCRi7oRuKojBu",
      "Content-Type": "application/json",
    },
  });
  console.log(result.data);

  return new Response(JSON.stringify(result.data));
}
