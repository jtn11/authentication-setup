import { users } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request" },
      { status: 500 }
    );
  }
}
