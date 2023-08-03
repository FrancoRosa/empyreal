import { getDBOrder } from "@/js/supabase";

export async function GET(
  request: Request,
  { params }: { params: { order_id: string } }
) {
  const { data }: { data: any } = await getDBOrder(params.order_id);
  return new Response(JSON.stringify(data, null, 2));
}
