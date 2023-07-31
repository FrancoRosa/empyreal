const axios = require("axios");
const user = process.env.VISA_USR;
const pass = process.env.VISA_PSS;
const merId = process.env.VISA_COM;
const environment = process.env.VISA_ENV || "testing";

const urls = (endpoint, env = environment) => {
  const host = {
    testing: "https://apisandbox.vnforappstest.com",
    production: "https://apiprod.vnforapps.com",
  };

  const url = {
    accessToken: "/api.security/v1/security",
    sessionToken: "/api.ecommerce/v2/ecommerce/token/session",
    authorization: "/api.authorization/v3/authorization/ecommerce",
  };
  return host[env] + url[endpoint];
};

const getAccessToken = async () => {
  const url = urls("accessToken");
  const authHeader = Buffer.from(`${user}:${pass}`).toString("base64");
  const options = {
    headers: {
      Authorization: `Basic ${authHeader}`,
    },
  };
  return axios.get(url, options);
};

const getSessionToken = async (accessToken, amount, ip) => {
  const url = urls("sessionToken") + "/" + merId;
  const options = {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  };
  const data = {
    amount,
    antifraud: {
      clientIp: ip,
      merchantDefineData: {
        MDD4: "integraciones@necomplus.com",
        MDD21: 0,
        MDD32: "0171225",
        MDD75: "Registrado",
        MDD77: 1,
      },
    },
    channel: "web",
  };
  return await axios.post(url, data, options);
};

const getAuthorizationToken = async (
  amount,
  purchaseNumber,
  transactionToken,
  accessToken
) => {
  const url = urls("authorization") + "/" + merId;
  const options = {
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  };
  const data = {
    antifraud: null,
    captureType: "manual",
    channel: "web",
    countable: true,
    order: {
      amount,
      currency: "USD",
      purchaseNumber,
      tokenId: transactionToken,
    },
    recurrence: null,
    sponsored: null,
  };
  return await axios.post(url, data, options);
};

exports.getAccessToken = getAccessToken;
exports.getSessionToken = getSessionToken;
exports.getAuthorizationToken = getAuthorizationToken;
