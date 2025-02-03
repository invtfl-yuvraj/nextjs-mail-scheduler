export async function GET() {
    const recipients = [
      { id: 1, name: "Mario", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 2, name: "Kayla", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 3, name: "Maya", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
      { id: 4, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
      { id: 5, name: "John", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
      { id: 6, name: "Jessie", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 7, name: "David", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 8, name: "Jennie", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
      { id: 9, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 10, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
      { id: 11, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 12, name: "Maya", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
      { id: 13, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
      { id: 14, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 15, name: "Jessie", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
      { id: 16, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
      { id: 17, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 18, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
      { id: 19, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
      { id: 20, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
    ];
  
    return Response.json(recipients, { status: 200 });
  }
  