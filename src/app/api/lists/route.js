import { NextResponse } from 'next/server';


export async function GET() {
  const data = [
    {
      "id": "101",
      "name": "All Users"
    },
    {
      "id": "102",
      "name": "Active Subscribers"
    },
    {
      "id": "103",
      "name": "New Sign-ups"
    }
  ];
  return NextResponse.json(data);
}
