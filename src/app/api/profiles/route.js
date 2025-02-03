export async function GET(req) {
  const profiles = [
    {
      id: 1,
      name: "Marry Kehlani",
      email: "kehlani@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    }
  ];

  return Response.json(profiles, { status: 200 });
}

export async function POST(req) {
  const body = await req.json(); // Parse JSON body
  return Response.json(body, { status: 201 });
}
