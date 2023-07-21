import { getProducts } from "@/js/supabase";

export async function GET(request: Request) {
  const { data } = await getProducts();
  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {}
