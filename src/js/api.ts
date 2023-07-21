"use client";

import axios from "axios";

export const getProducts = async () => {
  return axios.get("/api/products");
};
