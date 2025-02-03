export async function GET() {
    const recipientLists = {
      active: { name: "Active Subscribers", count: 156 },
      all: { name: "All Users", count: 289 },
      new: { name: "New Users", count: 45 },
      premium: { name: "Premium Users", count: 78 },
    };
  
    return Response.json(recipientLists, { status: 200 });
  }
  