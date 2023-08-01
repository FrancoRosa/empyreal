// @ts-nocheck
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUP_URL, process.env.SUP_ANN);

export const setDBOrder = async (
  value,
  name,
  address,
  postal,
  city,
  email,
  order
) => {
  return await supabase
    .from("orders")
    .insert({ value, name, address, postal, city, email, order });
};

export const getProducts = async () => {
  return await supabase.from("products").select("*");
};
