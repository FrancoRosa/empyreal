// @ts-nocheck
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUP_URL, process.env.SUP_ANN);

export const setDBOrder = async (
  value,
  name,
  email,
  phone,
  address,
  company,
  postal,
  city,
  order,
  status,
  success,
  order_num
) => {
  return await supabase.from("orders").insert({
    value,
    name,
    email,
    phone,
    address,
    company,
    postal,
    city,
    order,
    status,
    success,
    order_num,
  });
};

export const getDBNum = async () => {
  return await supabase
    .from("orders")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);
};

export const getDBOrder = async (order) => {
  return await supabase
    .from("orders")
    .select("*")
    .eq("order_num", order)
    .limit(1);
};

export const getProducts = async () => {
  return await supabase.from("products").select("*");
};
