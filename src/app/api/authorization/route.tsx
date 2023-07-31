import { NextRequest } from "next/server";
import { getAccessToken, getAuthorizationToken } from "../calls";

export async function POST(request: NextRequest) {
  const ip = request.ip || "24.252.107.29";
  console.log("ip:", request.ip, ip);
  let payload: any = { error: true, message: "unknown error" };
  const { transactionToken, amount, purchase } = await request.json();
  console.log("input data", { transactionToken, amount, purchase });
  try {
    const accessToken = await getAccessToken();
    console.log("access token: good");
    try {
      const authToken = await getAuthorizationToken(
        amount,
        purchase,
        transactionToken,
        accessToken.data
      );
      console.log("____ Good authorization");
      console.log(authToken.data);

      payload = authToken.data;
    } catch (err: any) {
      console.log("_____ERROR GENERATING AUTHORIZATION TOKEN");
      console.log(err.response.data);
      payload = {
        error: true,
        message: err.response.data,
        details: "Error generating authorization token",
      };
    }
  } catch (err: any) {
    console.log("_____ERROR GENETATING ACCESS TOLERN");
    console.log(err);
    payload = {
      error: true,
      message: err.response.data,
      details: "Error generating access token",
    };
  }

  return new Response(JSON.stringify(payload));
}
