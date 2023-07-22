import { NextRequest } from "next/server";

const axios = require("axios");
const user = process.env.VISA_USR;
const pass = process.env.VISA_PSS;
const mrch = process.env.VISA_COM;

const environment = "testing";
const urls = {
  testing: {
    accessToken:
      "https://apisandbox.vnforappstest.com/api.security/v1/security",
    sessionToken:
      "https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session",
    authorization:
      "https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce",
  },
  production: {
    accessToken: "https://apiprod.vnforapps.com/api.security/v1/security",
    sessionToken:
      "https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session",
    authorization:
      "https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce",
  },
};

const getAccessToken = async () => {
  const url = urls[environment].accessToken;
  const authHeader = Buffer.from(`${user}:${pass}`).toString("base64");

  const options = {
    headers: {
      Authorization: `Basic ${authHeader}`,
    },
  };
  return axios.get(url, options);
};

const getSessionToken = async (
  accessToken: string,
  amount: any,
  ip: string | null
) => {
  const url = urls[environment].sessionToken + "/" + mrch;
  const options = {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  };
  const data = {
    channel: "web",
    amount,
    recurrenceMaxAmount: null,
    antifraud: {
      clientIp: ip,
    },
  };
  return axios.post(url, data, options);
};

export async function POST(request: NextRequest) {
  const ip = request.ip || "24.252.107.29";
  let payload: any = { error: true, message: "unknown error" };
  const { amount } = await request.json();
  try {
    const accessToken = await getAccessToken();
    try {
      const sessionToken = await getSessionToken(accessToken.data, amount, ip);
      payload = sessionToken.data.sessionKey;
    } catch (err: any) {
      payload = {
        error: true,
        message: err.response.data,
        details: "Error generating session token",
      };
    }
  } catch (err: any) {
    payload = {
      error: true,
      message: err.response.data,
      details: "Error generating access token",
    };
  }

  return new Response(payload);
}
