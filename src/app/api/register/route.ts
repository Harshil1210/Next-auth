import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/user.model";
import dbConnect from "@/lib/DbConnect";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await dbConnect();

  const existingUser = await userModel.findOne({ email });
  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ user });
}
