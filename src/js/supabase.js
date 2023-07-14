import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
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
