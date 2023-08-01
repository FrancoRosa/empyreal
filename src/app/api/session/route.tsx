import { NextRequest } from "next/server";
import { getAccessToken, getSessionToken } from "../calls";

export async function POST(request: NextRequest) {
  const ip = request.ip || "24.252.107.29";
  console.log("ip:", request.ip, ip);
  let payload: any = { error: true, message: "unknown error" };
  const { amount, email, id } = await request.json();

  try {
    const accessToken = await getAccessToken();
    try {
      const sessionToken = await getSessionToken(
        accessToken.data,
        amount,
        email,
        id,
        ip
      );
      payload = sessionToken.data;
    } catch (err: any) {
      console.log("_____ERROR GENETATING SEESION TOLERN");
      console.log(err);
      payload = {
        error: true,
        message: err.response.data,
        details: "Error generating session token",
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
