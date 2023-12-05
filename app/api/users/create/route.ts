import { createUser } from "@/services/userService";
import { User } from "@/types/userTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userData: User = await request.json();
    const newUser = await createUser(userData);
    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
