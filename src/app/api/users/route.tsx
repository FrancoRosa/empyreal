export async function GET(request: Request) {
  const users = [
    {
      id: 1,
      name: "Joohn 1",
    },
    {
      id: 2,
      name: "Joohn 2",
    },
    {
      id: 3,
      name: "Joohn 3",
    },
  ];
  return new Response(JSON.stringify(users));
}
