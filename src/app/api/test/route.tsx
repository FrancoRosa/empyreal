export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "cool" }));
}

export async function POST(request: Request) {
  console.log(request.body);

  return new Response(JSON.stringify({ message: "cool" }));
}
