import { getDBProduct } from "@/js/supabase";

export async function GET(
  request: Request,
  { params }: { params: { product_id: string } }
) {
  const { data }: { data: any } = await getDBProduct(params.product_id);
  return new Response(JSON.stringify(data, null, 2));
}
